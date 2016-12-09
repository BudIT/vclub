import React, { PropTypes, PureComponent } from 'react';


export default class Audio extends PureComponent {
  static propTypes = {
    stream: PropTypes.instanceOf(MediaStream).isRequired,
  }

  componentDidMount() {
    this.setStream(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.setStream(nextProps);
  }

  setStream(props) {
    this.audioEl.srcObject = props.stream;
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { stream, ...restProps } = this.props;

    return <audio {...restProps} ref={el => { this.audioEl = el; }} />;
  }
}
