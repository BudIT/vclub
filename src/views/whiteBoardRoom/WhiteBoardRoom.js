import React from 'react';
import { Layer, Rect, Stage, Line, Circle, Group } from 'react-konva';
import Konva from 'konva';
import R from 'ramda';

import compose from 'recompose/compose';
import { connect } from 'react-redux';

import { addRectangle } from 'vclub/redux/club/whiteboard';

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

  const returnRect = ({ x, y, x1, y1, color }) =>
    <Rect
      x={x} y={y} width={x1 - x} height={y1 - y}
      fill={color}
      stroke={'#00008B'}
      strokeWidth={4}
    />;

  const returnCircle = ({ x, y, x1, y1, color }) => {
    // by Pifagor theorem
    const radius = Math.sqrt(Math.pow(x1 - x, 2) + Math.pow(y1 - y, 2));

    return (<Circle
      x={x} y={y} radius={radius}
      fill={color}
      stroke={'#00008B'}
      strokeWidth={4}
    />);
  };

  const returnLine = ({ x, y, x1, y1, color }) =>
    <Line
      points={[x, y, x1, y1]}
      stroke={color}
      strokeWidth={15}
      lineCap="round"
    />;

  const typeNumberIsEqual = R.curry((typeNumber, elm) => elm.typeNumber === typeNumber);

  const returnFigure = R.cond([
    [typeNumberIsEqual(1), returnRect],
    [typeNumberIsEqual(2), returnLine],
    [typeNumberIsEqual(3), returnCircle],
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
      figures: [{
        typeNumber: 1,
        x: 200,
        y: 200,
        width: 50,
        height: 50,
        color: getColor(),
      }],
    };

    this.setNextFigureType = this.setNextFigureType.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
  }

  onMouseUp() {
    console.log("mouse up");

    console.log(this.state)
    this.setState(prevState => ({
      ...prevState,
      listenForMouseMove: false,
    }));
  }

  onMouseDown(evt) {
    console.log("mouse down")
    const { evt: {
      clientX, clientY,
    } } = evt;

    if (this.state.nextFigureType !== null) {
      console.log("listenForMouseMove");
      this.setState(prevState => ({
        ...prevState,
        // now we listen for mouse move
        listenForMouseMove: true,
        // set first coordinate of new figure
        figures: R.concat(prevState.figures, [{
          typeNumber: prevState.nextFigureType,
          x: clientX,
          y: clientY,
          x1: 0,
          x2: 0,
          color: getColor(),
        }]),
      }));
    }
  }

  onMouseMove(evt) {
    const { evt: {
      clientX, clientY,
    } } = evt;

    console.log(this.state.listenForMouseMove)
    if (this.state.listenForMouseMove === true) {
      console.log("move")
      this.setState(prevState => ({
        ...prevState,
        figures: R.over(
          R.lensIndex(R.length(prevState.figures) - 1),
          elm => ({ ...elm, x1: clientX, y1: clientY }),
          prevState.figures
        ),
      }));
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
            {renderFigures(this.state.figures)}
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
