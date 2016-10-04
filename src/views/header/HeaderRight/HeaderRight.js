import React, { PropTypes } from 'react';

import compose from 'recompose/compose';
import { withHandlers } from 'recompose';

import style from './HeaderRight.css';

const enhance = compose(
  withHandlers({
    onToggleMemberPanel: props => () => {
      props.dispatch(props.toggleMemberPanel());
    },
    onLogOut: props => () => {
      props.dispatch(props.logOut());
    },
  })
);

// sign out
function HeaderRight(props) {
  const {
    numberOfMembers,

    onLogOut,
    onToggleMemberPanel,
  } = props;

  return (
    <ul className={style.ul}>
      <li
        className={style.li}
      >
        <button
          className={style.a}
          onClick={onToggleMemberPanel}
        >
          &#9977; {numberOfMembers}
        </button>
      </li>
      <li className={style.li}>
        <button
          className={style.a}
        >
          &#9776;
        </button>
        <div className={style.dropdownContent}>
          <button
            className={style.a}
            onClick={onLogOut}
          >
            Log Out
          </button>
          <button
            className={style.a}
          >
            Smth Else
          </button>
          <button
            className={style.a}
          >
            Third Opt.
          </button>
        </div>
      </li>
    </ul>
  );
}

HeaderRight.propTypes = {
  numberOfMembers: PropTypes.number.isRequired,

  onLogOut: PropTypes.func.isRequired,
  onToggleMemberPanel: PropTypes.func.isRequired,
};

HeaderRight.defaultProps = {
  numberOfMembers: 1,
};

export default enhance(HeaderRight);
