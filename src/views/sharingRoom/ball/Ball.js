import React, { PropTypes } from 'react';

import SvgIcon from 'vclub/components/icons/SvgIcon';

import ballIcon from './icon/tennis-ball.svg';
import styles from './Ball.css';


function Ball(props) {
  const { ballPosition, members } = props;
  const userIsOut = members.every(user => user.id !== ballPosition);
  const displayBall = userIsOut || ballPosition === null;

  return (
    <div className={styles.containerBall}>
      {displayBall && (
        <button className={styles.btnBall}>
          <SvgIcon glyph={ballIcon} size={30} />
        </button>
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
