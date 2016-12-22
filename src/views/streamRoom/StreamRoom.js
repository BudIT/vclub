import React, { PropTypes } from 'react';

import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import { connect } from 'react-redux';

import { resetStreaming, setVideoSource } from 'vclub/redux/club/streamRoom';

import SourceSelect from './SourceSelect/SourceSelect';
import StatusMessage from './StatusMessage/StatusMessage';
import LocalMediaView from './LocalMediaView/LocalMediaView';
import RemoteMediaView from './RemoteMediaView/RemoteMediaView';

import styles from './StreamRoom.css';


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
    return (
      <div className={styles.container}>
        {currentUser.master
          ? <SourceSelect onSelected={onSourceSelected} />
          : <StatusMessage>Подготовка вещания...</StatusMessage>
        }
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {currentUser.master && (
        <button className={styles.resetButton} onClick={onResetStreaming}>
          Отключить вещание
        </button>
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
  // dispatch: PropTypes.func.isRequired,
  onResetStreaming: PropTypes.func.isRequired,
  onSourceSelected: PropTypes.func.isRequired,
};

export default enhance(StreamRoom);
