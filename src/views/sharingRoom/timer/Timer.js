import React, { Component } from 'react';

//import className from 'classnames';

import styles from './Timer.css';


function getElapsedTime(startTime, duration) {
  const now = Date.now();
  const timeDiff = Math.floor((now - startTime) / 1000);

    return duration - timeDiff;
}

function prependZero (val) {
  return val < 10 ? `0${val}` : `${val}`
}

class Timer extends Component {

  componentDidMount() {
    this.interval = setInterval(() => {
      if(this.props.startTime) {
        this.forceUpdate();
      }
    }, 1000)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  render() {
    const { startTime, duration } = this.props;

    const secondsElapsed = startTime
      ? getElapsedTime(startTime, duration)
      : duration;
    const displaySeconds = Math.abs(secondsElapsed);

    const seconds = displaySeconds % 60;
    const minutes = (displaySeconds - seconds) / 60;
    const currentSeconds = prependZero(seconds);
    const currentMinutes = prependZero(minutes);

    const expired = secondsElapsed < 0; // true
    const className = expired ? styles.timerExpired : styles.timer;

    // if(expired) {
    //   className = styles.timerExpired;
    // } else {
    //   className = styles.timer;
    // }
    return (
      <div className={className}>
        {currentMinutes}:{currentSeconds}
      </div>
    )
  }
}

export default Timer;
