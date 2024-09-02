import { distSmallRoad, fromStackToCachePoint, fromStackToEnd } from "@/constants";
import { getAtan2 } from "@/helpers/math";
import { Coords, MooeDoc } from "@/types";
import { targetPoint } from "@/helpers/points/targetPoint";

export const addRowTargetPoints = (
    mooeDoc: MooeDoc, newPoints: Coords[], lastPointId: number, lastNum: number, sideAngle: number, dirPoint: number, dirRot: number
) => {

    const angle = getAtan2(newPoints[0].x, newPoints[0].y, newPoints[newPoints.length - 1].x, newPoints[newPoints.length - 1].y);

    newPoints.map((points: Coords, index: number) => {

        const targetPointX = Math.cos(angle + sideAngle) * (distSmallRoad - fromStackToEnd) + points.x;
        const targetPointY = Math.sin(angle + sideAngle) * (distSmallRoad - fromStackToEnd) + points.y;

        const pointX = Math.cos(angle) * (fromStackToCachePoint / 2 * dirPoint) + targetPointX;
        const pointY = Math.sin(angle) * (fromStackToCachePoint / 2 * dirPoint) + targetPointY;

        mooeDoc?.mLaneMarks.push(targetPoint(lastPointId + index, pointX, pointY, angle + Math.PI * 2, lastNum, 1, index + 1, "A", dirRot));
    });

}