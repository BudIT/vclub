import React, { PropTypes } from 'react';

import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import { connect } from 'react-redux';

import { resetStreaming, setVideoSource } from 'vclub/redux/club/streamRoom';

import SourceSelect from './SourceSelect';
import LocalMediaView from './LocalMediaView';
import RemoteMediaView from './RemoteMediaView';


function PreparingMessage() {
  return <div>Подготовка вещания...</div>;
}

const enhance = compose(
  connect(state => ({
    source: state.streamRoom.source,
    ownerId: state.streamRoom.ownerId,
    currentUser: state.auth.user,
    videoStreams: state.rtc.videoStreams,
    videoMedia: state.videoMedia,
  })),
  withHandlers({
    onResetStreaming: (props) => () => {
      props.dispatch(resetStreaming());
    },
    onSourceSelected: (props) => (source) => {
      props.dispatch(setVideoSource(source, props.currentUser.id));
    },
  }),
);

function StreamRoom(props) {
  const {
    source, currentUser, ownerId, videoStreams, videoMedia,
    onSourceSelected, onResetStreaming,
  } = props;
  const owner = currentUser.id === ownerId;

  if (!source) {
    return currentUser.master
      ? <SourceSelect onSelected={onSourceSelected} />
      : <PreparingMessage />;
  }
  return (
    <div>
      {currentUser.master && (
        <div>
          <button onClick={onResetStreaming}>Отключить вещание</button>
        </div>
      )}
      {owner
        ? <LocalMediaView {...videoMedia} />
        : <RemoteMediaView stream={videoStreams[ownerId]} />
      }
    </div>
  );
}

StreamRoom.propTypes = {
  source: PropTypes.string,
  ownerId: PropTypes.string,
  currentUser: PropTypes.object.isRequired,
  videoStreams: PropTypes.object.isRequired,
  videoMedia: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  onResetStreaming: PropTypes.func.isRequired,
  onSourceSelected: PropTypes.func.isRequired,
};

export default enhance(StreamRoom);
