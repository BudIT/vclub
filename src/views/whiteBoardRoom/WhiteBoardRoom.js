import React from 'react';

import compose from 'recompose/compose';
import { connect } from 'react-redux';

import { addNewFigure } from 'vclub/redux/club/whiteboard';

import styles from './WhiteBoard.css'

import ElementsPanel from './elementsPanel/ElementsPanel';

import colors from './colors/colors';

import WhiteBoard from './WhiteBoard';

const {
  backgroundColor,
  getColor,
} = colors;

const enhance = compose(
  connect(state => console.log(state) || ({
    figures: state.whiteboard.figures,
  })),
);

class WhiteBoardRoom extends React.Component {
  render() {
    // console.log("Hello")
    const { props } = this;

    const {
      dispatch, figures,
    } = props;

    return (
      // <ElementsPanel dispatch={dispatch} onClick={this.setNextFigureType} />
      <div className={styles.whiteBoard}>
        <p>Hello! </p>
        <WhiteBoard
          dispatch={dispatch} addNewFigure={addNewFigure}
          figures={figures}
        />
      </div>
    );
  }
}

export default enhance(WhiteBoardRoom);
