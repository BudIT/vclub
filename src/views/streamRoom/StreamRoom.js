import React from 'react';

import composedComponent from 'vclub/utils/composedComponent';
import withHandlers from 'recompose/withHandlers';
import { connect } from 'react-redux';

import { resetStreaming, setVideoSource } from 'vclub/redux/club/streamRoom';

import SourceSelect from './sourceSelect/SourceSelect';
import StreamView from './StreamView';

import './StreamRoom.css';


export default composedComponent(
  'StreamRoom',

  connect(state => ({
    source: state.streamRoom.source,
    ownerId: state.streamRoom.ownerId,
    me: state.auth.user,
    features: state.features,
  })),

  withHandlers({
    onResetStreaming: (props) => () => {
      props.dispatch(resetStreaming());
    },
    onSourceSelected: (props) => (source) => {
      props.dispatch(setVideoSource(source, props.me.id));
    },
  }),

  (props) => {
    const {
      source, me, ownerId, features,
      onSourceSelected, onResetStreaming,
    } = props;
    const owner = me.id === ownerId;

    if (!source) {
      return <SourceSelect onSelected={onSourceSelected} features={features} />;
    }

    return (
      <div styleName="container">
        {(me.master || owner) && (
          <button styleName="reset-btn" onClick={onResetStreaming}>
            Отключить вещание
          </button>
        )}
        <StreamView source={source} owner={owner} />
      </div>
    );
  }
);
