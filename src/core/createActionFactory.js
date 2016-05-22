export const ActionCreatorType = Symbol('ActionCreatorType');

function createAction(type, payloadMapper, metaMapper) {
  function actionCreator(...args) {
    const action = {
      type,
      payload: payloadMapper ? payloadMapper(...args) : args[0],
    };

    if (action.payload instanceof Error) {
      action.error = true;
    }

    if (metaMapper) {
      action.meta = metaMapper(...args);
    }

    return action;
  }

  actionCreator.$$typeof = ActionCreatorType;
  actionCreator.toString = () => type;
  actionCreator.displayName = type;

  return actionCreator;
}

function createReqAction(type) {
  return {
    start: createAction(`${type}.start`),
    done: createAction(`${type}.done`),
    error: createAction(`${type}.error`),
  };
}

export default function createActionFactory(scope) {
  return {
    createAction: (type, ...args) => createAction(`${scope}.${type}`, ...args),
    createReqAction: (type, ...args) => createReqAction(`${scope}.${type}`, ...args),
  };
}
