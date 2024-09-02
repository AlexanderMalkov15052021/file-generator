import { distSmallRoad, fromStackToCachePoint, fromStackToEnd } from "@/constants";
import { GeneratorStor } from "@/entities";
import { getAtan2 } from "@/helpers/math";
import { road } from "@/helpers/points/road";
import { roadPoint } from "@/helpers/points/roadPoint";
import { Coords, MooeDoc } from "@/types";

export const addEntranceRoad = (
    mooeDoc: MooeDoc, endPoints: Coords[], newPoints: Coords[], lastPointId: number, sideAngle: number,
    newPointsCount: number, endPointsCount: number, dirEndPoint: number
) => {

    const {
        store: { formValues },
    } = GeneratorStor;

    const angle = getAtan2(newPoints[0].x, newPoints[0].y, newPoints[newPoints.length - 1].x, newPoints[newPoints.length - 1].y);

    const pointX = Math.cos(angle + sideAngle) * (distSmallRoad - fromStackToEnd) + newPoints[newPointsCount].x;
    const pointY = Math.sin(angle + sideAngle) * (distSmallRoad - fromStackToEnd) + newPoints[newPointsCount].y;

    const newPointX = Math.cos(angle + dirEndPoint) * fromStackToCachePoint + pointX;
    const newPointY = Math.sin(angle + dirEndPoint) * fromStackToCachePoint + pointY;

    mooeDoc?.mLaneMarks.push(roadPoint(lastPointId, newPointX, newPointY, formValues?.angle ?? 0));

    const endId = endPoints[endPointsCount].id;

    mooeDoc?.mRoads.push(
        road(
            lastPointId,
            endId,
            { x: newPointX, y: newPointY, id: lastPointId },
            endPoints[endPointsCount],
            lastPointId + 10,
            formValues?.angle ?? 0,
            2
        )
    );

}