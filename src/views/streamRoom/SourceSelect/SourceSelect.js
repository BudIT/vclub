import React, { PropTypes } from 'react';

import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';

import { StreamSourceWebcam, StreamSourceScreen } from 'vclub/constants/streamSources';

import SvgIcon from 'vclub/components/icons/SvgIcon';

import styles from './SourceSelect.css';

import AudioIcon from './ic_audiotrack_black_24px.svg';
import ScreenIcon from './ic_desktop_windows_black_24px.svg';
import MovieIcon from './ic_movie_black_24px.svg';
import CameraIcon from './ic_videocam_black_24px.svg';
import YoutubeIcon from './youtube.svg';


const enhance = compose(
  withHandlers({
    onWebcamSelected: (props) => () => {
      props.onSelected(StreamSourceWebcam);
    },
    onScreenSelected: (props) => () => {
      props.onSelected(StreamSourceScreen);
    },
    onYoutubeSelected: (/* props */) => () => {
    },
    onVideoSelected: (/* props */) => () => {
    },
    onAudioSelected: (/* props */) => () => {
    },
  })
);

function SourceSelect(props) {
  const {
    screenCaptureAvailable,
    onWebcamSelected, onScreenSelected, onYoutubeSelected, onVideoSelected, onAudioSelected,
  } = props;

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.buttonGap} />
        <button className={styles.button} onClick={onWebcamSelected}>
          <SvgIcon className={styles.icon} glyph={CameraIcon} size={100} />
          <span className={styles.label}>Веб-камера</span>
        </button>
        <button
          className={screenCaptureAvailable ? styles.button : styles.buttonDisabled}
          onClick={onScreenSelected}
        >
          <SvgIcon className={styles.icon} glyph={ScreenIcon} size={100} />
          <span className={styles.label}>Экран</span>
        </button>
      </div>
      <div className={styles.row}>
        <button className={styles.buttonDisabled} onClick={onYoutubeSelected} disabled>
          <SvgIcon className={styles.icon} glyph={YoutubeIcon} size={100} />
          <span className={styles.label}>YouTube</span>
        </button>
        <button className={styles.buttonDisabled} onClick={onVideoSelected} disabled>
          <SvgIcon className={styles.icon} glyph={MovieIcon} size={100} />
          <span className={styles.label}>Видео</span>
        </button>
        <button className={styles.buttonDisabled} onClick={onAudioSelected} disabled>
          <SvgIcon className={styles.icon} glyph={AudioIcon} size={100} />
          <span className={styles.label}>Аудио</span>
        </button>
      </div>
    </div>
  );
}

SourceSelect.propTypes = {
  screenCaptureAvailable: PropTypes.bool.isRequired,
  onWebcamSelected: PropTypes.func.isRequired,
  onScreenSelected: PropTypes.func.isRequired,
  onYoutubeSelected: PropTypes.func.isRequired,
  onVideoSelected: PropTypes.func.isRequired,
  onAudioSelected: PropTypes.func.isRequired,
};

export default enhance(SourceSelect);
