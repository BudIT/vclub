import React from 'react';

// TODO: refactor this component!!!

let supportsPassive = false;

try {
  const opts = Object.defineProperty({}, 'passive', {
    get() {
      supportsPassive = true;
    },
  });

  window.addEventListener('test', null, opts);
} catch (e) { /* pass */ }

export default class StickyContainer extends React.Component {

  componentDidMount() {
    this.scrollToBottom();

    if (supportsPassive) {
      this.container.addEventListener('scroll', this.onScroll, { passive: true });
    } else {
      this.rafRequestId = window.requestAnimationFrame(this.pollScroll);
    }
  }

  componentDidUpdate() {
    if (this.sticky === true) {
      this.scrollToBottom();
    }
  }

  componentWillUnmount() {
    this.container.removeEventListener('scroll', this.onScroll, { passive: true });
    window.cancelAnimationFrame(this.rafRequestId);
  }

  onScroll = () => {
    if (this.sticky) {
      if (this.container.scrollTop < this.lastStickyTop) {
        this.sticky = false;
      } else {
        this.lastStickyTop = this.container.scrollTop;
      }
    } else {
      const bottomPos = this.getBottomPos();

      if (Math.round(this.container.scrollTop) === bottomPos) {
        this.stickIt();
      }
    }
  }

  getBottomPos = () => this.container.scrollHeight - this.container.clientHeight;

  pollScroll = () => {
    this.onScroll();
    this.rafRequestId = window.requestAnimationFrame(this.pollScroll);
  }

  scrollToBottom = () => {
    this.container.scrollTop = this.getBottomPos() + 1;
    this.stickIt();
  }

  stickIt = () => {
    this.lastStickyTop = this.container.scrollTop;
    this.sticky = true;
  }

  render() {
    return <div ref={el => { this.container = el; }} {...this.props} />;
  }
}
