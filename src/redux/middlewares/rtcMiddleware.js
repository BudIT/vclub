import createRTCAPI from 'vclub/rtc/createRTCAPI';


export default function rtcMiddleware(ioSocket) {
  return (store) => {
    const rtcAPI = createRTCAPI(ioSocket, store);

    return (next) => (action) => {
      const prevState = store.getState();
      const result = next(action);

      rtcAPI.dispatch(action, prevState);

      return result;
    };
  };
}
