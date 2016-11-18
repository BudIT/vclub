import React from 'react';
import { Line } from 'react-konva';
import propTypes from '../propTypes';

const BoardLine = ({ x, y, x1, y1, color }) =>
  <Line
    points={[x, y, x1, y1]}
    stroke={color}
    strokeWidth={15}
    lineCap="round"
  />;

BoardLine.propTypes = propTypes.figures;

export default BoardLine;
