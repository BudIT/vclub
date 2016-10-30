import React, { PropTypes } from 'react';

import styles from './Member.css';


function Member(props) {
  const { member, ballPosition, done, dispatch } = props;
  function handleClick() {
    dispatch({
      type: 'IS_SELECTED',
      payload: member.name,
    });
  }
  return (
    <div>
      <button onClick={handleClick} key={member.id} className={styles.members_btn}>
        {member.name}
      </button>
      {ballPosition === member.id && (
        <button className={styles.btn_ball}>&#9918;</button>
      )}
      {done.includes(member.id) && (
        <button className={styles.btn_done}>&#10003;</button>
      )}
    </div>
  );
}


Member.propTypes = {
  member: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    master: PropTypes.bool.isRequired,
  }).isRequired).isRequired,
  ballPosition: PropTypes.string,
  done: PropTypes.array,
  dispatch: PropTypes.func,
};

export default Member;
