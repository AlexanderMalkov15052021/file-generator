import { fromStackToCachePoint } from "@/constants";
import { getAtan2 } from "@/helpers/math";
import { road } from "@/helpers/points/road";
import { roadPoint } from "@/helpers/points/roadPoint";
import { Coords, MooeDoc } from "@/types";
import { getPointIdsBuffer } from "./getPointIdsBuffer";
import { getRoadIdsBuffer } from "./getRoadIdsBuffer";
import { getLaneIdsBuffer } from "./getLaneIdsBuffer";
import { GeneratorStor } from "@/entities";

export const addEntranceRoadFlow = (
    mooeDoc: MooeDoc, endPoints: Coords[], newPoints: Coords[]
) => {

    const {
        store: { dirRoad },
    } = GeneratorStor;

    const pointIdsBuffer = getPointIdsBuffer(mooeDoc);
    const roadIdsBuffer = getRoadIdsBuffer(mooeDoc);
    const laneIdsBuffer = getLaneIdsBuffer(mooeDoc);

    const angle = getAtan2(newPoints[0].x, newPoints[0].y, newPoints[newPoints.length - 1].x, newPoints[newPoints.length - 1].y);


    const endPointIndex = dirRoad === 1 ? endPoints.length - 1 : 0;

    const endPointDir = dirRoad === 1 ? 0 : -Math.PI;


    const pointX = endPoints[endPointIndex].x;
    const pointY = endPoints[endPointIndex].y;

    const newPointX = Math.cos(angle + endPointDir) * fromStackToCachePoint + pointX;
    const newPointY = Math.sin(angle + endPointDir) * fromStackToCachePoint + pointY;

    mooeDoc?.mLaneMarks.push(roadPoint("", pointIdsBuffer[0], newPointX, newPointY, angle));

    const endId = endPoints[endPointIndex].id;

    mooeDoc?.mRoads.push(
        road(
            pointIdsBuffer[0],
            endId,
            { x: newPointX, y: newPointY, id: pointIdsBuffer[0] },
            endPoints[endPointIndex],
            roadIdsBuffer[0],
            laneIdsBuffer[0],
            angle,
            2
        )
    );

}