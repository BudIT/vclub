let diff = 0;

export default {
  now: () => Date.now() + diff,
  setDiff: (newDiff) => { diff = newDiff; },
  elapsedFrom: (serverTime) => Date.now() - (serverTime - diff),
};
