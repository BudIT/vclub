import React, { PropTypes } from 'react';
import propTypes from '../propTypes';

import { addNewFigure } from 'vclub/redux/club/whiteboard';

import { TEXT } from 'vclub/constants/whiteboardElements';
import styles from './BoardInput.css';

class BoardInput extends React.Component {

  constructor() {
    super();

    this.state = {
      text: '',
    }
  }

  onSubmitText = () => {
    const text = this.state.text.trim();
    const { dispatch, clearCurrentFigure, ...figure } = this.props;

    // clear from Input, because we want to render text instead
    clearCurrentFigure();

    if (text.length !== 0) {
      dispatch(addNewFigure({
        ...figure,
        text: text,
        typeNumber: TEXT,
      }));
    }
  }

  onChangeText = (evt) => {
    this.setState({
      text: evt.target.value,
    })
  }

  render() {
    const { text } = this.state;
    const { clientX, clientY } = this.props;

    var styleForInput = {
      position: 'absolute',
      left: clientX,
      top: clientY,
    }

    return (
      <div style={styleForInput}>
        <textarea rows="1" cols="50" type="text"
          // ref={ input => {
          //   input && input.focus();
          // }}
          value={text}
          onChange={this.onChangeText}
        />
        <button className={styles.button} onClick={this.onSubmitText}>Submit</button>
      </div>
    );
  }
};


export default BoardInput;
