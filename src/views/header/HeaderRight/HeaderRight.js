import React, { PropTypes } from 'react';

import compose from 'recompose/compose';
import { withHandlers } from 'recompose';

import cx from 'classnames';

// actions
import { logOut } from 'vclub/redux/club/auth';
import { toggleMemberPanel } from 'vclub/redux/club/ui';

import style from './HeaderRight.css';

const enhance = compose(
  withHandlers({
    onToggleMemberPanel: props => () => {
      props.dispatch(toggleMemberPanel());
    },
    onLogOut: props => () => {
      props.dispatch(logOut());
    },
  })
);

function HeaderRight(props) {
  const {
    numberOfMembers, mediaStatus,
    onLogOut, onToggleMemberPanel,
  } = props;
  const microphoneDisabled = mediaStatus !== 1;
  const microphoneError = microphoneDisabled && mediaStatus !== 0;

  return (
    <ul className={style.ul}>
      <li>
        <button
          className={cx(style.tab, microphoneDisabled && style.tabDisabled)}
          disabled={microphoneDisabled}
        >
          {'\uD83C\uDFA4'}
          {microphoneError && (
            <span className={style.errorMark}>&#10071;</span>
          )}
        </button>
      </li>
      <li>
        <button
          className={style.tab}
          onClick={onToggleMemberPanel}
        >
          &#9977; {numberOfMembers}
        </button>
      </li>
      <li className={style.dropdown}>
        <button
          className={style.tab}
        >
          &#9776;
        </button>
        <div className={style.dropdownContent}>
          <button
            className={style.tab}
            onClick={onLogOut}
          >
            Log Out
          </button>
        </div>
      </li>
    </ul>
  );
}

HeaderRight.propTypes = {
  numberOfMembers: PropTypes.number.isRequired,
  mediaStatus: PropTypes.number.isRequired,
  onLogOut: PropTypes.func.isRequired,
  onToggleMemberPanel: PropTypes.func.isRequired,
};

HeaderRight.defaultProps = {
  numberOfMembers: 1,
};

export default enhance(HeaderRight);
