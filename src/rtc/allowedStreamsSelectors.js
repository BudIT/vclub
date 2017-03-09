import { createSelector } from 'reselect';
import {
  ChatRoomType, WhiteboardRoomType, SharingRoomType, MediaRoomType,
} from 'vclub/constants/roomTypes';


const mastersSelector = createSelector(
  state => state.members.online,
  members => members.filter(member => member.master).map(member => member.id)
);

const allMembersSelector = createSelector(
  state => state.members.online,
  members => members.map(member => member.id)
);

const sharingRoomSelector = createSelector(
  allMembersSelector,
  mastersSelector,
  state => state.sharingRoom.ballPosition,
  (all, masters, ballPosition) => {
    if (!ballPosition) {
      return all;
    }

    return masters.includes(ballPosition) ? masters : [...masters, ballPosition];
  }
);

export const ByRoomSelectors = {
  [ChatRoomType]: allMembersSelector,
  [SharingRoomType]: sharingRoomSelector,
  [WhiteboardRoomType]: allMembersSelector,
  [MediaRoomType]: allMembersSelector,
};

export const DefaultStreamsSelector = mastersSelector;
