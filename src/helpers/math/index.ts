export const toRadians = (angle: number) => angle * (Math.PI / 180);

export const getRoundedNumber = (value: number, rounding: number) => Math.round(value * rounding) / rounding;

export const getDistancePoints = (x1: number, y1: number, x2: number, y2: number) =>
    Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));

export const pointToLine = (x1: number, y1: number, x2: number, y2: number, distance: number, id: number) => {
    const Rab = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const k = distance / Rab;
    const Xc = getRoundedNumber(Number(x1) + Number(x2 - x1) * k, 1000);
    const Yc = getRoundedNumber(Number(y1) + Number(y2 - y1) * k, 1000);

    return { x: Xc, y: Yc, id };
}

export const getAtan2 = (x1: number, y1: number, x2: number, y2: number) => {
    var dy = y2 - y1;
    var dx = x2 - x1;
    var res = Math.atan2(dy, dx);

    return res;
}

// новое положение координат при развороте на определённый угол
export const getNewCoords = (x: number, y: number, angle: number) => {
    const newX = Math.cos(angle) * x - Math.sin(angle) * y;
    const newY = Math.sin(angle) * x + Math.cos(angle) * y;

    return { x: newX, y: newY }
}

// новое положение координат при перемещении на определённый угол под определённым углом
export const getNewPointPos = (xPos: number, yPos: number, angleRad: number, dist: number) => {
    // const newAngleRad = newAngle * (Math.PI / 180)  // to radians

    const new_x = xPos + dist * Math.cos(angleRad);
    const new_y = yPos + dist * Math.sin(angleRad);

    return { x: new_x, y: new_y }

}