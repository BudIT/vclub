import React from 'react';

// import console from 'vclub/core/debug';


const mediaEvents = [
  'abort', 'canplay', 'canplaythrough', 'durationchange', 'emptied', 'encrypted', 'ended',
  'error', 'interruptbegin', 'interruptend', 'loadeddata', 'loadedmetadata', 'loadstart',
  'onencrypted', 'pause', 'play', 'playing', /* 'progress', */ 'ratechange', 'seeked', 'seeking',
  'stalled', /* 'suspend', */ 'timeupdate', 'volumechange', 'waiting',
];

const noop = () => {};

export default class Video extends React.Component {

  static propTypes = {
    src: React.PropTypes.any.isRequired,
    playing: React.PropTypes.bool.isRequired,
    position: React.PropTypes.number.isRequired,
    style: React.PropTypes.any,
    className: React.PropTypes.any,
    onTimeUpdate: React.PropTypes.func.isRequired,
    onLoadedMetadata: React.PropTypes.func.isRequired,
    onClick: React.PropTypes.any,
  }

  static defaultProps = {
    onTimeUpdate: noop,
    onLoadedMetadata: noop,
  }

  constructor(props, context) {
    super(props, context);

    this.currentVideoPos = 0;
  }

  componentWillMount() {
  }

  componentDidMount() {
    const videoEl = this.refs.video;

    for (const mediaEvent of mediaEvents) {
      videoEl.addEventListener(mediaEvent, ::this.onMediaEvent, true);
    }

    this.updateVideoElement(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateVideoElement(nextProps);
  }

  componentWillUnmount() {
    const videoEl = this.refs.video;

    for (const mediaEvent of mediaEvents) {
      videoEl.removeEventListener(mediaEvent, ::this.onMediaEvent, true);
    }
  }

  onMediaEvent(event) {
    const videoEl = event.target;

    if (event.type === 'timeupdate') {
      // console.log(event.type, videoEl.currentTime);
      this.currentVideoPos = videoEl.currentTime;
      this.props.onTimeUpdate(this.currentVideoPos);
    } else if (event.type === 'loadedmetadata') {
      // console.logVideoEvent(event);
      this.props.onLoadedMetadata({ duration: videoEl.duration });
    } else if (event.type === 'pause') {
      // console.logVideoEvent(event, videoEl.currentTime, this.props.playing);
    } else {
      // console.logVideoEvent(event);
    }
  }

  updateVideoElement(props) {
    const videoEl = this.refs.video;
    const { playing, position } = props;


    if (this.currentVideoPos !== position) {
      videoEl.currentTime = position;
    }

    if (playing && videoEl.paused) {
      videoEl.play();
    } else if (!playing && !videoEl.paused) {
      videoEl.pause();
      // console.log('paused');
    }
  }

  render() {
    const { onClick, src, style, className } = this.props;

    return (
      <video
        ref="video"
        src={src}
        onClick={onClick}
        style={style}
        className={className}
      />
    );
  }
}
