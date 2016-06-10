function resetRemoteFlag(action) {
  return {
    ...action,
    meta: {
      ...action.meta,
      remote: false,
    },
  };
}

export default function clientActionBroker(ioSocket) {
  return (/* store */) => next => action => {
    const remote = action.meta && action.meta.remote;

    if (remote === true) {
      ioSocket.emit('dispatch', resetRemoteFlag(action));

      return false;
    }

    return next(action);
  };
}
