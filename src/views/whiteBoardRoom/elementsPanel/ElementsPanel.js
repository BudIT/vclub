import React, { PropTypes } from 'react';
import {
  Layer,
  Rect, Line, Circle,
} from 'react-konva';
import offsetsHelpers from './offsets';
import colors from '../colors/colors';

const {
  startCoordinates,
  getCoordinatesForLowerElement,
  getBorderCoordinates,
} = offsetsHelpers;

const {
  backgroundColor,
  borderColor,
  backgroundColorHover,
} = colors;

function ElementsPanel(props) {
  const { onClick } = props;

  const onClickForRect = onClick.bind(undefined, 1);
  const onClickForLine = onClick.bind(undefined, 2);
  const onClickForEllipse = onClick.bind(undefined, 3);

  const c1 = startCoordinates;
  const c2 = getCoordinatesForLowerElement(c1);
  const c3 = getCoordinatesForLowerElement(c2);

  const bC = getBorderCoordinates(c3);

  return (
    <Layer>
      {/* first Rect for background purposes */}
      <Rect x="0" y="0" width="90" height="700" fill={backgroundColor} />
      <Rect
        x={c1.x} y={c1.y} width={c1.x1 - c1.x} height={c1.y1 - c1.y}
        fill={backgroundColorHover}
        onClick={onClickForRect}
        stroke={borderColor}
        strokeWidth={3}
      />
      <Line
        points={[c2.x, c2.y, c2.x1, c2.y1]} stroke={borderColor}
        lineCap={'round'} strokeWidth={'7'}
        onClick={onClickForLine}
      />
      <Circle
        x={c3.x + ((c3.x1 - c3.x) / 2)} y={c3.y + ((c3.y1 - c3.y) / 2)} radius={25}
        fill={backgroundColorHover}
        onClick={onClickForEllipse}
        stroke={borderColor}
        strokeWidth={3}
      />
      <Line points={[bC.x, bC.y, bC.x, bC.y1]} stroke={borderColor} strokeWidth={7} />
    </Layer>
  );
}

ElementsPanel.propTypes = {
  // dispatch: PropTypes.func,
  onClick: PropTypes.func,
};

export default ElementsPanel;
