import React, { PropTypes } from 'react';
import { Layer, Rect, Stage } from 'react-konva';
import R from 'ramda';

// import compose from 'recompose/compose';
// import { connect } from 'react-redux';

// ! dispatch as props

// import { addNewFigure } from 'vclub/redux/club/whiteboard';
// ! addNewFigure as props

import boardFigures from './figures';

import colors from './colors/colors';

// our figures
const { BoardRect, BoardCircle, BoardLine } = boardFigures;

const {
  backgroundColor,
  getColor,
} = colors;

function renderFigures(figuresParams) {
  const typeNumberIsEqual = R.curry((typeNumber, elm) => elm.typeNumber === typeNumber);

  const returnFigure = R.cond([
    [typeNumberIsEqual(1), params => <BoardRect {...params} />],
    [typeNumberIsEqual(2), params => <BoardLine {...params} />],
    [typeNumberIsEqual(3), params => <BoardCircle {...params} />],
    [R.T, () => null],
  ]);

  return R.map(returnFigure, figuresParams);
}

class WhiteBoard extends React.Component {
  constructor() {
    super();
    this.state = {
      // 0 - Rect
      // 1 - Line
      // 2 - Ellipse
      // will be set to null for not figures
      nextFigureType: null,
      // will be true after mouseDown
      // will be false after mouseUp
      listenForMouseMove: false,
      // figures to render
      figure: {},
    };

    this.setNextFigureType = this.setNextFigureType.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
  }

  onMouseUp() {
    const { addNewFigure } = this.props;
    console.log("mouse up");

    const { dispatch } = this.props;
    const { figure } = this.state;

    console.log(this.state)
    console.log(addNewFigure.toString());
    dispatch(addNewFigure(figure));
    this.setState(prevState => ({
      ...prevState,
      listenForMouseMove: false,
      figure: {},
    }));
  }

  onMouseDown(evt) {
    // console.log("mouse down")
    const { evt: {
      clientX, clientY,
    } } = evt;

    if (this.state.nextFigureType !== null) {
      // console.log("listenForMouseMove");
      this.setState(prevState => ({
        ...prevState,
        // now we listen for mouse move
        listenForMouseMove: true,
        // set first coordinate of new figure
        figure: {
          typeNumber: prevState.nextFigureType,
          x: clientX,
          y: clientY,
          x1: 0,
          x2: 0,
          color: getColor(),
        },
      }));
    }
  }

  onMouseMove(evt) {
    const { evt: {
      clientX, clientY,
    } } = evt;

    console.log(this.state.listenForMouseMove)
    if (this.state.listenForMouseMove === true) {
      // console.log("move")
      this.setState(prevState => ({
        ...prevState,
        figure: {
          ...prevState.figure,
          x1: clientX,
          y1: clientY,
        },
      }));
      // console.log(this.state.figure);
    }
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
    const { figures } = props;
    const { figure } = state;

    return (
      <div>
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            <Rect x="0" y="0" width={window.innerWidth} height={window.innerHeight} fill={backgroundColor} />
            {renderFigures(figures)}
            {renderFigures([figure])}
            <Rect
              x="0" y="0" width={window.innerWidth} height={window.innerHeight}
              onMouseMove={this.onMouseMove}
              onMouseDown={this.onMouseDown}
              onMouseUp={this.onMouseUp}
            />
          </Layer>
        </Stage>
      </div>
    );
  }
}

WhiteBoard.propTypes = {
  addNewFigure: PropTypes.func,
  dispatch: PropTypes.func,
};

export default WhiteBoard;
