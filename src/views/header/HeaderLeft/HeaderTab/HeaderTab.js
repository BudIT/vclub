import React, { PropTypes } from 'react';

import compose from 'recompose/compose';
import { withHandlers } from 'recompose';

import style from './HeaderTab.css';

const enhance = compose(
  withHandlers({
    // array of handlers
    onClick: props => () =>
      props.dispatch(props.changeRoom(props.children)),
  })
);

// changeRoom
function HeaderTab(props) {
  const {
    children,
    currentRoom,

    onClick,
  } = props;

  return (
    <li>
      <button
        onClick={onClick}
        className={children === currentRoom ? style.tabCurrent : style.tab}
      >
        {children}
      </button>
    </li>
  );
}

HeaderTab.propTypes = {
  // should be only one child
  children: PropTypes.element.isRequired,
  currentRoom: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default enhance(HeaderTab);
