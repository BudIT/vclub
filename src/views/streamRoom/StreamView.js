import React from 'react';

import composedComponent from 'vclub/utils/composedComponent';
import fallback from 'vclub/utils/hoc/fallback';

import {
  StreamSourceWebcam, StreamSourceScreen, StreamSourceYoutube,
} from 'vclub/constants/streamSources';

import LocalMediaView from './localMediaView/LocalMediaView';
import RemoteMediaView from './remoteMediaView/RemoteMediaView';
import YoutubeView from './youtubeView/YoutubeView';

import StatusMessage from './statusMessage/StatusMessage';


export default composedComponent(
  'StreamView',

  fallback(LocalMediaView, ({ source, owner }) => source === StreamSourceWebcam && owner),
  fallback(RemoteMediaView, ({ source, owner }) => source === StreamSourceWebcam && !owner),
  fallback(LocalMediaView, ({ source, owner }) => source === StreamSourceScreen && owner),
  fallback(RemoteMediaView, ({ source, owner }) => source === StreamSourceScreen && !owner),
  fallback(YoutubeView, ({ source }) => source === StreamSourceYoutube),

  ({ source }) => {
    window.Raven.captureMessage(`Rendering unimplemented stream type '${source}'`);

    return (
      <StatusMessage>
        Неподдерживаемый формат вещания!
      </StatusMessage>
    );
  }
);
