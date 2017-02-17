import {
  ChatRoomType, WhiteboardRoomType, SharingRoomType, MediaRoomType,
} from 'vclub/constants/roomTypes';


const roomTitles = {
  [ChatRoomType]: 'Беседка',
  [SharingRoomType]: 'Шеринг',
  [WhiteboardRoomType]: 'Доска',
  [MediaRoomType]: 'Вещание',
};

export default function getRoomTitle(roomName) {
  return roomTitles[roomName] || roomName;
}
