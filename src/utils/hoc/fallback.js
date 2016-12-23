import branch from 'recompose/branch';
import renderComponent from 'recompose/renderComponent';


export default function fallback(Component, test) {
  return branch(test, renderComponent(Component), c => c);
}
