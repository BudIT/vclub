import React from 'react';
import { Ellipse } from 'react-konva';
import propTypes from '../propTypes';

const BoardEllipse = ({ x, y, x1, y1, color }) => {
  if (x1 === 0 && y1 === 0) {
    return null;
  }
  return (
    <Ellipse
      x={x + ((x1 - x) / 2)}
      y={y + ((y1 - y) / 2)}
      radius={{ x: Math.abs((x1 - x) / 2), y: Math.abs((y1 - y) / 2) }}
      stroke="black"
      strokeWidth={4}
    />
  );
};

BoardEllipse.propTypes = propTypes.figures;

export default BoardEllipse;
