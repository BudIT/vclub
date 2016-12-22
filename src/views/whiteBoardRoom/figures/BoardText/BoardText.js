import React, { PropTypes } from 'react';
import { Text } from 'react-konva';

const BoardText = ({ x, y, text }) => (
  <Text
    x={x} y={y}
    text={text}
    fontSize="25"
  />
);

BoardText.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  text: PropTypes.string,
};

export default BoardText;
