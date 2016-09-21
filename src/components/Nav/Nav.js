import React from 'react';

import styles from './style.css';

function Nav(props) {
  // check for only one child
  return (
    <ul className={styles.ul}>
      {props.children.map(child => <li>{child}</li>)}
    </ul>
  );
}

Nav.propTypes = {
  children: React.PropTypes.arrayOf(React.PropTypes.node),
};

export default Nav;

