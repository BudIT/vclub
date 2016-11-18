import React from 'react';
import { Rect } from 'react-konva';
import propTypes from '../propTypes';

const BoardRect = ({ x, y, x1, y1, color }) =>
  <Rect
    x={x} y={y} width={x1 - x} height={y1 - y}
    fill={color}
    stroke={'#00008B'}
    strokeWidth={4}
  />;

BoardRect.propTypes = propTypes.figures;

export default BoardRect;
