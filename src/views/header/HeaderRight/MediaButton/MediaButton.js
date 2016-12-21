import React, { PropTypes } from 'react';

import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withHandlers } from 'recompose';

import { toggleAudio } from 'vclub/redux/club/audioMedia';

import { MediaStatusPending, MediaStatusReady } from 'vclub/constants/mediaStatus';

import SvgIcon from 'vclub/components/icons/SvgIcon';

import style from './MediaButton.css';

import errorIcon from './ic_error_black_24px.svg';
import micIcon from './ic_mic_black_24px.svg';
import micNoneIcon from './ic_mic_none_black_24px.svg';
import micMutedIcon from './ic_mic_off_black_24px.svg';
import threeDotsIcon from './ic_more_horiz_black_24px.svg';


const enhance = compose(
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
);

function getIcon(props) {
  // eslint-disable-next-line react/prop-types
  const { muted, status, allowedStreams, userId } = props;
  const hasAllowedStream = allowedStreams.includes(userId);

  if (status === MediaStatusPending) {
    return <SvgIcon glyph={threeDotsIcon} />;
  } else if (status !== MediaStatusReady) {
    return <SvgIcon glyph={errorIcon} />;
  } else if (muted) {
    return <SvgIcon className={!hasAllowedStream ? style.mutedIcon : ''} glyph={micMutedIcon} />;
  } else if (hasAllowedStream) {
    return <SvgIcon glyph={micIcon} />;
  }

  return <SvgIcon className={style.mutedIcon} glyph={micNoneIcon} />;
}

function MediaButton(props) {
  const { className, muted, status, allowedStreams, userId, onClick } = props;

  return (
    <button
      className={className}
      onClick={onClick}
      disabled={status !== MediaStatusReady}
    >
      {getIcon({ muted, status, allowedStreams, userId })}
    </button>
  );
}

MediaButton.propTypes = {
  className: PropTypes.string,
  muted: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  allowedStreams: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onClick: PropTypes.func.isRequired,
};


export default enhance(MediaButton);
