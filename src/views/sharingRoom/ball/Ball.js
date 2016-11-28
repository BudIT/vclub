import React, { PropTypes } from 'react';

import styles from './Ball.css';


function Ball(props) {
  const { ballPosition, members } = props;
  const userIsOut = members.some(user => user.id === ballPosition);
  console.log(userIsOut);

  return (
    <div className={styles.container_ball}>
      {ballPosition === null && (
        <div>
          {userIsOut || ballPosition === null && (
            <button className={styles.btn_ball}>&#9918;</button>
          )}
        </div>
      )}
    </div>
  );
}

Ball.propTypes = {
  ballPosition: PropTypes.string,
  members: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    master: PropTypes.bool.isRequired,
  }).isRequired).isRequired,
};

export default Ball;
