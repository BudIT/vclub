import React from 'react'

import styles from './style.css'

const Nav = (props) => {
  // check for only one child
  return (
    <ul>
      {props.children.map(child => <li>{child}</li>)}
    </ul>
  )
}

export default Nav

