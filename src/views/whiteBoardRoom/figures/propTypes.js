import { PropTypes } from 'react';

const { number, string } = PropTypes;

const figures = {
  x: number,
  y: number,
  x1: number,
  y1: number,
  color: string,
};

const propTypes = {
  figures,
};

export default propTypes;
