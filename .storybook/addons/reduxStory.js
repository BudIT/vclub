import React from 'react';
import updeep from 'updeep';
import { action } from '@kadira/storybook';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { ActionTypes } from 'redux/lib/createStore';


const InitialState = Symbol('InitialState');

const storeReducer = (state, reduxAction) => reduxAction.payload || state;
const store = createStore(storeReducer);
const originalDispatch = store.dispatch;

store.dispatch = (reduxAction) => {
  action('redux')(reduxAction.type, reduxAction.payload, reduxAction);
};

function updateStoreState(newState) {
  originalDispatch({ type: 'update', payload: newState });
}

export default {
  setInitialState(initialState) {
    this[InitialState] = initialState;
  },

  setInitialStateFromReducer(reducer) {
    this[InitialState] = reducer(undefined, { type: ActionTypes.INIT });
  },

  addReduxStory(storyName, storyFn, stateUpdates) {
    this.add(storyName, (context) => {
      const state = stateUpdates && this[InitialState]
        ? updeep(stateUpdates, this[InitialState])
        : (stateUpdates || this[InitialState]);

      updateStoreState(state);

      return (
        <Provider store={store}>
          {storyFn(store.dispatch, context)}
        </Provider>
      );
    });
  },
};
