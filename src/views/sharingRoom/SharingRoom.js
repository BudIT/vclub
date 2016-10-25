import React from 'react';

import compose from 'recompose/compose';

import { connect } from 'react-redux';

import styles from './SharingRoom.css';


const enhance = compose(
  connect(state => ({ state })),
);

// const initialState = {
//   members: [1, 2, 3, 4, 5, 6],
//   membersById: {
//     1: {
//       id: 1,
//       name: Моника,
//       master: true,
//     },
//     2: {
//       id: 2,
//       name: Росс,
//     },
//     3: {
//       id: 3,
//       name: Рейчел,
//     },
//    4: {
//       id: 4,
//       name: Джоуи,
//     },
//    5: {
//       id: 5,
//       name: Чендлер,
//     },
//    6: {
//       id: 6,
//       name: Фиби,
//     },
//
//   },
// };

function SharingRoom() {
  return (
    <section className={styles.master_menu}>
      <header className={styles.control_panel}>
        <div className={styles.container_ball}>
          <button className={styles.bnt_ball}>&#9918;</button>
        </div>
        <div className={styles.control_items}>
          <div>
            <select className={styles.select}>
              <option>5:00</option>
              <option>10:00</option>
              <option>15:00</option>
              <option>20:00</option>
            </select>
          </div>
        </div>
      </header>
      <div className={styles.member}>
        <div className={styles.member_item}>
          <button className={styles.members_btn} id="1">Моника</button>
          <button className={styles.members_btn} id="2">Росс</button>
          <button className={styles.members_btn} id="3">Рейчел</button>
        </div>
        <div className={styles.member_item}>
          <button className={styles.members_btn} id="4">Джоуи</button>
          <button className={styles.members_btn} id="5">Чендлер</button>
          <button className={styles.members_btn} id="6">Фиби</button>
        </div>
      </div>
    </section>
  );
}


export default enhance(SharingRoom);
