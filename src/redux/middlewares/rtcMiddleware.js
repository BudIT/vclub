import createRTCAPI from 'vclub/rtc/createRTCAPI';


export default function rtcMiddleware(ioSocket) {
  return (store) => {
    const rtcAPI = createRTCAPI(ioSocket, store);

    return (next) => (action) => {
      const result = next(action);

      rtcAPI.dispatch(action);

      return result;
    };
  };
}
