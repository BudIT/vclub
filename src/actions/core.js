import actionCreator from 'vclub/redux/actionCreator';
import actionTypePrefixer from 'vclub/redux/actionTypePrefixer';
import { broadcast, withSideEffect } from 'vclub/redux/actionEnhancers';


const $ = actionTypePrefixer('Core');

export const initialize = actionCreator($('initialize'));
export const auth = actionCreator($('auth'), [
  withSideEffect((dispatch, authData, { ioSocket }) => {
    ioSocket.emit('auth', authData);
  }),
]);
export const memberEnter = actionCreator($('memberEnter'), [broadcast]);
export const memberLeave = actionCreator($('memberLeave'), [broadcast]);
