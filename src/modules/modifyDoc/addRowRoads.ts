import { GeneratorStor } from "@/entities";
import { road } from "@/helpers/points/road";
import { Coords, MooeDoc } from "@/types";
import { getRoadIdsBuffer } from "./getRoadIdsBuffer";
import { getLaneIdsBuffer } from "./getLaneIdsBuffer";

export const addRowRoads = (mooeDoc: MooeDoc, endPoints: Coords[], isInnerColumn?: boolean) => {

    const {
        store: { dirRoad },
    } = GeneratorStor;

    // const reverseDir = dirRoad == 1 ? 2 : 1;

    const roadIdsBuffer = getRoadIdsBuffer(mooeDoc);
    const laneIdsBuffer = getLaneIdsBuffer(mooeDoc);

    for (let i = 1; i < endPoints.length; i++) {

        const startId = isInnerColumn ? endPoints[i].id : endPoints[i - 1].id;
        const endId = isInnerColumn ? endPoints[i - 1].id : endPoints[i].id;

        const targetStartId = dirRoad === 1 ? startId : endId;
        const targeEndId = dirRoad === 1 ? endId : startId;

        const startPos = isInnerColumn ? endPoints[i] : endPoints[i - 1];
        const endPos = isInnerColumn ? endPoints[i - 1] : endPoints[i];

        const targetStartPos = dirRoad === 1 ? startPos : endPos;
        const targeEndPos = dirRoad === 1 ? endPos : startPos;

        mooeDoc?.mRoads.push(
            road(
                targetStartId,
                targeEndId,
                targetStartPos,
                targeEndPos,
                roadIdsBuffer[i],
                laneIdsBuffer[i],
                0,
                1,
                0
                // isInnerColumn ? reverseDir : dirRoad
            )
        );
    }

}