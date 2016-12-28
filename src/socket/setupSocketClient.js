import { setConnected, setDisconnected } from 'vclub/redux/club/socket';
import ServerTime from 'vclub/utils/ServerTime';


export default function setupSocketClient(socket, store) {
  socket.on('connect', () => store.dispatch(setConnected()));

  socket.on('disconnect', () => store.dispatch(setDisconnected()));

  socket.on('dispatch', action => store.dispatch(action));

  socket.on('time:response', data => {
    const duration = Date.now() - data.clientStartTime;
    const clientEventTime = data.clientStartTime + (duration / 2);
    const diff = data.serverTime - clientEventTime;

    ServerTime.setDiff(diff);
  });

  socket.emit('time:request', Date.now());
}
