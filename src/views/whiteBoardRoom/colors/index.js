// background color
export const backgroundColor = '#FFD00B';
export const backgroundColorHover = '#FFAA00';
// border color
export const borderColor = '#33363A';
// random colors
const colors = [
  '#FE0000',
  '#F1B4F1',
  '#6100F1',
  '#C71585',
  '#ADFF2F',
  '#9400D3',
  '#AFEEEE',
  '#FFB6C1',
  '#48D1CC',
  '#B22222',
];

let colorIndex = 0;
export const getColor = () => colors[colorIndex++ % colors.length];

export default {
  backgroundColor,
  backgroundColorHover,
  borderColor,
  getColor,
};
