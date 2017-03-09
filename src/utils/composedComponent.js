import R from 'ramda';


export default function composedComponent(displayName, ...enhancers) {
  if (enhancers.length === 0) {
    throw new Error('Provide renderer function at least');
  }

  if (enhancers.length === 1) {
    const component = enhancers[0];
    component.Renderer = component;
    component.displayName = displayName;

    return component;
  }

  const renderer = enhancers.pop();
  renderer.displayName = `${displayName}Renderer`;

  const component = R.compose(...enhancers)(renderer);
  component.Renderer = renderer;
  component.displayName = displayName;

  return component;
}
