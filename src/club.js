import 'webrtc-adapter';

import React from 'react';
import io from 'socket.io-client';
import { render } from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';

import { Provider } from 'react-redux';

import ClubLayout from 'vclub/views/clubLayout/ClubLayout';

import sideEffectProcessor from 'borex-actions/sideEffectProcessor';
import clientActionBroker from 'vclub/redux/middlewares/clientActionBroker';
import rtcMiddleware from 'vclub/redux/middlewares/rtcMiddleware';

import reducer from 'vclub/redux/clubReducer';
import initialState from 'vclub/redux/initialClubState';
import { restoreAuth } from 'vclub/redux/club/auth';
import { enableScreenCapture } from 'vclub/redux/club/features';

import requestAudioStream from 'vclub/rtc/requestAudioStream';
import setupSocketClient from 'vclub/socket/setupSocketClient';


const ioSocket = io({ path: '/vclub-socket', forceNew: true, reconnection: false });

const storeEnhancer = compose(
  applyMiddleware(
    sideEffectProcessor({ context: { ioSocket, localStorage } }),
    clientActionBroker(ioSocket),
    rtcMiddleware(ioSocket),
  ),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(reducer, initialState, storeEnhancer);

setupSocketClient(ioSocket, store);
store.dispatch(restoreAuth());

render((
  <Provider store={store}>
    <ClubLayout />
  </Provider>
), document.getElementById('AppRoot'));

requestAudioStream(store);

window.addEventListener('message', (event) => {
  if (!event.data || event.data.type !== 'vclub:extension:loaded') return;

  store.dispatch(enableScreenCapture());
});
