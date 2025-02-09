import * as geolib from 'geolib';
import getGeoPointByRatio from 'src/geo/getGeoPointByRatio';

const getLength = (current: { lng: number; lat: number }, prev: { lng: number; lat: number }) => {
  return geolib.getDistance(prev, current);
};

describe('getGeoPointByRatio', () => {
  describe('default', () => {
    const path = [
        { lng: 0, lat: 0 },
        { lng: 50, lat: 100 },
        { lng: 100, lat: 200 },
      ],
      pathWithDistanceRatio = [
        { ...path[0], distance: 0, distanceDelta: 0, index: 0, ratio: 0 },
        {
          ...path[1],
          distance: getLength(path[1], path[0]),
          distanceDelta: getLength(path[1], path[0]),
          index: 1,
          ratio: getLength(path[1], path[0]) / (getLength(path[1], path[0]) + getLength(path[2], path[1])),
        },
        {
          ...path[2],
          distance: getLength(path[1], path[0]) + getLength(path[2], path[1]),
          distanceDelta: getLength(path[2], path[1]),
          index: 2,
          ratio: 1,
        },
      ];
    test('ratio=0', () => {
      const result = getGeoPointByRatio(pathWithDistanceRatio, 0);
      expect(result).toEqual(pathWithDistanceRatio[0]);
    });
    test('ratio=0.2', () => {
      const result = getGeoPointByRatio(pathWithDistanceRatio, 0.2);
      expect(result).toEqual({
        lng: 20.7263327488285,
        lat: 41.452665497657,
        distance: 5064260,
        distanceDelta: 5064260,
        index: 1,
        ratio: 0.2,
      });
    });
    test('ratio=0.5', () => {
      const result = getGeoPointByRatio(pathWithDistanceRatio, 0.5);
      expect(result).toEqual({
        lng: 51.6928729646855,
        lat: 103.385745929371,
        distance: 11110951,
        distanceDelta: 378790,
        index: 2,
        ratio: 0.5,
      });
    });
    test('ratio=0.8', () => {
      const result = getGeoPointByRatio(pathWithDistanceRatio, 0.8);
      expect(result).toEqual({
        lng: 80.67714918587421,
        lat: 161.35429837174843,
        distance: 17728269,
        distanceDelta: 6996108,
        index: 2,
        ratio: 0.8,
      });
    });
    test('ratio=1', () => {
      const result = getGeoPointByRatio(pathWithDistanceRatio, 1);
      expect(result).toEqual(pathWithDistanceRatio[2]);
    });
  });
});
