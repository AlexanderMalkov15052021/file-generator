export const toRadians = (angle: number) => angle * (Math.PI / 180);

export const getRoundedNumber = (value: number, rounding: number) => Math.round(value * rounding) / rounding;

export const getDistancePoints = (x1: number, y1: number, x2: number, y2: number) =>
    Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));

export const pointToLine = (x1: number, y1: number, x2: number, y2: number, distance: number) => {
    const Rab = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const k = distance / Rab;
    const Xc = getRoundedNumber(Number(x1) + Number(x2 - x1) * k, 1000);
    const Yc = getRoundedNumber(Number(y1) + Number(y2 - y1) * k, 1000);

    return { x: Xc, y: Yc };
}