import { PropTypes } from 'react';
import createHelper from 'recompose/createHelper';
import createEagerFactory from 'recompose/createEagerFactory';


const withDispatch = () => BaseComponent => {
  const factory = createEagerFactory(BaseComponent);

  const WithDispatch = (ownerProps, context) => {
    const store = ownerProps.store || context.store;
    const dispatch = store && store.dispatch;

    return factory({ ...ownerProps, dispatch });
  };

  WithDispatch.contextTypes = {
    store: PropTypes.shape({
      dispatch: PropTypes.func.isRequired,
    }),
  };

  return WithDispatch;
};

export default createHelper(withDispatch, 'withDispatch');
