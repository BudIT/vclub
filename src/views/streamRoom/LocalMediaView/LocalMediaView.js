import React, { PropTypes } from 'react';

import { MediaStatusPending, MediaStatusReady } from 'vclub/constants/mediaStatus';

import Stream from 'vclub/components/Stream/Stream';
import StatusMessage from '../StatusMessage/StatusMessage';

import styles from './LocalMediaView.css';


export default function LocalMediaView(props) {
  const { status, stream, errorName } = props;

  if (status === MediaStatusReady) {
    return <Stream type="video" from={stream} className={styles.video} />;
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

LocalMediaView.propTypes = {
  status: PropTypes.string.isRequired,
  stream: PropTypes.instanceOf(MediaStream),
  errorName: PropTypes.string,
};
