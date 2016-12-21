import React, { PropTypes, PureComponent } from 'react';


export default class Stream extends PureComponent {
  static propTypes = {
    from: PropTypes.instanceOf(MediaStream).isRequired,
    type: PropTypes.oneOf(['video', 'audio']).isRequired,
  }

  componentDidMount() {
    this.setStream(this.props.from);
  }
  componentWillReceiveProps(nextProps) {
    this.setStream(nextProps.from);
  }

  setStream(stream) {
    this.mediaEl.srcObject = stream;
  }

  render() {
    const Type = this.props.type;

    return <Type ref={el => { this.mediaEl = el; }} autoPlay />;
  }
}
