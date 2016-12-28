import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

import Stream from 'vclub/components/Stream/Stream';


const enhance = compose(
  connect(state => ({
    allowedStreams: state.rtc.allowedStreams,
    streams: state.rtc.audioStreams,
  })),
);

function AudioStreams(props) {
  const { allowedStreams, streams } = props;

  return (
    <div style={{ display: 'none' }}>
      {allowedStreams.map(userId => (
        streams[userId] && <Stream key={userId} type="audio" from={streams[userId]} />
      ))}
    </div>
  );
}


AudioStreams.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  streams: PropTypes.object.isRequired,
  allowedStreams: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default enhance(AudioStreams);
