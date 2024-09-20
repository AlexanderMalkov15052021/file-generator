import { road } from "@/helpers/points/road";
import { Coords, MooeDoc } from "@/types";
import { getLaneIdsBuffer } from "./getLaneIdsBuffer";
import { getRoadIdsBuffer } from "./getRoadIdsBuffer";

export const addStartToEndRoad = (mooeDoc: MooeDoc, startPoints: Coords[], endPoints: Coords[]) => {

    const roadIdsBuffer = getRoadIdsBuffer(mooeDoc);
    const laneIdsBuffer = getLaneIdsBuffer(mooeDoc);

    for (let i = 0; i < startPoints.length; i++) {

        const startId = startPoints[i].id;
        const endId = endPoints[i].id;

        mooeDoc?.mRoads.push(
            road(startId, endId, startPoints[i], endPoints[i], roadIdsBuffer[i], laneIdsBuffer[i], 0, 1)
        );
    }

}