import React, { PropTypes } from 'react';

import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import withState from 'recompose/withState';
import setDisplayName from 'recompose/setDisplayName';
import onOutsideClick from 'vclub/utils/hoc/onOutsideClick';

import SvgIcon from 'vclub/components/icons/SvgIcon';

import getRoomTitle from 'vclub/utils/getRoomTitle';
import {
  ChatRoomType, WhiteboardRoomType, SharingRoomType, MediaRoomType,
} from 'vclub/constants/roomTypes';


import ListItem from './ListItem/ListItem';

import styles from './RoomSelect.css';
import dropdownIcon from './ic_arrow_drop_down_black_24px.svg';


const roomList = [
  ChatRoomType,
  SharingRoomType,
  MediaRoomType,
  WhiteboardRoomType,
];

const enhance = compose(
  setDisplayName('RoomSelect'),
  withState('opened', 'setOpened', false),
  onOutsideClick((props) => {
    if (props.opened) {
      props.setOpened(false);
    }
  }),
  withHandlers({
    onTriggerClick: (props) => () => {
      props.setOpened(!props.opened);
    },
    onItemClick: (props) => (roomName) => {
      props.onChange(roomName);
      props.setOpened(false);
    },
  }),
);

function RoomSelectRenderer(props) {
  const {
    opened,
    currentRoomName,
    user,
    onTriggerClick,
    onItemClick,
  } = props;

  return (
    <div>
      <button className={styles.trigger} onClick={onTriggerClick}>
        {getRoomTitle(currentRoomName)}
        <SvgIcon className={styles.dropdownIcon} glyph={dropdownIcon} />
      </button>
      {opened && (
        <ul className={styles.dropdownList}>
          {roomList.map((roomName, index) => (
            <ListItem
              active={roomName === currentRoomName}
              key={index}
              user={user}
              roomName={roomName}
              onClick={onItemClick}
            >
              {getRoomTitle(roomName)}
            </ListItem>
          ))}
        </ul>
      )}
    </div>
  );
}

RoomSelectRenderer.propTypes = {
  opened: PropTypes.bool.isRequired,
  currentRoomName: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    master: PropTypes.bool.isRequired,
  }).isRequired,
  onItemClick: PropTypes.func.isRequired,
  onTriggerClick: PropTypes.func.isRequired,
};

export default enhance(RoomSelectRenderer);
