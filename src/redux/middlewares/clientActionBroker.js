function resetRemoteFlag(action) {
  const clone = {
    ...action,
    meta: {
      ...action.meta,
    },
  };

  delete clone.meta.remote;
  delete clone.meta.sideEffects;

  return clone;
}

export default function clientActionBroker(ioSocket) {
  return (/* store */) => (next) => (action) => {
    const remote = action.meta && action.meta.remote;

    if (remote === true) {
      ioSocket.emit('dispatch', resetRemoteFlag(action));

      return false;
    }

    return next(action);
  };
}
