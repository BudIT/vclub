import React, { PropTypes } from 'react';

import { MediaStatusPending, MediaStatusReady } from 'vclub/constants/mediaStatus';

import Stream from 'vclub/components/Stream/Stream';


export default function LocalMediaView(props) {
  const { status, stream, errorName } = props;

  if (status === MediaStatusReady) {
    return <Stream type="video" from={stream} />;
  }

  if (status === MediaStatusPending) {
    return <span>Разрешите использовать ваше видео устройство</span>;
  }

  return (
    <span>
      Произошла ошибка <strong>{errorName}</strong>.
      Обратитесь к администратору.
    </span>
  );
}

LocalMediaView.propTypes = {
  status: PropTypes.string.isRequired,
  stream: PropTypes.instanceOf(MediaStream),
  errorName: PropTypes.string,
};
