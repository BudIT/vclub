import React, { PropTypes } from 'react';

import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import setDisplayName from 'recompose/setDisplayName';

import styles from './ListItem.css';


const enhance = compose(
  setDisplayName('ListItem'),
  withHandlers({
    onButtonClick: (props) => () => {
      props.onClick(props.roomName);
    },
  }),
);

function ListItemRenderer(props) {
  const { active, onButtonClick, children } = props;

  return (
    <li className={styles.container}>
      <button className={active ? styles.activeItem : styles.item} onClick={onButtonClick}>
        {children}
      </button>
    </li>
  );
}

ListItemRenderer.propTypes = {
  children: PropTypes.node.isRequired,
  active: PropTypes.bool.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

export default enhance(ListItemRenderer);
