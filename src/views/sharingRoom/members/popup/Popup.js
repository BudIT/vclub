import React, { PropTypes } from 'react';

import compose from 'recompose/compose';
import onOutsideClick from 'vclub/utils/hoc/onOutsideClick';
import withDispatch from 'vclub/utils/hoc/withDispatch';

import style from './Popup.css';


const enhance = compose(
  withDispatch(),
  onOutsideClick(),
);

function Popup(props) {
  const { title, onClick } = props;

  return (
    <div className={style.hideShowMenu}>
      <button className={style.hideShowBtn} onClick={onClick}>
        {title}
      </button>
    </div>
  );
}

Popup.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default enhance(Popup);
