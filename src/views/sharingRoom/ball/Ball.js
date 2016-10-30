import React, { PropTypes } from 'react';


import styles from './Ball.css';


function Ball(props) {
  const { ballPosition } = props;

  return (
    <div className={styles.container_ball}>
      {ballPosition === null && (
        <button className={styles.btn_ball}>&#9918;</button>
      )}
    </div>
  );
}

Ball.propTypes = {
  ballPosition: PropTypes.string,
};

export default Ball;
