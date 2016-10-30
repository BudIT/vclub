import React, { PropTypes } from 'react';

import compose from 'recompose/compose';

import { connect } from 'react-redux';

import Ball from './ball/Ball';
import Member from './members/Member';

import styles from './SharingRoom.css';


const enhance = compose(
  connect(state => ({
    members: state.members,
    ...state.sharingRoom,
  })),
);


function SharingRoom(props) {
  const { members, ballPosition, done, dispatch } = props;
  return (
    <section className={styles.master_menu}>
      <header className={styles.control_panel}>
        <Ball
          ballPosition={ballPosition}
          dispatch={dispatch}
        />
        <select className={styles.timer}>
          <option>5:00</option>
          <option>10:00</option>
          <option>15:00</option>
          <option>20:00</option>
        </select>
      </header>
      <div className={styles.member}>
        <div className={styles.member_item}>
          {members.map((member) => (
            <Member
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
  dispatch: PropTypes.string.isRequired,
};

export default enhance(SharingRoom);
