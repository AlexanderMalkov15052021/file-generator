import { GeneratorStor } from "@/entities";
import { getDistancePoints, getRoundedNumber, pointToLine } from "@/helpers/math";
import { Coords } from "@/types";

export const getFirstRowPoints = () => {

    const {
        store: { formValues },
    } = GeneratorStor;

    const newPoints: Coords[] = [];

    const distBetweenPoints = getDistancePoints(formValues?.x1 ?? 0, formValues?.y1 ?? 0, formValues?.x2 ?? 0, formValues?.y2 ?? 0);

    const dist = (formValues?.numRow ?? 0) <= 2
        ? getRoundedNumber(distBetweenPoints, 1000)
        : getRoundedNumber(distBetweenPoints / ((formValues?.numRow ?? 0) - 1), 1000);

    if ((formValues?.numRow ?? 0) > 2) {

        newPoints.push({ x: Number(formValues?.x1), y: Number(formValues?.y1), id: 1 });

        for (let i = 0; i < (formValues?.numRow ?? 0) - 2; i++) {
            newPoints.push(pointToLine(formValues?.x1 ?? 0, formValues?.y1 ?? 0, formValues?.x2 ?? 0, formValues?.y2 ?? 0, dist * (i + 1), i));
        }

        newPoints.push({ x: Number(formValues?.x2), y: Number(formValues?.y2), id: newPoints.length });
    }
    else {
        newPoints.push(
            { x: Number(formValues?.x1), y: Number(formValues?.y1), id: 1  },
            { x: Number(formValues?.x2), y: Number(formValues?.y2), id: 2  }
        );
    }

    return newPoints;
}