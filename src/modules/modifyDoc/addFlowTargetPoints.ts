import { distCenterToTargetPoint, roadsDist } from "@/constants";
import { getAtan2 } from "@/helpers/math";
import { Coords, MooeDoc } from "@/types";
import { targetPoint } from "@/helpers/points/targetPoint";

export const addFlowTargetPoints = (
    mooeDoc: MooeDoc, newPoints: Coords[], lastPointId: number, lastNum: number, dirPoint: number, dirRot: number
) => {

    const angle = getAtan2(newPoints[0].x, newPoints[0].y, newPoints[newPoints.length - 1].x, newPoints[newPoints.length - 1].y);

    newPoints.map((points: Coords, index: number) => {

        const pointX = Math.cos(angle - Math.PI) * (distCenterToTargetPoint / 2 * dirPoint) + points.x;
        const pointY = Math.sin(angle - Math.PI) * (distCenterToTargetPoint / 2 * dirPoint) + points.y;

        mooeDoc?.mLaneMarks.push(targetPoint(
            lastPointId + index,
            pointX,
            pointY,
            angle + Math.PI,
            lastNum,
            index + 1,
            roadsDist.length,
            "前置点",
            dirRot
        ));
    });

}