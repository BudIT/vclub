import React from 'react';

import composedComponent from 'vclub/utils/composedComponent';
import { connect } from 'react-redux';

import Stream from 'vclub/components/Stream/Stream';
import StatusMessage from '../statusMessage/StatusMessage';

import './RemoteMediaView.css';


export default composedComponent(
  'RemoteMediaView',

  connect(state => ({
    stream: state.rtc.videoStreams[state.streamRoom.ownerId],
  })),

  ({ stream }) => (
    stream
      ? <Stream type="video" from={stream} styleName="video" />
      : <StatusMessage>Подготовка вещания...</StatusMessage>
  )
);
