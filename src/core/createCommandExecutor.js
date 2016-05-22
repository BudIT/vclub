import { ActionCreatorType } from './createActionFactory';


const FunctionIdKey = Symbol('FunctionIdKey');
let functionCounter = 0;

function getFunctionId(fn) {
  if (!fn[FunctionIdKey]) {
    // eslint-disable-next-line no-param-reassign
    fn[FunctionIdKey] = functionCounter++;
  }

  return fn[FunctionIdKey];
}

function createCmdHandler(cmdFn) {
  const taggedHandlers = {};
  const statefulHandler = {
    args: null,
    execute: (...args) => cmdFn(...statefulHandler.args, ...args),
  };

  const handler = (...args) => cmdFn(...args);

  handler.execute = handler.exec = handler;

  handler.sbind = (...args) => {
    statefulHandler.args = args;
    return statefulHandler.execute;
  };

  handler.tag = (tagName) => {
    if (!taggedHandlers[tagName]) {
      taggedHandlers[tagName] = createCmdHandler(cmdFn);
    }

    return taggedHandlers[tagName];
  };

  return handler;
}

function createCommandFromActionCreator(actionCreator, dispatch) {
  return (...args) => dispatch(actionCreator(...args));
}

export default function createCommandExecutor(store) {
  const commandHandlers = {};

  const api = (command) => {
    const fnId = getFunctionId(command);

    if (!commandHandlers[fnId]) {
      if (command.$$typeof === ActionCreatorType) {
        const handler = createCommandFromActionCreator(command, store.dispatch);
        commandHandlers[fnId] = createCmdHandler(handler);
      } else {
        const bindedCommand = command(store.dispatch, store.getState, api);
        commandHandlers[fnId] = createCmdHandler(bindedCommand);
      }
    }

    return commandHandlers[fnId];
  };

  api.fromFn = (fn) => {
    const fnId = getFunctionId(fn);

    if (!commandHandlers[fnId]) {
      commandHandlers[fnId] = createCmdHandler(fn);
    }

    return commandHandlers[fnId];
  };

  api.injectInto = (fn) => {
    const fnId = getFunctionId(fn);

    if (!commandHandlers[fnId]) {
      commandHandlers[fnId] = createCmdHandler(fn(api));
    }

    return commandHandlers[fnId];
  };

  return api;
}
