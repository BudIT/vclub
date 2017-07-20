import React from 'react';

import composedComponent from 'vclub/utils/composedComponent';
import { connect } from 'react-redux';
import withHandlers from 'recompose/withHandlers';
import withState from 'recompose/withState';
import fallback from 'vclub/utils/hoc/fallback';
import withRefs from 'vclub/utils/hoc/withRefs';
import withYoutubeAPI from 'vclub/utils/hoc/withYoutubeAPI';

import { play, pause, seekTo } from 'vclub/redux/club/streamRoom';

import SvgIcon from 'vclub/components/icons/SvgIcon';
import formatTime from 'vclub/utils/formatTime';

import StatusMessage from '../statusMessage/StatusMessage';
import YoutubeForm from './youtubeForm/YoutubeForm';
import YoutubePlayer from './youtubePlayer/YoutubePlayer';

import './YoutubeView.css';

import PlayIcon from './ic_play_arrow_black_24px.svg';
import PauseIcon from './ic_pause_black_24px.svg';
import RepeatIcon from './ic_replay_black_24px.svg';
import VolumeUpIcon from './ic_volume_up_black_24px.svg';
import VolumeOffIcon from './ic_volume_off_black_24px.svg';


function renderPlaybackButton(PROPS) {
  const {
    playback, ended,
    onPlay, onPause, onRestart,
  } = PROPS;
  const { playing } = playback;

  if (ended) {
    return (
      <button styleName="button" onClick={onRestart}>
        <SvgIcon glyph={RepeatIcon} />
      </button>
    );
  }

  if (playing) {
    return (
      <button styleName="button" onClick={onPause}>
        <SvgIcon glyph={PauseIcon} />
      </button>
    );
  }

  return (
    <button styleName="button" onClick={onPlay}>
      <SvgIcon glyph={PlayIcon} />
    </button>
  );
}

export default composedComponent(
  'YoutubeView',

  connect(state => ({
    me: state.auth.user,
    ...state.streamRoom,
  })),

  fallback(
    () => <StatusMessage>Подготовка вещания...</StatusMessage>,
    ({ sourceData, owner }) => !owner && (!sourceData || !sourceData.videoId)
  ),

  fallback(
    YoutubeForm,
    (props) => !props.sourceData || !props.sourceData.videoId,
  ),

  withYoutubeAPI({
    onLoadError(err) {
      const { Raven } = window;
      const captureFn = err instanceof Error ? 'captureException' : 'captureMessage';

      Raven[captureFn](err);
    },
  }),

  fallback(
    () => <StatusMessage>Загрузка плеера...</StatusMessage>,
    (props) => !props.YT
  ),

  fallback(
    () => <StatusMessage>Невозможно загрузить плеер...</StatusMessage>,
    (props) => props.YT instanceof Error
  ),

  withState('times', 'setTimes', { position: null, duration: null }),

  withState('ended', 'setEnded', false),

  withState('muted', 'setMuted', false),

  withRefs('player'),

  withHandlers({
    onPlay: (props) => () => {
      props.dispatch(play());
    },

    onRestart: (props) => () => {
      props.dispatch(play(0));
    },

    onPause: (props) => () => {
      props.dispatch(pause(props.player.get().getCurrentTime()));
    },

    onSliderClick: (props) => (event) => {
      const { duration } = props.times;

      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const relativePosition = x / rect.width;

      props.dispatch(seekTo(relativePosition * duration));
    },

    onDurationReady: (props) => (duration) => {
      props.setTimes(times => ({ ...times, duration }));
    },

    onPositionUpdate: (props) => (position) => {
      props.setTimes(times => ({ ...times, position }));
    },

    onPlayerStateChange: (props) => (state) => {
      const { YT, ended, setEnded } = props;
      const shouldBeEnded = state === YT.PlayerState.ENDED;

      if (ended !== shouldBeEnded) {
        setEnded(shouldBeEnded);
      }
    },

    onToggleMuted: (props) => () => {
      props.setMuted(muted => !muted);
    },
  }),

  (props) => {
    const {
      YT, playback, muted, player, times, me, sourceData, owner,
      onDurationReady, onPositionUpdate, onPlayerStateChange,
      onToggleMuted, onSliderClick,
    } = props;
    const controlled = me.master || owner;
    const timesAreReady = times.position !== null && times.duration !== null;
    const timeProgress = timesAreReady ? Math.min(times.position / times.duration, 1) : 0;

    return (
      <div styleName="container">
        <div styleName="player">
          <YoutubePlayer
            ref={player}
            YT={YT}
            videoId={sourceData.videoId}
            playback={playback}
            muted={muted}
            onDurationReady={onDurationReady}
            onPositionUpdate={onPositionUpdate}
            onStateChange={onPlayerStateChange}
          />
        </div>

        <div styleName={controlled ? 'seek-bar-active' : 'seek-bar'} onClick={controlled && onSliderClick}>
          <div styleName="seek-bar-fill" style={{ width: `${timeProgress * 100}%` }} />
        </div>

        <div styleName="bar">
          {controlled && renderPlaybackButton(props)}

          <button styleName="button" onClick={onToggleMuted}>
            <SvgIcon glyph={muted ? VolumeOffIcon : VolumeUpIcon} />
          </button>

          {timesAreReady && (
            <span styleName="time-display">{formatTime(times.position)} / {formatTime(times.duration)}</span>
          )}

        </div>
      </div>
    );
  }
);
