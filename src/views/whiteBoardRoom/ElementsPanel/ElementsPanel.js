import React, { PropTypes } from 'react';

import styles from './ElementsPanel.css';

function ElementsPanel(props) {
  const { onClick } = props;

  const onClickForRect = onClick.bind(undefined, 1);
  const onClickForLine = onClick.bind(undefined, 2);
  const onClickForEllipse = onClick.bind(undefined, 3);

  return (
    <ul className={styles.panel}>
      <li className={styles.element}>
        <button onClick={onClickForRect} className={styles.button}>
          {/* <svg viewBox="0 0 200 200">
            <rect x="5" y="5" width="190" height="190" />
          </svg> */}
          Rect
        </button>
      </li>
      <li className={styles.element}>
        <button onClick={onClickForLine} className={styles.button}>
          {/* <svg viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="100" />
          </svg> */}
          Line
        </button>
      </li>
      <li className={styles.element}>
        <button onClick={onClickForEllipse} className={styles.button}>
          Circ
        </button>
      </li>
      {/* <Rect x="0" y="0" width="90" height="700" fill={backgroundColor} />
      <Rect
        x={c1.x} y={c1.y} width={c1.x1 - c1.x} height={c1.y1 - c1.y}
        fill={backgroundColorHover}
        onClick=
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
      /> */}
    </ul>
  );
}

ElementsPanel.propTypes = {
  // dispatch: PropTypes.func,
  onClick: PropTypes.func,
};

export default ElementsPanel;
