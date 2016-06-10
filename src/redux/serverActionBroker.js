function resetBroadcastFlag(action) {
  return {
    ...action,
    meta: {
      ...action.meta,
      broadcast: false,
    },
  };
}

export default function serverActionBroker(io) {
  return (/* store */) => next => action => {
    if (!action.meta) {
      return next(action);
    }

    const broadcast = !!action.meta.broadcast;

    if (broadcast) {
      io.sockets.in('members').emit('dispatch', resetBroadcastFlag(action));
    }

    return next(action);
  };
}
