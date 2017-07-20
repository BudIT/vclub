import React from 'react';

import composedComponent from 'vclub/utils/composedComponent';
import withHandlers from 'recompose/withHandlers';
import withProps from 'recompose/withProps';
import withState from 'recompose/withState';
import withDispatch from 'vclub/utils/hoc/withDispatch';

import { setSourceData } from 'vclub/redux/club/streamRoom';

import './YoutubeForm.css';

// eslint-disable-next-line max-len
const UrlRegexp = /^(?:https?:\/\/)?(?:www\.|m\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

export default composedComponent(
  'YoutubeForm',

  withDispatch(),

  withState('url', 'setURL', ''),

  withProps((props) => {
    const { url } = props;
    const result = url && url.match(UrlRegexp);

    return {
      isValidUrl: !!result,
      videoId: result && result[1],
    };
  }),

  withHandlers({
    onURLChange: (props) => (event) => {
      props.setURL(event.target.value);
    },

    onStart: (props) => () => {
      const { dispatch, videoId, isValidUrl } = props;

      if (!isValidUrl) return;

      dispatch(setSourceData({ videoId }));
    },
  }),

  (props) => {
    const { url, isValidUrl, onURLChange, onStart } = props;

    return (
      <div styleName="container">
        <div styleName="row">
          <input styleName="url-field" type="text" value={url} onChange={onURLChange} />
          <button styleName="submit-btn" disabled={!isValidUrl} onClick={onStart}>Start</button>
        </div>
      </div>
    );
  }
);
