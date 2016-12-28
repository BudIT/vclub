import React, { PropTypes } from 'react';

import Stream from 'vclub/components/Stream/Stream';
import StatusMessage from '../StatusMessage/StatusMessage';

import styles from './RemoteMediaView.css';


export default function RemoteMediaView(props) {
  const { stream } = props;

  return stream
    ? <Stream type="video" from={stream} className={styles.video} />
    : <StatusMessage>Подготовка вещания...</StatusMessage>;
}

RemoteMediaView.propTypes = {
  stream: PropTypes.instanceOf(MediaStream),
};
