import React from 'react';

import composedComponent from 'vclub/utils/composedComponent';
import { connect } from 'react-redux';
import withHandlers from 'recompose/withHandlers';

import { toggleVideo } from 'vclub/redux/club/videoMedia';

import { MediaStatusPending, MediaStatusReady } from 'vclub/constants/mediaStatus';

import SvgIcon from 'vclub/components/icons/SvgIcon';

import styles from './CamButton.css';
import buttonStyles from '../Button.css';

import errorIcon from './ic_error_black_24px.svg';
import micIcon from './ic_videocam_black_24px.svg';
import micMutedIcon from './ic_videocam_off_black_24px.svg';


function getIcon(muted, isUnavailable) {
  if (isUnavailable) {
    return <SvgIcon glyph={errorIcon} />;
  } else if (muted) {
    return <SvgIcon glyph={micMutedIcon} />;
  }

  return <SvgIcon glyph={micIcon} />;
}

export default composedComponent(
  'CamButton',

  connect(state => ({
    muted: state.videoMedia.muted,
    status: state.videoMedia.status,
  })),

  withHandlers({
    onClick: props => () => {
      props.dispatch(toggleVideo());
    },
  }),

  (props) => {
    const { muted, status, onClick } = props;
    const isUnavailable = status !== MediaStatusPending && status !== MediaStatusReady;

    return (
      <button
        styleName="buttonStyles.button"
        onClick={onClick}
        disabled={isUnavailable}
      >
        {getIcon(muted, isUnavailable)}
      </button>
    );
  }
);
