export function setPayload(fn) {
  return (action, ...args) => {
    // eslint-disable-next-line no-param-reassign
    action.payload = fn(...args);
  };
}

export function setMeta(field, fn) {
  return (action, ...args) => {
    // eslint-disable-next-line no-param-reassign
    action.meta[field] = fn(...args);
  };
}

export function setMetaValue(field, value) {
  return (action) => {
    // eslint-disable-next-line no-param-reassign
    action.meta[field] = value;
  };
}

export function withSideEffect(sideEffect) {
  return setMetaValue('sideEffect', sideEffect);
}

export const broadcast = setMetaValue('broadcast', true);
export const remote = setMetaValue('remote', true);
