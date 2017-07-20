import withProps from 'recompose/withProps';


function createRef() {
  let value;

  const ref = (el) => { value = el; };

  ref.get = () => value;

  return ref;
}

export default function withRefs(...names) {
  const refs = names.reduce((memo, name) => {
    memo[name] = createRef(); // eslint-disable-line no-param-reassign

    return memo;
  }, {});

  return withProps(refs);
}
