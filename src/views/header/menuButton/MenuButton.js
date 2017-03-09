import React from 'react';

import composedComponent from 'vclub/utils/composedComponent';
import withHandlers from 'recompose/withHandlers';
import withState from 'recompose/withState';
import onOutsideClick from 'vclub/utils/hoc/onOutsideClick';
import withDispatch from 'vclub/utils/hoc/withDispatch';

import { logOut } from 'vclub/redux/club/auth';

import SvgIcon from 'vclub/components/icons/SvgIcon';

import menuIcon from './ic_menu_black_24px.svg';
import styles from './MenuButton.css';


export default composedComponent(
  'UserListButton',

  withDispatch(),

  withState('opened', 'setOpened', false),

  onOutsideClick((props) => {
    if (props.opened) {
      props.setOpened(false);
    }
  }),

  withHandlers({
    onToggleClick: (props) => () => {
      props.setOpened(!props.opened);
    },
    onLogout: (props) => () => {
      props.dispatch(logOut());
      props.setOpened(false);
    },
  }),

  (props) => {
    const {
      opened,
      onToggleClick,
      onLogout,
    } = props;

    // const buttonStyle = opened ? 'active' : 'button';

    return (
      <div styleName="container">
        <button
          styleName="button"
          onClick={onToggleClick}
        >
          <SvgIcon glyph={menuIcon} />
        </button>
        {opened && (
          <ul styleName="popup">
            <li styleName="item-container">
              <button styleName="item" onClick={onLogout}>
                Выйти
              </button>
            </li>
          </ul>
        )}
      </div>
    );
  }
);
