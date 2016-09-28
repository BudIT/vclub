import React from 'react';


const mediaEvents = [
  'abort', 'canplay', 'canplaythrough', 'durationchange', 'emptied', 'encrypted', 'ended',
  'error', 'interruptbegin', 'interruptend', 'loadeddata', 'loadedmetadata', 'loadstart',
  'onencrypted', 'pause', 'play', 'playing', /* 'progress', */ 'ratechange', 'seeked', 'seeking',
  'stalled', /* 'suspend', */ 'timeupdate', 'volumechange', 'waiting',
];

const noop = () => {};

export default class Video extends React.Component {

  static propTypes = {
    src: React.PropTypes.string.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    playing: React.PropTypes.bool.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    position: React.PropTypes.number.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    style: React.PropTypes.object,
    className: React.PropTypes.string,
    onTimeUpdate: React.PropTypes.func.isRequired,
    onLoadedMetadata: React.PropTypes.func.isRequired,
    onClick: React.PropTypes.func,
  }

  static defaultProps = {
    onTimeUpdate: noop,
    onLoadedMetadata: noop,
    position: 0,
  }

  componentDidMount() {
    const video = this.videoNode;

    for (const mediaEvent of mediaEvents) {
      video.addEventListener(mediaEvent, this.onMediaEvent, true);
    }

    this.updateVideoElement(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateVideoElement(nextProps);
  }

  componentWillUnmount() {
    const video = this.videoNode;

    for (const mediaEvent of mediaEvents) {
      video.removeEventListener(mediaEvent, this.onMediaEvent, true);
    }
  }

  onMediaEvent = (event) => {
    const video = event.target;

    if (event.type === 'timeupdate') {
      this.currentVideoPos = video.currentTime;
      this.props.onTimeUpdate(this.currentVideoPos);
    } else if (event.type === 'loadedmetadata') {
      this.props.onLoadedMetadata({ duration: video.duration });
    }
  }

  currentVideoPos = 0;

  updateVideoElement(props) {
    const video = this.videoNode;
    const { playing, position } = props;


    if (this.currentVideoPos !== position) {
      video.currentTime = position;
    }

    if (playing && video.paused) {
      video.play();
    } else if (!playing && !video.paused) {
      video.pause();
    }
  }

  render() {
    const { onClick, src, style, className } = this.props;

    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <video
        ref={(el) => { this.videoNode = el; }}
        src={src}
        onClick={onClick}
        style={style}
        className={className}
      />
    );
  }
}
