import React, { PropTypes } from 'react';
import { Layer, Rect, Stage } from 'react-konva';
import { RECT, CIRC, LINE, ELLS } from 'vclub/constants/whiteboardElements';
import { addNewFigure } from 'vclub/redux/club/whiteboard';

// import compose from 'recompose/compose';
// import { connect } from 'react-redux';

// ! dispatch as props

// import { addNewFigure } from 'vclub/redux/club/whiteboard';
// ! addNewFigure as props

import { BoardRect, BoardCircle, BoardLine, BoardEllipse, BoardText } from '../figures';
import { backgroundColor, getColor } from '../colors';
import styles from './WhiteBoard.css';

function renderFigure(figureParam) {
  // null & undefined cases?
  if (figureParam === null) return null;

  const { typeNumber } = figureParam;
  switch (typeNumber) {
    case RECT:
      return <BoardRect {...figureParam} />;
    case CIRC:
      return <BoardCircle {...figureParam} />;
    case LINE:
      return <BoardLine {...figureParam} />;
    case ELLS:
      return <BoardEllipse {...figureParam} />;
    case TEXT:
      return <BoardText {...figureParam} />
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
      layerHeight: window.innerHeight,
      layerWidth: window.innerWidth,
    };
  }

  onMouseUp = () => {
    const { dispatch } = this.props;
    const { figure, listenForMouseMove } = this.state;

    const isEmpty = ({ x1, y1 }) => x1 === 0 || y1 === 0;

    if (listenForMouseMove) {
      this.setState({
        listenForMouseMove: false,
        figure: null,
      });
      if (!isEmpty(figure)) {
        dispatch(addNewFigure(figure));
      }
    }
  }

  onMouseDown = (evt) => {
    // console.log("mouse down")
    // console.log(evt);
    const { nextFigureType } = this.props;

    const { evt: {
      offsetX, offsetY,
    } } = evt;

    if (nextFigureType !== null) {
      // console.log("listenForMouseMove");
      this.setState({
        // now we listen for mouse move
        listenForMouseMove: true,
        // set first coordinate of new figure
        figure: {
          typeNumber: nextFigureType,
          x: offsetX,
          y: offsetY,
          x1: 0,
          y1: 0,
          color: getColor(),
        },
      });
    }
  }

  componentDidMount() {
    console.log(this.stage.offsetTop);
    console.log(this.stage.offsetLeft);
    this.setState({
      layerWidth: window.innerWidth - this.stage.offsetLeft,
      layerHeight: window.innerHeight - this.stage.offsetTop,
    });
  }

  onMouseMove = (evt) => {
    const { evt: {
      offsetX, offsetY,
    } } = evt;

    const { listenForMouseMove } = this.state;

    // console.log(this.state.listenForMouseMove)
    if (listenForMouseMove) {
      // console.log("move")
      this.setState(prevState => ({
        ...prevState,
        figure: {
          ...prevState.figure,
          x1: offsetX,
          y1: offsetY,
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
    // console.log("NEXT FIGURE TYPE");
    // console.log(this.props.nextFigureType);
    // console.log("FIGURE");
    return (
      <div className={styles.whiteBoard} ref={ stage => { this.stage = stage; }}>
        <Stage width={this.state.layerWidth} height={this.state.layerHeight}>
          <Layer
            listening
            onMouseMove={this.onMouseMove}
            onMouseDown={this.onMouseDown}
            onMouseUp={this.onMouseUp}
          >
            <Rect x="0" y="0" width={this.state.layerWidth} height={this.state.layerHeight} fill={backgroundColor} />
            {figures.map(renderFigure)}
            {renderFigure(figure)}
          </Layer>
        </Stage>
      </div>
    );
  }
}

WhiteBoard.propTypes = {
  dispatch: PropTypes.func,
  nextFigureType: PropTypes.number,
};

export default WhiteBoard;
