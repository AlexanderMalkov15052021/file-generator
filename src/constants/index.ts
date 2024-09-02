const distBetweenStackAndCachePoint = 0.15;

export const fromStackToCachePoint = 1.2;  // от палеты до края
export const fromStackToEnd = 0.16;  // от палеты до края
export const distSmallRoad = 2.16;  // длинна маленткой дороги
export const fromStackToTargetPoint = 0.6;  // от палеты до точки заезда
export const roadsDist = [fromStackToEnd * -1, 1.35, 2.7, 4.05, 5.4, 6.75, 8.1, 9.45, 10.8, 13.86];  // длинна малых дорог в ручьях
export const palletDist = [1.35, 2.7, 4.05, 5.4, 6.75, 8.1, 9.45, 10.8];  // длинна до паллет в ручьях
export const distCenterToTargetPoint = 0.8;  // длинна маленткой дороги
export const cachePointDist = [
    1.35 + distBetweenStackAndCachePoint,
    2.7 + distBetweenStackAndCachePoint,
    4.05 + distBetweenStackAndCachePoint,
    5.4 + distBetweenStackAndCachePoint,
    6.75 + distBetweenStackAndCachePoint,
    8.1 + distBetweenStackAndCachePoint,
    9.45 + distBetweenStackAndCachePoint,
    10.8 + distBetweenStackAndCachePoint,
    12.3
];  // длинна до cachePoint в ручьях

