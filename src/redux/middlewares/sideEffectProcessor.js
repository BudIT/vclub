export default function sideEffectProcessor(options = {}) {
  return (store) => {
    const context = { ...options.context, store };

    return (next) => (action) => {
      const sideEffect = action.meta && action.meta.sideEffect;

      next(action);

      if (sideEffect) {
        sideEffect(context, action);
      }
    };
  };
}
