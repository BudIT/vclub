import React from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';

import styles from './WhiteBoardRoom.css';

import ElementsPanel from './ElementsPanel/ElementsPanel';
import WhiteBoard from './WhiteBoard/WhiteBoard';

const enhance = compose(
  connect(state => ({
    figures: state.whiteboard.figures,
  })),
);

class WhiteBoardRoom extends React.Component {
  constructor() {
    super();
    this.state = {
      nextFigureType: null,
    };
  }

  setNextFigureType = (typeNumber) => {
    this.setState({
      nextFigureType: typeNumber,
    });
  }

  render() {
    const { props, state } = this;

    const { dispatch, figures } = props;
    const { nextFigureType } = state;

    return (
      <div className={styles.whiteBoardRoom}>
        <ElementsPanel
          dispatch={dispatch}
          onClick={this.setNextFigureType}
          nextFigureType={nextFigureType}
        />
        <WhiteBoard
          dispatch={dispatch}
          figures={figures}
          nextFigureType={nextFigureType}
        />
      </div>
    );
  }
}

export default enhance(WhiteBoardRoom);
