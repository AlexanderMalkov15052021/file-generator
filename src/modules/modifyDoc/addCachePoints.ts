import { fromStackToCachePoint } from "@/constants";
import { getAtan2 } from "@/helpers/math";
import { Coords, MooeDoc } from "@/types";
import { GeneratorStor } from "@/entities";
import { cachePoint } from "@/helpers/points/cachePoint";

export const addCachePoints = (
    mooeDoc: MooeDoc, newPoints: Coords[], lastPointId: number, lastNum: number, sideAngle: number
) => {

    const {
        store: { formValues },
    } = GeneratorStor;

    const angle = getAtan2(newPoints[0].x, newPoints[0].y, newPoints[newPoints.length - 1].x, newPoints[newPoints.length - 1].y);

    newPoints.map((points: Coords, index: number) => {

        const targetPointX = Math.cos(angle + sideAngle) * fromStackToCachePoint + points.x;
        const targetPointY = Math.sin(angle + sideAngle) * fromStackToCachePoint + points.y;

        mooeDoc?.mLaneMarks.push(
            cachePoint(lastPointId + index, targetPointX, targetPointY, formValues?.angle ?? 0, lastNum, 1, index + 1, "C")
        );
    });

}