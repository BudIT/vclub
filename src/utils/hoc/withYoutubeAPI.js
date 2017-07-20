import { Component } from 'react';
import createHelper from 'recompose/createHelper';
import createEagerFactory from 'recompose/createEagerFactory';

import loadScript from 'load-script';


function loadYoutubeAPI() {
  if (window.YT && window.YT.Player && window.YT.Player instanceof Function) {
    return Promise.resolve(window.YT);
  }

  return new Promise((resolve, reject) => {
    const previousCallback = window.onYouTubeIframeAPIReady;

    window.onYouTubeIframeAPIReady = () => {
      if (previousCallback) {
        previousCallback();
      }

      resolve(window.YT);
    };

    loadScript('https://www.youtube.com/iframe_api', err => {
      if (err) reject(err);
    });
  });
}

const withYoutubeAPI = (options) => BaseComponent => {
  const factory = createEagerFactory(BaseComponent);

  return class extends Component {
    constructor(props) {
      super(props);

      this.state = {
        YT: null,
      };
    }

    componentDidMount() {
      loadYoutubeAPI()
        .then(YT => this.setState({ YT }))
        .catch(err => {
          if (options.onLoadError) options.onLoadError(err);
          this.setState({ YT: err instanceof Error ? err : new Error(err) });
        });
    }

    render() {
      return factory({ ...this.props, ...this.state });
    }
  };
};

export default createHelper(withYoutubeAPI, 'withYoutubeAPI');
