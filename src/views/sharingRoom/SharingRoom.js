import React, { PropTypes } from 'react';

import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import { connect } from 'react-redux';

import { increment, decrement } from 'vclub/redux/club/sharing';

import Ball from './ball/Ball';
import Member from './members/Member';
import Timer from './timer/Timer';

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
  const {
    members,
    user,
    ballPosition,
    done,
    dispatch,
    userMenuPosition,
    onMemberClick,
    timerStart,
    sessionDuration,
    showBallMenu,
    expired,
    onIncrementClick,
    onDecrementClick,
  } = props;

  const showTimeControlBtn = user.master;

  return (
    <section className={styles.masterMenu}>
      <header className={styles.controlPanel}>
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
          <div className={styles.timerControl}>
            <button className={styles.btnIncrement} onClick={onIncrementClick}></button>
            <button className={styles.btnDecrement} onClick={onDecrementClick}></button>
          </div>
        )}
      </header>
      <div className={styles.member}>
        {members.map((member) => (
          <Member
            key={member.id}
            user={user}
            member={member}
            ballPosition={ballPosition}
            done={done}
            dispatch={dispatch}
            onMemberClick={onMemberClick}
            showUserMenu={userMenuPosition === member.id}
            showBallMenu={showBallMenu}
          />
        ))}
      </div>
    </section>
  );
}

SharingRoom.propTypes = {
  members: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    master: PropTypes.bool.isRequired,
  }).isRequired).isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    master: PropTypes.bool.isRequired,
  }).isRequired,
  ballPosition: PropTypes.string,
  userMenuPosition: PropTypes.string,
  onMemberClick: PropTypes.string,
  timerStart: PropTypes.number,
  sessionDuration: PropTypes.number,
  showBallMenu: PropTypes.bool,
  expired: PropTypes.bool,
  onIncrementClick: PropTypes.func,
  onDecrementClick: PropTypes.func,
  done: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default enhance(SharingRoom);
