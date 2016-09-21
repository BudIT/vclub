import React from 'react';

import styles from './style.css';

function NavLink(props) {
  // check for only one child

  return (
    <a className={styles.a}>
      {props.children}
    </a>
  );
}

NavLink.propTypes = {
  children: React.PropTypes.node,
};

export default NavLink;

