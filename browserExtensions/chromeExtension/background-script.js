/* global chrome */

const screenOptions = ['screen', 'window'];

const handlers = {
  'vclub:requestSourceId': (request, sender, sendResponse) => {
    chrome.desktopCapture.chooseDesktopMedia(screenOptions, sender.tab, (sourceId) => {
      if (!sourceId || !sourceId.length) {
        sendResponse({
          error: true,
          message: 'Cancelled',
        });
        return;
      }

      sendResponse({ sourceId });
    });

    return true;
  },
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const handler = handlers[request.type];

  return handler && handler(request, sender, sendResponse);
});
