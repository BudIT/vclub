import path from 'path';
import express from 'express';
import http from 'http';
import ioServer from 'socket.io';
import uuid from 'uuid';
import { createStore, compose, applyMiddleware } from 'redux';

import serverActionBroker from 'vclub/redux/middlewares/serverActionBroker';
import sideEffectProcessor from 'vclub/redux/middlewares/sideEffectProcessor';
import { initialize } from 'vclub/redux/club/init';
import { memberEnter, memberLeave } from 'vclub/redux/club/members';
import reducer from 'vclub/redux/clubReducer';
import initialState from 'vclub/redux/initialClubState';


const serverPort = process.env.PORT || 3000;
const publicDir = path.resolve(__dirname, 'public');
const app = express();
const httpServer = new http.Server(app);
const io = ioServer(httpServer, { path: '/vclub-socket' });

const storeEnhancer = compose(
  applyMiddleware(serverActionBroker(io),
  sideEffectProcessor({ context: { ioServer: io } })),
);

const store = createStore(reducer, initialState, storeEnhancer);

app.set('port', serverPort);
app.use(express.static(publicDir));

app.get('/club', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'club.html'));
});

app.get('*', (req, res) => {
  res.redirect('/club');
});

const authSockets = {};

io.on('connection', (socket) => {
  socket.on('auth', (authData) => {
    const user = {
      id: uuid.v4(),
      name: authData.name,
      master: !!authData.master,
    };

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

    socket.on('RTC.SDP', ({ userId, sdp }) => {
      const remoteSocket = authSockets[userId];

      if (!remoteSocket) return;

      remoteSocket.emit('RTC.SDP', { userId: user.id, sdp });
    });

    socket.on('RTC.ICECandidate', ({ userId, candidate }) => {
      const remoteSocket = authSockets[userId];

      if (!remoteSocket) return;

      remoteSocket.emit('RTC.ICECandidate', { userId: user.id, candidate });
    });

    socket.emit('dispatch', initialize(store.getState(), user));
  });

  socket.on('time:request', clientStartTime => {
    socket.emit('time:response', {
      clientStartTime,
      serverTime: Date.now(),
    });
  });
});

httpServer.listen(app.get('port'), () => {
  process.stdout.write(`The server is running at http://localhost:${serverPort}\n`);
});
