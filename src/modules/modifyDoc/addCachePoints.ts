import { fromStackToCachePoint } from "@/constants";
import { getAtan2 } from "@/helpers/math";
import { Coords, MooeDoc } from "@/types";
import { cachePoint } from "@/helpers/points/cachePoint";

export const addCachePoints = (
    mooeDoc: MooeDoc, newPoints: Coords[], lastPointId: number, lastNum: number, sideAngle: number, isInnerColumn?: boolean
) => {

    const angle = getAtan2(newPoints[0].x, newPoints[0].y, newPoints[newPoints.length - 1].x, newPoints[newPoints.length - 1].y);

    newPoints.map((points: Coords, index: number) => {

        const targetPointX = Math.cos(angle + sideAngle) * fromStackToCachePoint + points.x;
        const targetPointY = Math.sin(angle + sideAngle) * fromStackToCachePoint + points.y;

        mooeDoc?.mLaneMarks.push(
            cachePoint(
                lastPointId + index, targetPointX, targetPointY, angle + (isInnerColumn ? -Math.PI / 2 : Math.PI / 2),
                lastNum, 1, index + 1, "C"
            ));
    });

}