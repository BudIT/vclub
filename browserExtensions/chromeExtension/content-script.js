/* global chrome */

const VERSION = 1;

const handlers = {
  'vclub:screenShare:requestSourceId': () => {
    chrome.runtime.sendMessage({ type: 'vclub:requestSourceId' }, (response) => {
      window.postMessage({
        type: 'vclub:screenShare:response',
        response,
      }, '*');
    });
  },
  'vclub:ping': () => {
    window.postMessage({
      type: 'vclub:extension:loaded',
      version: VERSION,
    }, '*');
  },
};

window.addEventListener('message', (event) => {
  if (event.source !== window) return;

  const handler = handlers[event.data.type];

  if (handler) {
    handler(event.data, event);
  }
});


handlers['vclub:ping']();
