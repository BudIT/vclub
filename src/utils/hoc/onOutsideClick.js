import { Component } from 'react';
import ReactDOM from 'react-dom';
import createEagerFactory from 'recompose/createEagerFactory';
import createHelper from 'recompose/createHelper';


const onOutsideClick = (handler) => (BaseComponent) => {
  const factory = createEagerFactory(BaseComponent);

  return class extends Component {
    componentDidMount() {
      document.addEventListener('click', this.handleClickOutside, true);
    }

    componentWillUnmount() {
      document.removeEventListener('click', this.handleClickOutside, true);
    }

    handleClickOutside = (e) => {
      const domNode = ReactDOM.findDOMNode(this); // eslint-disable-line react/no-find-dom-node

      if (domNode !== e.target && !domNode.contains(e.target)) {
        if (handler) {
          handler(this.props, e);
        } else if (this.props.onOutsideClick) { // eslint-disable-line react/prop-types
          this.props.onOutsideClick(e); // eslint-disable-line react/prop-types
        }
      }
    }

    render() {
      return factory(this.props);
    }
  };
};

export default createHelper(onOutsideClick, 'onOutsideClick');
