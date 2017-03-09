import React from 'react';

import composedComponent from 'vclub/utils/composedComponent';
import { connect } from 'react-redux';
import withHandlers from 'recompose/withHandlers';

import { toggleChat } from 'vclub/redux/club/ui';

import SvgIcon from 'vclub/components/icons/SvgIcon';
import chatIcon from './ic_chat_black_24px.svg';

import styles from './ChatButton.css';
import buttonStyles from '../Button.css';


export default composedComponent(
  'ChatButton',

  connect(state => ({
    unreadCount: state.chat.unreadCount,
    displayChat: state.ui.displayChat,
  })),

  withHandlers({
    onClick: (props) => () => {
      props.dispatch(toggleChat());
    },
  }),

  (props) => {
    const { displayChat, unreadCount, onClick } = props;

    return (
      <div styleName="buttonStyles.container">
        <button styleName="buttonStyles.button" onClick={onClick}>
          <SvgIcon glyph={chatIcon} />
        </button>
        {!displayChat && unreadCount > 0 && (
          <span styleName="buttonStyles.badge">{unreadCount}</span>
        )}
      </div>
    );
  }
);
