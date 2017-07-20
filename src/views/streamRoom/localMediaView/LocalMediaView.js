import React from 'react';

import composedComponent from 'vclub/utils/composedComponent';
import { connect } from 'react-redux';


import { MediaStatusPending, MediaStatusReady } from 'vclub/constants/mediaStatus';

import Stream from 'vclub/components/Stream/Stream';
import StatusMessage from '../statusMessage/StatusMessage';

import './LocalMediaView.css';


export default composedComponent(
  'LocalMediaView',

  connect(state => ({
    ...state.videoMedia,
  })),

  (props) => {
    const { status, stream, errorName } = props;

    if (status === MediaStatusReady) {
      return <Stream type="video" from={stream} styleName="video" />;
    }

    if (status === MediaStatusPending) {
      return <StatusMessage>Разрешите использовать ваше видео устройство</StatusMessage>;
    }

    return (
      <StatusMessage>
        Произошла ошибка <strong>{errorName}</strong>.
        Обратитесь к администратору.
      </StatusMessage>
    );
  }
);
