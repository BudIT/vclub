import React, { PropTypes } from 'react';

import Stream from 'vclub/components/Stream/Stream';
import PreparingMessage from './PreparingMessage';

export default function RemoteMediaView(props) {
  const { stream } = props;

  return stream
    ? <Stream type="video" from={stream} />
    : <PreparingMessage />;
}

RemoteMediaView.propTypes = {
  stream: PropTypes.instanceOf(MediaStream),
};
