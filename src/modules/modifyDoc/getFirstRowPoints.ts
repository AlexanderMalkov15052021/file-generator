import { GeneratorStor } from "@/entities";
import { getAtan2, getDistancePoints, getRoundedNumber, pointToLine } from "@/helpers/math";
import { Coords } from "@/types";

export const getFirstRowPoints = (isInnerColumn?: boolean) => {

    const {
        store: { formValues },
    } = GeneratorStor;

    const angle = getAtan2(Number(formValues?.x1), Number(formValues?.y1), Number(formValues?.x2), Number(formValues?.y2));

    const pointX1 = Number(formValues?.x1 ?? 0) + Math.cos(angle - Math.PI / 2)
        * (formValues?.columnsInterval ?? 0) * (isInnerColumn ? 1 : 0);
    const pointX2 = Number(formValues?.x2 ?? 0) + Math.cos(angle - Math.PI / 2)
        * (formValues?.columnsInterval ?? 0) * (isInnerColumn ? 1 : 0);
    
    const pointY1 = Number(formValues?.y1 ?? 0) + Math.sin(angle - Math.PI / 2)
        * (formValues?.columnsInterval ?? 0) * (isInnerColumn ? 1 : 0);
    const pointY2 = Number(formValues?.y2 ?? 0) + Math.sin(angle - Math.PI / 2)
        * (formValues?.columnsInterval ?? 0) * (isInnerColumn ? 1 : 0);

    const newPoints: Coords[] = [];

    const distBetweenPoints = getDistancePoints(pointX1, pointY1, pointX2, pointY2);

    const dist = (formValues?.numRow ?? 0) <= 2
        ? getRoundedNumber(distBetweenPoints, 1000)
        : getRoundedNumber(distBetweenPoints / ((formValues?.numRow ?? 0) - 1), 1000);

    if ((formValues?.numRow ?? 0) > 2) {

        newPoints.push({ x: pointX1, y: pointY1, id: 1 });

        for (let i = 0; i < (formValues?.numRow ?? 0) - 2; i++) {
            newPoints.push(pointToLine(pointX1, pointY1, pointX2, pointY2, dist * (i + 1), i));
        }

        newPoints.push({ x: pointX2, y: pointY2, id: newPoints.length });
    }
    else {
        newPoints.push(
            { x: pointX1, y: pointY1, id: 1 },
            { x: pointX2, y: pointY2, id: 2 }
        );
    }

    return newPoints;
}