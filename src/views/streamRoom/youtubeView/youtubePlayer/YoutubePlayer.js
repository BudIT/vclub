import React from 'react';


export default class YoutubePlayer extends React.Component {

  componentDidMount() {
    const { YT, videoId } = this.props;

    this.player = new YT.Player(this.container, {
      width: '100%',
      height: '100%',
      videoId,
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        iv_load_policy: 3,
        modestbranding: 1,
        origin: window.location.origin,
        playsinline: 1,
        rel: 0,
        showinfo: 0,
      },
      events: {
        onReady: this.onPlayerReady,
        onStateChange: this.onPlayerStateChange,
        onError: event => console.error(event.data),

      },
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.playback === nextProps.playback &&
      this.props.muted === nextProps.muted
    ) {
      return;
    }

    this.updatePlayback(nextProps);
  }

  // eslint-disable-next-line class-methods-use-this
  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    if (this.durationTimeout) {
      clearTimeout(this.durationTimeout);
    }

    if (this.positionInterval) {
      clearInterval(this.positionInterval);
    }
  }

  onPlayerReady = () => {
    this.player.unMute();
    this.updatePlayback(this.props);
    this.reportDuration();
    this.startPositionInformer();
  }

  onPlayerStateChange = (event) => {
    if (this.props.onStateChange) this.props.onStateChange(event.data);

    this.updatePlayback(this.props);
  }

  getCurrentTime() {
    return this.player.getCurrentTime();
  }

  setContainerRef = (el) => {
    this.container = el;
  }

  reportDuration() {
    const duration = this.player.getDuration();

    if (duration > 0) {
      this.durationTimeout = null;
      this.props.onDurationReady(duration);
      return;
    }

    this.durationTimeout = setTimeout(() => this.reportDuration(), 1000);
  }

  startPositionInformer() {
    this.positionInterval = setInterval(() => {
      const position = this.player.getCurrentTime();

      if (this.lastReportedPosition === position) {
        return;
      }

      this.lastReportedPosition = position;
      this.props.onPositionUpdate(position);
    }, 1000);
  }

  performSeek(playback) {
    const { startedAt, playing, pos } = playback;
    const elapsed = startedAt && ((Date.now() - startedAt) / 1000);
    const seekPos = playing ? pos + elapsed : pos;

    this.player.seekTo(seekPos === 0 ? 0.01 : seekPos, true);
    this.relatedPos = pos;
  }

  updatePlayback(props) {
    const { YT, playback, muted } = props;
    const { pos, playing } = playback;
    const playerState = this.player.getPlayerState();
    const isPlayerMuted = this.player.isMuted();

    if (this.relatedPos !== pos) {
      this.performSeek(playback);
    }

    if (!playing && playerState === YT.PlayerState.PLAYING) {
      this.player.pauseVideo();
    } else if (playing && playerState === YT.PlayerState.PAUSED) {
      this.player.playVideo();
    }

    if (muted && !isPlayerMuted) {
      this.player.mute();
    } else if (!muted && isPlayerMuted) {
      this.player.unMute();
    }
  }

  render() {
    return <div style={{ pointerEvents: 'none' }} ref={this.setContainerRef} />;
  }
}
