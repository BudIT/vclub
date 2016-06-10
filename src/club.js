import React from 'react';
import io from 'socket.io-client';
import { render } from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import clientActionBroker from 'vclub/redux/clientActionBroker';
import sideEffectProcessor from 'vclub/redux/sideEffectProcessor';
import ClubLayoutRoot from 'vclub/views/clubLayout/Container';
import reducer from 'vclub/reducers/club';
import { auth } from 'vclub/actions/core';


const ioSocket = io({ path: '/vclub-socket', forceNew: true });

const storeEnhancer = compose(
  applyMiddleware(
    clientActionBroker(ioSocket),
    sideEffectProcessor({ context: { ioSocket } })
  ),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(reducer, storeEnhancer);

ioSocket.on('dispatch', (action) => store.dispatch(action));

const storedAuth = null;

if (storedAuth) {
  store.dispatch(auth(storedAuth));
}

render((
  <Provider store={store}>
    <ClubLayoutRoot />
  </Provider>
), document.getElementById('AppRoot'));
