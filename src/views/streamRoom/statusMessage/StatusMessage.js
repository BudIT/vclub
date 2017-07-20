import React, { PropTypes } from 'react';

import styles from './StatusMessage.css';


export default function StatusMessage({ children }) {
  return (
    <div className={styles.container}>
      <div className={styles.message}>
        {children}
      </div>
    </div>
  );
}

StatusMessage.propTypes = {
  children: PropTypes.node.isRequired,
};
