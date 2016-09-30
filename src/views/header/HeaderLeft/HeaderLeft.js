import React, {PropTypes} from 'react'

import style from './HeaderLeft.css'

// changeRoom
function HeaderLeft(props) {
  let i = -1;
  const {
    dispatch,

    changeRoom,

    rooms,
    currentRoom,
  } = props

  const getStyle = (currentRoom, linkRoom) => {
    return currentRoom === linkRoom ? style.aCurrent : style.a
  }

  return (
    <ul className={style.ul}>
      {props.children.map(child =>
        <li
          onClick={dispatch.bind(undefined, changeRoom(rooms[++i]))}
          key={i.toString()}
        >
          <a className={getStyle(currentRoom, rooms[i])}>
            {child}
          </a>
        </li>
      )}
    </ul>
  )
}

HeaderLeft.propTypes = {
  rooms:        PropTypes.arrayOf(React.PropTypes.string).isRequired,
  currentRoom:  PropTypes.string.isRequired,
  children:     PropTypes.arrayOf(React.PropTypes.node).isRequired,

  changeRoom:   PropTypes.func.isRequired,

  dispatch:     PropTypes.func.isRequired,
}

export default HeaderLeft
