import React from 'react'

import styles from './style.css'

const NavLink = (props) => {
  // check for only one child
  const {link} = props

  return (
    <a
      href={link}
    >
      {props.children}
    </a>
  )
}

export default NavLink