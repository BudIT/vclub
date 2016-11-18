import React from 'react';
import { Circle } from 'react-konva';
import propTypes from '../propTypes';

const BoardCircle = ({ x, y, x1, y1, color }) => {
  // by Pifagor theorem
  const radius = Math.sqrt(Math.pow(x1 - x, 2) + Math.pow(y1 - y, 2));

  return (<Circle
    x={x} y={y} radius={radius}
    fill={color}
    stroke={'#00008B'}
    strokeWidth={4}
  />);
};

BoardCircle.propTypes = propTypes.figures;

export default BoardCircle;
