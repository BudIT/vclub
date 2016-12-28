import React, { PropTypes, PureComponent } from 'react';


export default class Stream extends PureComponent {
  static propTypes = {
    from: PropTypes.instanceOf(MediaStream).isRequired,
    type: PropTypes.oneOf(['video', 'audio']).isRequired,
    className: PropTypes.string,
  }

  componentWillReceiveProps(nextProps) {
    this.setStream(nextProps.from);
  }

  setStream(stream) {
    if (!this.mediaEl) return;

    this.mediaEl.srcObject = stream;
  }

  setMediaElementRef = (el) => {
    this.mediaEl = el;
    this.setStream(this.props.from);
  }

  render() {
    const { type: Type, className } = this.props;

    return <Type ref={this.setMediaElementRef} className={className} autoPlay />;
  }
}
