import React from 'react';
import { Layer, Rect, Stage, Line, Circle } from 'react-konva';
import R from 'ramda';

import compose from 'recompose/compose';
import { connect } from 'react-redux';

import { addNewFigure } from 'vclub/redux/club/whiteboard';

import figures from './figures';
import ElementsPanel from './elementsPanel/ElementsPanel';

// our figures
const { BoardRect, BoardCircle, BoardLine } = figures;

const enhance = compose(
  connect(state => console.log(state) || ({
    figures: state.whiteboard.figures,
  })),
);

const stage = {
  width: 700,
  height: 700,
  layer1: {
    x: 0,
    y: 0,
    width: 100,
    height: 700,
  },
  layer2: {
    x: 100,
    y: 0,
    width: 700,
    height: 700,
  },
};

const colors = [
  '#FE0000',
  '#F1B4F1',
  '#6100F1',
  '#C71585',
  '#ADFF2F',
  '#9400D3',
  '#AFEEEE',
  '#FFB6C1',
  '#48D1CC',
  '#B22222',
];

let colorIndex = 0;
const getColor = () => colors[colorIndex++ % 10];

function ElementsPanel(props) {
  const { onClick } = props;

  const onClickForRect = onClick.bind(undefined, 1);
  const onClickForLine = onClick.bind(undefined, 2);
  const onClickForEllipse = onClick.bind(undefined, 3);

  return (
    <Layer>
        <Rect x="0" y="0" width="90" height="700" fill="#90EE90" />
        <Rect
          x="10" y="10" width="55" height="55"
          fill="#F0F071"
          onClick={onClickForRect}
        />
        <Rect
          x="15" y="15" width="50" height="50"
          fill="#F0F071"
          onClick={onClickForRect}
        />
        <Line
          points={[15, 85, 65, 135]} stroke={'#F0F071'}
          lineCap={'round'} strokeWidth={'7'}
          onClick={onClickForLine}
        />
        <Circle
          x={40} y={180} radius={25}
          fill={'#F0F071'}
          onClick={onClickForEllipse}
        />
        <Line points={[90, 10, 90, 690]} stroke={'#F0F071'} strokeWidth={7} />
    </Layer>
  );
}

function renderFigures(figures) {
  const typeNumberIsEqual = R.curry((typeNumber, elm) => elm.typeNumber === typeNumber);

  const returnFigure = R.cond([
    [typeNumberIsEqual(1), params => <BoardRect {...params} />],
    [typeNumberIsEqual(2), params => <BoardLine {...params} />],
    [typeNumberIsEqual(3), params => <BoardCircle {...params} />],
    [R.T, () => null],
  ]);

  return R.map(returnFigure, figures);
}

class WhiteBoardRoom extends React.Component {
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
    console.log("mouse up");

    const { dispatch } = this.props;
    const { figure } = this.state;

    console.log(this.state)
    console.log(addNewFigure.toString());
    dispatch(addNewFigure(figure))
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
    const { props } = this;

    const {
      dispatch, figures,
    } = props;

    return (
      <div>
        <Stage width={700} height={700}>
          <ElementsPanel dispatch={dispatch} onClick={this.setNextFigureType} />
          <Layer>
            <Rect x="90" y="0" width="700" height="700" fill="#90EE90" />
            {renderFigures(this.props.figures)}
            {renderFigures([this.state.figure])}
            <Rect
              x="95" y="0" width={700} height={700}
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

export default enhance(WhiteBoardRoom);
