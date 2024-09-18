import { GeneratorStor } from "@/entities";
import { road } from "@/helpers/points/road";
import { Coords, MooeDoc } from "@/types";
import { getRoadIdsBuffer } from "./getRoadIdsBuffer";
import { getLaneIdsBuffer } from "./getLaneIdsBuffer";

export const addRowRoads = (mooeDoc: MooeDoc, endPoints: Coords[], isInnerColumn?: boolean) => {

    const {
        store: { formValues, dirRoad },
    } = GeneratorStor;

    const reverseDir = dirRoad == 1 ? 2 : 1;

    const roadIdsBuffer = getRoadIdsBuffer(mooeDoc);
    const laneIdsBuffer = getLaneIdsBuffer(mooeDoc);

    for (let i = 1; i < endPoints.length; i++) {

        const startId = endPoints[i - 1].id;
        const endId = endPoints[i].id;

        mooeDoc?.mRoads.push(
            road(
                startId,
                endId,
                endPoints[i - 1],
                endPoints[i],
                roadIdsBuffer[i],
                laneIdsBuffer[i],
                formValues?.angle ?? 0,
                isInnerColumn ? reverseDir : dirRoad
            )
        );
    }

}