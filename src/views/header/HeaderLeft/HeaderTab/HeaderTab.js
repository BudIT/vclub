import React, { PropTypes } from 'react';

import compose from 'recompose/compose';
import { withHandlers } from 'recompose';

import { changeRoom } from 'vclub/redux/club/rooms';

import style from './HeaderTab.css';

const enhance = compose(
  withHandlers({
    // array of handlers
    onClick: props => () =>
      props.dispatch(changeRoom(props.children)),
  })
);

// changeRoom
function HeaderTab(props) {
  const {
    children, isCurrentTab,
    onClick,
  } = props;

  return (
    <li>
      <button
        onClick={onClick}
        className={isCurrentTab ? style.tabCurrent : style.tab}
      >
        {children}
      </button>
    </li>
  );
}

HeaderTab.propTypes = {
  children: PropTypes.node.isRequired,
  isCurrentTab: PropTypes.bool.isRequired,
  // recompose props
  onClick: PropTypes.func.isRequired,
};

export default enhance(HeaderTab);
