import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

import Audio from './Audio';


const enhance = compose(
  connect(state => ({
    allowedStreams: state.rtc.allowedStreams,
    allStreams: state.rtc.streams,
  })),
);

function AudioStreams(props) {
  const { allowedStreams, allStreams } = props;

  return (
    <div style={{ display: 'none' }}>
      {allowedStreams.map(userId => (
        allStreams[userId] && <Audio key={userId} stream={allStreams[userId]} autoPlay />
      ))}
    </div>
  );
}


AudioStreams.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  allStreams: PropTypes.object.isRequired,
  allowedStreams: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default enhance(AudioStreams);
