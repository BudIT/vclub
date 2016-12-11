import React from 'react';
import { Line } from 'react-konva';
import propTypes from '../propTypes';

const BoardLine = ({ x, y, x1, y1, color }) => {
  if (x1 === 0 && y1 === 0) {
    return null;
  }

  return (
    <Line
      points={[x, y, x1, y1]}
      stroke="black"
      strokeWidth={4}
      lineCap="round"
    />
  );
};

BoardLine.propTypes = propTypes.figures;

export default BoardLine;
