import { fromStackToTargetPoint } from "@/constants";
import { getAtan2 } from "@/helpers/math";
import { Coords, MooeDoc } from "@/types";
import { targetPoint } from "@/helpers/points/targetPoint";
import { GeneratorStor } from "@/entities";

export const addTargetPoints = (
    mooeDoc: MooeDoc, newPoints: Coords[], lastPointId: number, lastNum: number, sideAngle: number
) => {

    const {
        store: { formValues },
    } = GeneratorStor;

    const angle = getAtan2(newPoints[0].x, newPoints[0].y, newPoints[newPoints.length - 1].x, newPoints[newPoints.length - 1].y);

    newPoints.map((points: Coords, index: number) => {

        const targetPointX = Math.cos(angle + sideAngle) * fromStackToTargetPoint + points.x;
        const targetPointY = Math.sin(angle + sideAngle) * fromStackToTargetPoint + points.y;

        mooeDoc?.mLaneMarks.push(
            targetPoint(lastPointId + index, targetPointX, targetPointY, formValues?.angle ?? 0, lastNum, 1, index + 1, "B", 0)
        );
    });

}