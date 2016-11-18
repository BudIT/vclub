const params = {
  xOffset: 20,
  yOffset: 20,
  elementWidth: 50,
  elementHeight: 50,
  stageWidth: window.innerWidth,
  stageHeight: window.innerHeight,
  lineWidth: 7,
};

const offsetsHelpers = (function offsetsHelpers() {
  const startCoordinates = {
    x: params.xOffset,
    y: params.yOffset,
    x1: params.xOffset + params.elementWidth,
    y1: params.yOffset + params.elementHeight,
  };

  return {
    getCoordinatesForLowerElement(coordinates) {
      return {
        ...coordinates,
        y: coordinates.y1 + params.yOffset,
        y1: coordinates.y1 + params.yOffset + params.elementHeight,
      };
    },
    getCoordinatesForRighterElement(coordinates) {
      return {
        ...coordinates,
        x: coordinates.x1 + params.xOffset,
        x1: coordinates.x1 + params.xOffset + params.elementWidth,
      };
    },
    getBorderCoordinates(coordinates) {
      return {
        y: params.yOffset,
        y1: params.stageHeight - params.yOffset,
        x: coordinates.x1 + params.xOffset,
      };
    },
    startCoordinates,
  };
}());

export default offsetsHelpers;
