import React from 'react';

import composedComponent from 'vclub/utils/composedComponent';
import withHandlers from 'recompose/withHandlers';

import './ListItem.css';


export default composedComponent(
  'ListItem',

  withHandlers({
    onButtonClick: (props) => () => {
      props.onClick(props.room);
    },
  }),

  (props) => {
    const { active, onButtonClick, children } = props;

    return (
      <li styleName="container">
        <button styleName={active ? 'active' : 'item'} onClick={onButtonClick}>
          {children}
        </button>
      </li>
    );
  }
);
