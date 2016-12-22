import React, { PropTypes } from 'react';

import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';

import { StreamSourceWebcam, StreamSourceScreen } from 'vclub/constants/streamSources';

import styles from './SourceSelect.css';


const enhance = compose(
  withHandlers({
    onWebcamSelected: (props) => () => {
      props.onSelected(StreamSourceWebcam);
    },
    onScreenSelected: (props) => () => {
      props.onSelected(StreamSourceScreen);
    },
  })
);

function SourceSelect(props) {
  const { onWebcamSelected, onScreenSelected } = props;

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <button className={styles.button} onClick={onWebcamSelected}>
          Веб-камера
        </button>
        <button className={styles.button} onClick={onScreenSelected}>
          Экран
        </button>
      </div>
    </div>
  );
}

SourceSelect.propTypes = {
  onWebcamSelected: PropTypes.func.isRequired,
  onScreenSelected: PropTypes.func.isRequired,
};

export default enhance(SourceSelect);
