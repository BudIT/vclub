import React, { PropTypes } from 'react';

import compose from 'recompose/compose';

import { connect } from 'react-redux';

import Ball from './ball/Ball';
import Member from './members/Member';

import styles from './SharingRoom.css';


const enhance = compose(
  connect(state => ({
    members: state.members,
    user: state.auth.user,
    ...state.sharingRoom,
  })),
);


function SharingRoom(props) {
  const { members, ballPosition, done, dispatch} = props;
  return (
    <section className={styles.master_menu}>
      <header className={styles.control_panel}>
        <Ball
          ballPosition={ballPosition}
          dispatch={dispatch}
        />
        <div className={styles.timer}>
          00:00
        </div>
        <div className={styles.timer_control}>
          <button className={styles.btn_top}>&#708;</button>
          <button className={styles.btn_bottom}>&#709;</button>
        </div>
      </header>
      <div className={styles.member}>
        <div className={styles.member_item}>
          {members.map((member) => (
            <Member
              key={member.id}
              member={member}
              ballPosition={ballPosition}
              done={done}
              dispatch={dispatch}
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
  done: PropTypes.array,
  dispatch: PropTypes.func,
};

export default enhance(SharingRoom);
