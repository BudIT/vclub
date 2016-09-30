import React, {PropTypes} from 'react'

import style from './HeaderRight.css'

// sign out
function HeaderRight(props) {
  console.log(props)
  const {
    numberOfMembers,

    logOut,
    toggleMemberPanel,

    dispatch,
  } = props

  return (
    <ul className={style.ul}>
      <li className={style.li}
        onClick={dispatch.bind(undefined, toggleMemberPanel())}
      >
        <a className={style.a} href="#">&#9977; {numberOfMembers}</a>
      </li>
      <li className={style.li}>
        <a className={style.a} href="#">&#9776;</a>
        <div className={style.dropdownContent}>
          <a href="#"
            onClick={dispatch.bind(undefined, logOut())}
          >
            Log Out
          </a>
          <a href="#">Smth Else</a>
          <a href="#">Third Opt.</a>
        </div>
      </li>
    </ul>
  )
}

HeaderRight.propTypes = {
  numberOfMembers:  PropTypes.number.isRequired,

  logOut:           PropTypes.func.isRequired,
  toggleMemberPanel:PropTypes.func.isRequired,

  dispatch:         PropTypes.func.isRequired,
}

HeaderRight.defaultProps = {
  numberOfMembers: 1,
}

export default HeaderRight
