import React, { PropTypes } from 'react';

import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import { connect } from 'react-redux';

import Ball from './ball/Ball';
import Member from './members/Member';
import Timer from './timer/Timer';

import { increment } from 'vclub/redux/club/sharing';
import { decrement } from 'vclub/redux/club/sharing';

import styles from './SharingRoom.css';


const enhance = compose(
  connect(state => ({
    members: state.members,
    user: state.auth.user,
    ...state.sharingRoom,
  })),

  withHandlers({
    onIncrementClick: (props) => () => {
      const { dispatch, ballPosition } = props;
      if (ballPosition === null) {
        dispatch(increment());
      }
    },

    onDecrementClick: (props) => () => {
      const { dispatch, ballPosition } = props;

      if (ballPosition === null) {
        dispatch(decrement());
      }
    },

  }),
);

function SharingRoom(props) {

  const { members
    , user
    , ballPosition
    , done
    , dispatch
    , userMenuPosition
    , onMemberClick
    , timerStart
    , sessionDuration
    , showBallMenu
    , expired
    , onIncrementClick
    , onDecrementClick
  } = props;

  const showTimeControlBtn = user.master;

  return (
    <section className={styles.master_menu}>
      <header className={styles.control_panel}>
        <Ball
          ballPosition={ballPosition}
          members={members}
          dispatch={dispatch}
        />
        <div>
          <Timer
            startTime={timerStart}
            duration={sessionDuration}
            expired={expired}
          />
        </div>
        {showTimeControlBtn && (
          <div className={styles.timer_control}>
            <button
              className={styles.btn_top}
              onClick={onIncrementClick}
            >
              &#708;
            </button>
            <button
              className={styles.btn_bottom}
              onClick={onDecrementClick}
            >
              &#709;
            </button>
          </div>
        )}
      </header>

      <div className={styles.member}>
        <div className={styles.member_item}>
          {members.map((member) => (
            <Member
              key={member.id}
              user={user}
              member={member}
              ballPosition={ballPosition}
              done={done}
              dispatch={dispatch}
              onMemberClick = {onMemberClick}
              showUserMenu={userMenuPosition === member.id}
              showBallMenu={showBallMenu}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

SharingRoom.propTypes = {
  members: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    master: PropTypes.bool.isRequired,
  }).isRequired).isRequired,
  ballPosition: PropTypes.string,
  done: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default enhance(SharingRoom);
