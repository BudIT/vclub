import { createSelector } from 'reselect';
import {
  ChatRoomType, WhiteboardRoomType, SharingRoomType, MediaRoomType,
} from 'vclub/constants/roomTypes';


const mastersSelector = createSelector(
  state => state.members,
  members => members.filter(member => member.master).map(member => member.id)
);

const allMembersSelector = createSelector(
  state => state.members,
  members => members.map(member => member.id)
);

const sharingRoomSelector = createSelector(
  mastersSelector,
  state => state.sharingRoom.ballPosition,
  (masters, ballPosition) => (
    (ballPosition && !masters.includes(ballPosition)) ? [...masters, ballPosition] : masters
  )
);

export const ByRoomSelectors = {
  [ChatRoomType]: allMembersSelector,
  [SharingRoomType]: sharingRoomSelector,
  [WhiteboardRoomType]: allMembersSelector,
  [MediaRoomType]: mastersSelector,
};

export const DefaultStreamsSelector = mastersSelector;
