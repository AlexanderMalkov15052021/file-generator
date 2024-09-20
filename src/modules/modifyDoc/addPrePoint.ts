import { distCenterToTargetPoint, fromStackToEnd, roadsDist } from "@/constants";
import { getAtan2 } from "@/helpers/math";
import { Coords, MooeDoc } from "@/types";
import { GeneratorStor } from "@/entities";
import { getPointIdsBuffer } from "./getPointIdsBuffer";
import { prePoint } from "@/helpers/points/prePoint";

export const addPrePoint = (mooeDoc: MooeDoc, newPoints: Coords[], sideAngle: number, innerFlow?: boolean) => {

    const {
        store: { lastFlowNum, dirRoad, cellSide },
    } = GeneratorStor;

    const angle = getAtan2(newPoints[0].x, newPoints[0].y, newPoints[newPoints.length - 1].x, newPoints[newPoints.length - 1].y);

    const pointIdsBuffer = getPointIdsBuffer(mooeDoc);

    const pointDir = dirRoad === 1 ? sideAngle : sideAngle - Math.PI;
    const prePointDir = innerFlow ? pointDir - Math.PI : pointDir;

    const pointAngle = dirRoad === 1 ? angle + Math.PI : angle;

    const newPointIndex = dirRoad === 1 ? 0 : newPoints.length - 1;

    const pointX = Math.cos(angle) * (-distCenterToTargetPoint / 2 * prePointDir) + newPoints[newPointIndex].x;
    const pointY = Math.sin(angle) * (-distCenterToTargetPoint / 2 * prePointDir) + newPoints[newPointIndex].y;

    const targetPointX = Math.cos(angle + cellSide === 1 ? Math.PI : Math.PI * 3 / 2)
        * (roadsDist[roadsDist.length - 1] - fromStackToEnd) + pointX;
    
    const targetPointY = Math.sin(angle + cellSide === 1 ? Math.PI / 2 : Math.PI * 3 / 2)
        * (roadsDist[roadsDist.length - 1] - fromStackToEnd) + pointY;

    const name = `GT${lastFlowNum}entrance`;

    mooeDoc?.mLaneMarks.push(prePoint(
        name,
        pointIdsBuffer[0],
        targetPointX,
        targetPointY,
        pointAngle,
        prePointDir
    ));

}