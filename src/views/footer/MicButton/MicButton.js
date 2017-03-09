import React from 'react';

import composedComponent from 'vclub/utils/composedComponent';
import { connect } from 'react-redux';
import withHandlers from 'recompose/withHandlers';

import { toggleAudio } from 'vclub/redux/club/audioMedia';

import { MediaStatusPending, MediaStatusReady } from 'vclub/constants/mediaStatus';

import SvgIcon from 'vclub/components/icons/SvgIcon';

import styles from './MicButton.css';
import buttonStyles from '../Button.css';

import errorIcon from './ic_error_black_24px.svg';
import micIcon from './ic_mic_black_24px.svg';
import micNoneIcon from './ic_mic_none_black_24px.svg';
import micMutedIcon from './ic_mic_off_black_24px.svg';
import threeDotsIcon from './ic_more_horiz_black_24px.svg';


function getIcon(props) {
  // eslint-disable-next-line react/prop-types
  const { muted, status, allowedStreams, userId } = props;
  const hasAllowedStream = allowedStreams.includes(userId);

  if (status === MediaStatusPending) {
    return <SvgIcon glyph={threeDotsIcon} />;
  } else if (status !== MediaStatusReady) {
    return <SvgIcon glyph={errorIcon} />;
  } else if (muted) {
    return <SvgIcon styleName={!hasAllowedStream ? 'styles.mutedIcon' : ''} glyph={micMutedIcon} />;
  } else if (hasAllowedStream) {
    return <SvgIcon glyph={micIcon} />;
  }

  return <SvgIcon styleName="styles.mutedIcon" glyph={micNoneIcon} />;
}

export default composedComponent(
  'MicButton',

  connect(state => ({
    allowedStreams: state.rtc.allowedStreams,
    muted: state.audioMedia.muted,
    status: state.audioMedia.status,
    userId: state.auth.user.id,
  })),

  withHandlers({
    onClick: props => () => {
      props.dispatch(toggleAudio());
    },
  }),

  (props) => {
    const { muted, status, allowedStreams, userId, onClick } = props;

    return (
      <button
        styleName="buttonStyles.button"
        onClick={onClick}
        disabled={status !== MediaStatusReady}
      >
        {getIcon({ muted, status, allowedStreams, userId })}
      </button>
    );
  }
);
