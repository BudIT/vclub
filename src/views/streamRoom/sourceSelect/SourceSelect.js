import React from 'react';

import composedComponent from 'vclub/utils/composedComponent';
import withHandlers from 'recompose/withHandlers';

import {
  StreamSourceWebcam, StreamSourceScreen, StreamSourceYoutube,
} from 'vclub/constants/streamSources';

import SvgIcon from 'vclub/components/icons/SvgIcon';

import AudioIcon from './ic_audiotrack_black_24px.svg';
import ScreenIcon from './ic_desktop_windows_black_24px.svg';
import MovieIcon from './ic_movie_black_24px.svg';
import CameraIcon from './ic_videocam_black_24px.svg';
import YoutubeIcon from './youtube.svg';

import './SourceSelect.css';


export default composedComponent(
  'SourceSelect',

  withHandlers({
    onWebcamSelected: (props) => () => {
      props.onSelected(StreamSourceWebcam);
    },
    onScreenSelected: (props) => () => {
      props.onSelected(StreamSourceScreen);
    },
    onYoutubeSelected: (props) => () => {
      props.onSelected(StreamSourceYoutube);
    },
    onVideoSelected: (/* props */) => () => {
    },
    onAudioSelected: (/* props */) => () => {
    },
  }),

  (props) => {
    const {
      features,
      onWebcamSelected, onScreenSelected, onYoutubeSelected, onVideoSelected, onAudioSelected,
    } = props;

    return (
      <div styleName="container">
        <div styleName="row">
          <div styleName="gap" />
          <button styleName="button" onClick={onWebcamSelected}>
            <SvgIcon styleName="icon" glyph={CameraIcon} size={100} />
            <span styleName="label">Веб-камера</span>
          </button>
          <button
            styleName={features.screenCapture ? 'button' : 'button-disabled'}
            onClick={onScreenSelected}
          >
            <SvgIcon styleName="icon" glyph={ScreenIcon} size={100} />
            <span styleName="label">Экран</span>
          </button>
        </div>
        <div styleName="row">
          <button styleName="button-red" onClick={onYoutubeSelected}>
            <SvgIcon styleName="icon" glyph={YoutubeIcon} size={100} />
            <span styleName="label">YouTube</span>
          </button>
          <button styleName="button-disabled" onClick={onVideoSelected} disabled>
            <SvgIcon styleName="icon" glyph={MovieIcon} size={100} />
            <span styleName="label">Видео</span>
          </button>
          <button styleName="button-disabled" onClick={onAudioSelected} disabled>
            <SvgIcon styleName="icon" glyph={AudioIcon} size={100} />
            <span styleName="label">Аудио</span>
          </button>
        </div>
      </div>
    );
  }
);
