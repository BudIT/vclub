import React, { PropTypes } from 'react';

import composedComponent from 'vclub/utils/composedComponent';
import { connect } from 'react-redux';
import withHandlers from 'recompose/withHandlers';
import withState from 'recompose/withState';
import setPropTypes from 'recompose/setPropTypes';
import onOutsideClick from 'vclub/utils/hoc/onOutsideClick';

import { changeRoom } from 'vclub/redux/club/rooms';

import getRoomTitle from 'vclub/utils/getRoomTitle';
import {
  ChatRoomType, WhiteboardRoomType, SharingRoomType, MediaRoomType,
} from 'vclub/constants/roomTypes';

import ListItem from './ListItem/ListItem';

import styles from './RoomSelectButton.css';
import buttonStyles from '../Button.css';


const roomList = [
  ChatRoomType,
  SharingRoomType,
  MediaRoomType,
  WhiteboardRoomType,
];

export default composedComponent(
  'RoomSelectButton',

  connect(state => ({
    user: state.auth.user,
    currentRoom: state.rooms.currentRoom,
  })),

  setPropTypes({
    dispatch: PropTypes.func,
  }),

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
    onItemClick: (props) => (room) => {
      props.dispatch(changeRoom(room));
      props.setOpened(false);
    },
  }),

  (props) => {
    const {
      opened,
      user,
      currentRoom,
      onToggleClick,
      onItemClick,
    } = props;

    const buttonStyle = opened ? 'active' : 'button';

    return (
      <div styleName="buttonStyles.container">
        <button
          styleName={`buttonStyles.${buttonStyle}`}
          onClick={onToggleClick}
        >
          {getRoomTitle(currentRoom).charAt(0)}
        </button>
        {opened && (
          <ul styleName="styles.popup">
            {roomList.map((room) => (
              <ListItem
                key={room}
                room={room}
                active={room === currentRoom}
                user={user}
                onClick={onItemClick}
              >
                {getRoomTitle(room)}
              </ListItem>
            ))}
          </ul>
        )}
      </div>
    );
  }
);
