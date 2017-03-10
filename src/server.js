import http from 'http';
import path from 'path';
import express from 'express';
import ioServer from 'socket.io';
import uuid from 'uuid';
import Raven from 'raven';
import { createStore, compose, applyMiddleware } from 'redux';

import serverActionBroker from 'vclub/redux/middlewares/serverActionBroker';
import sideEffectProcessor from 'vclub/redux/middlewares/sideEffectProcessor';
import { initialize } from 'vclub/redux/club/init';
import { memberEnter, memberLeave } from 'vclub/redux/club/members';
import reducer from 'vclub/redux/clubReducer';
import initialState from 'vclub/redux/initialClubState';

import config from './config';


if (config.get('raven.enabled')) {
  Raven.config(config.get('raven.DSN'), {
    tags: {
      instance: config.get('instance') || 'main',
    },
  }).install();
}

const publicDir = path.resolve(__dirname, 'public');
const app = express();
const httpServer = new http.Server(app);
const io = ioServer(httpServer, { path: '/vclub-socket' });

const storeEnhancer = compose(
  applyMiddleware(
    serverActionBroker(io),
    sideEffectProcessor({ context: { ioServer: io } })
  ),
);

const store = createStore(reducer, initialState, storeEnhancer);

app.set('view engine', 'hbs');
app.use(Raven.requestHandler());
app.use(express.static(publicDir));

app.get('/club', (req, res) => {
  res.render('club', {
    raven: config.get('raven'),
    instanceId: config.get('instanceId'),
    title: config.get('title'),
    vkAppId: config.get('vkAppId'),
  });
});

app.get('*', (req, res) => {
  res.redirect('/club');
});

app.use(Raven.errorHandler());

const authSockets = {};

io.on('connection', (socket) => {
  socket.on('auth', (authData) => {
    Raven.context(() => {
      const user = {
        id: authData.id || uuid.v4(),
        name: authData.name,
        master: !!authData.master,
        photo: authData.photo,
      };

      Raven.setContext({
        user,
        tags: { submodule: 'socket-server' },
      });

      store.dispatch(memberEnter(user));
      authSockets[user.id] = socket;
      socket.join('users');

      if (user.master) {
        socket.join('masters');
      }

      socket.on('disconnect', () => {
        const memberLeaveAction = memberLeave(user.id);

        delete authSockets[user.id];
        socket.leave('users');
        store.dispatch(memberLeaveAction);
      });

      socket.on('dispatch', action => store.dispatch(action));

      function addRetranslateHandler(name) {
        socket.on(name, ({ userId, ...params }) => {
          const remoteSocket = userId && authSockets[userId];

          if (!remoteSocket) {
            Raven.captureMessage('No remote socket');

            return;
          }

          remoteSocket.emit(name, { userId: user.id, ...params });
        });
      }

      addRetranslateHandler('RTC.SDP');
      addRetranslateHandler('RTC.ICECandidate');
      addRetranslateHandler('RTC.NegReq');
      addRetranslateHandler('RTC.NegAccept');

      socket.emit('dispatch', initialize(store.getState(), user));
    });
  });

  socket.on('time:request', clientStartTime => {
    socket.emit('time:response', {
      clientStartTime,
      serverTime: Date.now(),
    });
  });
});

httpServer.listen(config.get('port'), () => {
  process.stdout.write(`The server is running at http://localhost:${config.get('port')}\n`);
});
