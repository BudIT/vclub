import React, { PropTypes } from 'react';
import compose from 'recompose/compose';
import { withHandlers } from 'recompose';

import { RECT, CIRC, LINE } from 'vclub/constants/whiteboardElements';

import styles from './ElementsPanel.css';

const enhance = compose(
  withHandlers({
    onClickForRect: props => () => props.onClick(RECT),
    onClickForLine: props => () => props.onClick(LINE),
    onClickForCircle: props => () => props.onClick(CIRC),
  })
);

function ElementsPanel(props) {
  const {
    onClickForRect, onClickForLine, onClickForCircle,
    nextFigureType,
  } = props;

  const gCN = (elm, nextFigureType) =>
    elm === nextFigureType
      ? styles.buttonCurrent
      : styles.button;

  return (
    <ul className={styles.panel}>
      <li className={styles.element}>
        <button onClick={onClickForRect} className={gCN(RECT, nextFigureType)}>
          <svg viewBox="0 0 200 200">
            <rect x="5" y="5" width="190" height="190" />
          </svg>
          {/* Rect */}
        </button>
      </li>
      <li className={styles.element}>
        <button onClick={onClickForLine} className={gCN(LINE, nextFigureType)}>
          <svg viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="100" />
          </svg>
          {/* Line */}
        </button>
      </li>
      <li className={styles.element}>
        <button onClick={onClickForCircle} className={gCN(CIRC, nextFigureType)}>
          <svg viewBox="0 0 200 200">
            <line x1="20" y1="100" x2="200" y2="20" stroke="black" />
          </svg>
        </button>
      </li>
    </ul>
  );
}

ElementsPanel.propTypes = {
  onClickForRect: PropTypes.func,
  onClickForLine: PropTypes.func,
  onClickForCircle: PropTypes.func,
  nextFigureType: PropTypes.number,
};

export default enhance(ElementsPanel);
