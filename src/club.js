import 'webrtc-adapter';

import React from 'react';
import io from 'socket.io-client';
import { render } from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';

import { Provider } from 'react-redux';

import ClubLayout from 'vclub/views/clubLayout/ClubLayout';

import clientActionBroker from 'vclub/redux/middlewares/clientActionBroker';
import sideEffectProcessor from 'vclub/redux/middlewares/sideEffectProcessor';
import rtcMiddleware from 'vclub/redux/middlewares/rtcMiddleware';

import reducer from 'vclub/redux/clubReducer';
import initialState from 'vclub/redux/initialClubState';
import { restoreAuth } from 'vclub/redux/club/auth';

import requestMediaDevices from 'vclub/rtc/requestMediaDevices';
import ServerTime from 'vclub/utils/ServerTime';


const ioSocket = io({ path: '/vclub-socket', forceNew: true });

const storeEnhancer = compose(
  applyMiddleware(
    rtcMiddleware(ioSocket),
    clientActionBroker(ioSocket),
    sideEffectProcessor({ context: { ioSocket, localStorage } }),
  ),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(reducer, initialState, storeEnhancer);

ioSocket.on('dispatch', action => store.dispatch(action));

ioSocket.on('time:response', data => {
  const duration = Date.now() - data.clientStartTime;
  const clientEventTime = data.clientStartTime + (duration / 2);
  const diff = data.serverTime - clientEventTime;

  ServerTime.setDiff(diff);
});

ioSocket.emit('time:request', Date.now());

store.dispatch(restoreAuth());

render((
  <Provider store={store}>
    <ClubLayout />
  </Provider>
), document.getElementById('AppRoot'));

requestMediaDevices(store);
