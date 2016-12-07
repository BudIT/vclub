import R from 'ramda';
import React, { PropTypes } from 'react';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

import Audio from './Audio';


const getMasterIds = createSelector(
  props => props.members,
  members => members.filter(member => member.master).map(member => member.id),
);


const enhance = compose(
  connect(state => ({
    allStreams: state.rtc.streams,
    masters: getMasterIds(state),
  })),
);

function AudioStreams(props) {
  const { allStreams, masters, users, all } = props;

  const allowedUsers = users ? R.uniq(R.concat(users, masters)) : masters;
  const streams = all ? allStreams : R.pick(allowedUsers, allStreams);

  return (
    <div style={{ display: 'none' }}>
      {Object.keys(streams).map(userId => (
        <Audio key={userId} stream={streams[userId]} autoPlay />
      ))}
    </div>
  );
}


AudioStreams.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  allStreams: PropTypes.object.isRequired,
  masters: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  users: PropTypes.arrayOf(PropTypes.string.isRequired),
  all: PropTypes.bool,
};

export default enhance(AudioStreams);
