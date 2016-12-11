import React, { PropTypes } from 'react';
import { Text } from 'react-konva';
import propTypes from '../propTypes';

const BoardText = ({ x, y, x1, y1, color, text }) => {
  return (
    <Text
      x={x} y={y}
      text={text}
      fontSize="30"
    />
  );
};

BoardText.propTypes = {
  ...propTypes.figures,
  text: PropTypes.string,
}

export default BoardText;
