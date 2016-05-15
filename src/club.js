import React from 'react';
import { render } from 'react-dom';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';

import ClubLayoutRoot from 'vclub/views/clubLayout/Container';
import reducer from 'vclub/reducers/club';


const storeEnhancer = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(reducer, storeEnhancer);

render((
  <Provider store={store}>
    <ClubLayoutRoot />
  </Provider>
), document.getElementById('AppRoot'));
