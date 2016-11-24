import React from 'react';

import compose from 'recompose/compose';
import { connect } from 'react-redux';

import { addNewFigure } from 'vclub/redux/club/whiteboard';

import styles from './WhiteBoardRoom.css';

import ElementsPanel from './ElementsPanel/ElementsPanel';

import WhiteBoard from './WhiteBoard/WhiteBoard';

const enhance = compose(
  connect(state => console.log(state) || ({
    figures: state.whiteboard.figures,
  })),
);

class WhiteBoardRoom extends React.Component {
  constructor() {
    super();
    this.state = {
      nextFigureType: null,
    };

    this.setNextFigureType = this.setNextFigureType.bind(this);
  }

  setNextFigureType(typeNumber) {
    console.log("Type Number is set ") || console.log(typeNumber)
    this.setState(prevState => ({
      ...prevState,
      nextFigureType: typeNumber,
    }));
  }

  render() {
    // console.log("Hello")
    const { props, state } = this;

    const { dispatch, figures } = props;
    const { nextFigureType } = state;
    console.log("FIGURES");
    console.log(figures);
    return (
      <div className={styles.whiteBoardRoom}>
        <ElementsPanel dispatch={dispatch} onClick={this.setNextFigureType} />
        <WhiteBoard
          dispatch={dispatch} addNewFigure={addNewFigure}
          figures={figures}
          nextFigureType={nextFigureType}
        />
      </div>
    );
  }
}

export default enhance(WhiteBoardRoom);
