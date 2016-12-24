import React, { PropTypes } from 'react';

import compose from 'recompose/compose';
import { withHandlers } from 'recompose';
import setPropTypes from 'recompose/setPropTypes';

import { changeRoom } from 'vclub/redux/club/rooms';

import style from './HeaderTab.css';

const enhance = compose(
  setPropTypes({ // !!!!
    dispatch: PropTypes.func,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      master: PropTypes.bool.isRequired,
    }).isRequired,
  }),

  withHandlers({
    // array of handlers
    onClick: (props) => () => {
      const { dispatch, user, children } = props;
      if (user.master) {
        dispatch(changeRoom(children));
      }
    },
  })
);

// changeRoom
function HeaderTab(props) {
  const {
    children,
    isCurrentTab,
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
/*eslint-disable */
HeaderTab.propTypes = {
  children: PropTypes.node.isRequired,
  isCurrentTab: PropTypes.bool.isRequired,
  // recompose props
  onClick: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    master: PropTypes.bool.isRequired,
  }).isRequired,
};
/*eslint-enable */
export default enhance(HeaderTab);
