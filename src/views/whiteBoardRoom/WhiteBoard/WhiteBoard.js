import React, { PropTypes } from 'react';
import { Layer, Rect, Stage } from 'react-konva';
import { RECT, CIRC, LINE } from 'vclub/constants/whiteboardElements';

// import compose from 'recompose/compose';
// import { connect } from 'react-redux';

// ! dispatch as props

// import { addNewFigure } from 'vclub/redux/club/whiteboard';
// ! addNewFigure as props

import boardFigures from '../figures';

import colors from '../colors/colors';
import styles from './WhiteBoard.css';

// our figures
const { BoardRect, BoardCircle, BoardLine } = boardFigures;

const {
  backgroundColor,
  getColor,
} = colors;

function renderFigure(figureParam) {
  // null & undefined cases?
  const { typeNumber } = figureParam;
  switch (typeNumber) {
    case RECT:
      return <BoardRect {...figureParam} />;
    case CIRC:
      return <BoardCircle {...figureParam} />;
    case LINE:
      return <BoardLine {...figureParam} />;
    default:
      return null;
  }
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
    if (this.props.nextFigureType !== null) {
      dispatch(addNewFigure(figure));
      this.setState(prevState => ({
        ...prevState,
        listenForMouseMove: false,
        figure: {},
      }));
    }
  }

  onMouseDown(evt) {
    // console.log("mouse down")
    const { evt: {
      clientX, clientY,
    } } = evt;

    if (this.props.nextFigureType !== null) {
      // console.log("listenForMouseMove");
      this.setState(prevState => ({
        ...prevState,
        // now we listen for mouse move
        listenForMouseMove: true,
        // set first coordinate of new figure
        figure: {
          typeNumber: this.props.nextFigureType,
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

  render() {
    // console.log("Hello")
    const { props, state } = this;
    const { figures } = props;
    const { figure } = state;
    console.log("NEXT FIGURE TYPE");
    console.log(this.props.nextFigureType);
    console.log("FIGURE");
    return (
      <div className={styles.whiteBoard}>
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            <Rect x="0" y="0" width={window.innerWidth} height={window.innerHeight} fill={backgroundColor} />
            {figures.map(renderFigure)}
            {renderFigure(figure)}
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
