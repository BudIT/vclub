export default function actionCreator(type, enhancers) {
  function enhance(action, args) {
    if (enhancers) {
      enhancers.forEach((e) => e(action, ...args));
    }
  }

  function actionCreatorFn(...args) {
    const action = {
      type,
      payload: args[0],
      meta: {},
    };

    enhance(action, args);

    if (action.payload instanceof Error) {
      action.error = true;
    }

    return action;
  }

  actionCreatorFn.toString = () => type;
  actionCreatorFn.displayName = type;

  return actionCreatorFn;
}
