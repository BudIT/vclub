import React, { PropTypes, Children } from 'react';

import compose from 'recompose/compose';
import { withHandlers } from 'recompose';

import style from './HeaderLeft.css';

const enhance = compose(
  withHandlers({
    onChangeRoom: props => (room) => {
      props.dispatch(props.changeRoom(room));
    },
  })
);

// changeRoom
function HeaderLeft(props) {

  console.log("headerleft")
  console.log(props)
  let i = -1;
  const {
    onChangeRoom,

    rooms,
    currentRoom,
  } = props;

  // return different style for tab if tab and room are the same
  // see tab with underline in ui
  function getStyle(room, tab) {
    if (room === tab) {
      return style.aCurrent;
    }
    return style.a;
  }

  const tabs = React.Children.map(props.children, function renderChild(child) {
    return (
      <li
        key={i.toString()}
      >
        <button
          className={getStyle(currentRoom, rooms[++i])}
          onClick={onChangeRoom.bind(undefined, rooms[i])}
        >
          {child}
        </button>
      </li>
    );
  });

  return (
    <ul className={style.ul}>
      {tabs}
    </ul>
  );
}

HeaderLeft.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentRoom: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,

  onChangeRoom: PropTypes.func.isRequired,

  // dispatch: PropTypes.func.isRequired,
};

export default enhance(HeaderLeft);
