import React from 'react';
import { Ellipse } from 'react-konva';
import propTypes from '../propTypes';

const BoardLine = ({ x, y, x1, y1, color }) =>
  <Ellipse
    x={x + ((x1 - x) / 2)}
    y={y + ((y1 - y) / 2)}
    radius={{ x: Math.abs((x1 - x) / 2), y: Math.abs((y1 - y) / 2) }}
    stroke={color}
    strokeWidth={15}
  />;

BoardLine.propTypes = propTypes.figures;

export default BoardLine;
