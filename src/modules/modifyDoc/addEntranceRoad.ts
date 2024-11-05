import { distSmallRoad, fromStackToCachePoint, fromStackToEnd } from "@/constants";
import { GeneratorStor } from "@/entities";
import { getAtan2 } from "@/helpers/math";
import { road } from "@/helpers/points/road";
import { roadPoint } from "@/helpers/points/roadPoint";
import { Coords, MooeDoc } from "@/types";
import { getRoadIdsBuffer } from "./getRoadIdsBuffer";
import { getLaneIdsBuffer } from "./getLaneIdsBuffer";
import { getPointIdsBuffer } from "./getPointIdsBuffer";

export const addEntranceRoad = (
    mooeDoc: MooeDoc, endPoints: Coords[], newPoints: Coords[], sideAngle: number,
    newPointsCount: number, endPointsCount: number, dirEndPoint: number, isInnerColumn?: boolean
) => {

    const {
        store: { dirRoad },
    } = GeneratorStor;

    const pointIdsBuffer = getPointIdsBuffer(mooeDoc);
    const roadIdsBuffer = getRoadIdsBuffer(mooeDoc);
    const laneIdsBuffer = getLaneIdsBuffer(mooeDoc);

    const newPointsCountDown = dirRoad === 1 ? 0 : newPointsCount;
    const newPointsCountUp = dirRoad === 1 ? newPointsCount : 0;

    const endPointsCountDown = dirRoad === 1 ? 0 : endPointsCount;
    const endPointsCountUp = dirRoad === 1 ? endPointsCount : 0;

    const oppositeDirEndPoint = dirRoad === 1 ? dirEndPoint : dirEndPoint - Math.PI;

    const angle = getAtan2(newPoints[0].x, newPoints[0].y, newPoints[newPoints.length - 1].x, newPoints[newPoints.length - 1].y);

    const pointX = Math.cos(angle + sideAngle) * (distSmallRoad - fromStackToEnd)
        + newPoints[isInnerColumn ? newPointsCountDown : newPointsCountUp].x;
    const pointY = Math.sin(angle + sideAngle) * (distSmallRoad - fromStackToEnd)
        + newPoints[isInnerColumn ? newPointsCountDown : newPointsCountUp].y;

    const newPointX = Math.cos(angle + oppositeDirEndPoint) * fromStackToCachePoint + pointX;
    const newPointY = Math.sin(angle + oppositeDirEndPoint) * fromStackToCachePoint + pointY;

    mooeDoc?.mLaneMarks.push(roadPoint("", pointIdsBuffer[0], newPointX, newPointY, 0));

    const endId = endPoints[isInnerColumn ? endPointsCountDown : endPointsCountUp].id;

    mooeDoc?.mRoads.push(
        road(
            endId,
            pointIdsBuffer[0],
            endPoints[isInnerColumn ? 0 : endPointsCount],
            { x: newPointX, y: newPointY, id: pointIdsBuffer[0] },
            roadIdsBuffer[0],
            laneIdsBuffer[0],
            0,
            1,
            0
        )
    );

}