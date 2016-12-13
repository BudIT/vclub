import React, { PropTypes } from 'react';
import { Layer, Rect, Stage } from 'react-konva';
import { RECT, CIRC, LINE, ELLS, TEXT, INPUT } from 'vclub/constants/whiteboardElements';
// action creator for adding new figure to board
import { addNewFigure } from 'vclub/redux/club/whiteboard';

import { backgroundColor, backgroundColorHover } from 'vclub/views/whiteBoardRoom/colors'

import {
  BoardRect, BoardCircle, BoardLine, BoardEllipse, BoardText, BoardInput,
} from '../figures';

import styles from './WhiteBoard.css';

class WhiteBoard extends React.Component {
  constructor() {
    super();
    this.state = {
      // 0 - Rect
      // 1 - Line
      // 2 - Ellipse
      // ...etc
      nextFigureType: null,
      // will be true after mouseDown
      // will be false after mouseUp
      listenForMouseMove: false,
      // figure to render
      // we work with only one figure, others are in store
      figure: null,
      // initial layer size
      layerHeight: window.innerHeight,
      layerWidth: window.innerWidth,
    };
  }

  // for canvas figures
  renderFigureOnCanvas = (figure, index) => {
    if (figure === null) return null;

    if (index === undefined)
      index = "-1"

    const { typeNumber } = figure;
    switch (typeNumber) {
      case RECT:
        return <BoardRect {...figure} key={index.toString()} />;
      case CIRC:
        return <BoardCircle {...figure} key={index.toString()} />;
      case LINE:
        return <BoardLine {...figure} key={index.toString()} />;
      case ELLS:
        return <BoardEllipse {...figure} key={index.toString()} />;
      case TEXT:
        return <BoardText {...figure} key={index.toString()} />;
      default:
        return null;
    }
  }

  clearCurrentFigure = () => {
    this.setState({
      figure: null,
    })
  }

  renderFigure = (figure) => {
    if (figure === null) return null;

    const { typeNumber } = figure;
    const { dispatch } = this.props;

    switch (typeNumber) {
      case INPUT:
        return <BoardInput
                  {...figure}
                  dispatch={dispatch}
                  clearCurrentFigure={this.clearCurrentFigure}
                />;
      default:
        return null;
    }
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

    const { nextFigureType } = this.props;

    const { evt: {
      // canvas offset for figures
      offsetX, offsetY,
      // screen offset for input absolute positioning
      clientX, clientY,
    } } = evt;

    const { figure } = this.state;

    console.log(evt);

    switch (nextFigureType) {
      case RECT:
      case LINE:
      case ELLS:
      case CIRC:
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
          },
        });
        break;
      case TEXT:
        // don't have anything yet, show input
        if (figure === null) {
          this.setState({
            figure: {
              typeNumber: INPUT,
              x: offsetX,
              y: offsetY,
              clientX,
              clientY,
            },
          })
        }
        // click in other place of the board
        // if we have already INPUT then remove INPUT from the board
        if (figure.typeNumber === INPUT) {
          this.clearCurrentFigure()
        }
        break;
      default:
        break;
    }
  }

  componentDidMount() {
    this.setState({
      layerWidth: this.stage.offsetWidth,
      layerHeight: this.stage.offsetHeight,
    });
  }

  // scaling figures
  onMouseMove = (evt) => {
    const { listenForMouseMove } = this.state;

    if (listenForMouseMove) {
      const { evt: {
        offsetX, offsetY,
      } } = evt;

      this.setState(prevState => ({
        ...prevState,
        figure: {
          ...prevState.figure,
          x1: offsetX,
          y1: offsetY,
        },
      }));
    }
  }

  render() {
    const { props, state, renderFigure, renderFigureOnCanvas } = this;
    const { figures } = props;
    const { figure } = state;

    return (
      <div
        className={styles.whiteBoard}
        // ref for size fitting, watch componentDidMount & other lifecycle's methods
        ref={ stage => { this.stage = stage; }}
      >
        <Stage width={this.state.layerWidth} height={this.state.layerHeight}>
          <Layer
            listening
            onMouseMove={this.onMouseMove}
            onMouseDown={this.onMouseDown}
            onMouseUp={this.onMouseUp}
          >
            <Rect x="0" y="0" width={this.state.layerWidth} height={this.state.layerHeight} fill={backgroundColor} />
            {figures.map(renderFigureOnCanvas)}
            {renderFigureOnCanvas(figure)}
          </Layer>
        </Stage>
        {/* for elements not intended for canvas such as input */}
        {renderFigure(figure)}
      </div>
    );
  }
}


WhiteBoard.propTypes = {
  dispatch: PropTypes.func,
  nextFigureType: PropTypes.number,
};

export default WhiteBoard;
