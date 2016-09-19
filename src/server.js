import path from 'path';
import express from 'express';
import http from 'http';
import ioServer from 'socket.io';
import { createStore, compose, applyMiddleware } from 'redux';

import serverActionBroker from 'vclub/redux/serverActionBroker';
import sideEffectProcessor from 'vclub/redux/sideEffectProcessor';
import { memberEnter, memberLeave, initialize } from 'vclub/actions/core';
import reducer from 'vclub/reducers/club';


const serverPort = process.env.PORT || 3000;
const publicDir = path.resolve(__dirname, 'public');
const app = express();
const httpServer = new http.Server(app);
const io = ioServer(httpServer, { path: '/vclub-socket' });

const storeEnhancer = compose(
  applyMiddleware(serverActionBroker(io),
  sideEffectProcessor({ context: { ioServer: io } }))
);

const store = createStore(reducer, storeEnhancer);

app.set('port', serverPort);
app.use(express.static(publicDir));

app.get('/club', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'club.html'));
});

app.get('*', (req, res) => {
  res.redirect('/club');
});

io.on('connection', (socket) => {
  socket.on('auth', (user) => {
    store.dispatch(memberEnter(user));

    socket.join('members');

    if (user.master) {
      socket.join('masters');
    }
    socket.on('disconnect', () => {
      const memberLeaveAction = memberLeave(user.id);

      socket.broadcast.emit('dispatch', memberLeaveAction);
      store.dispatch(memberLeaveAction);
    });

    socket.on('dispatch', action => store.dispatch(action));

    socket.emit('dispatch', initialize(store.getState()));
  });
});

httpServer.listen(app.get('port'), () => {
  process.stdout.write(`The server is running at http://localhost:${serverPort}\n`);
});
