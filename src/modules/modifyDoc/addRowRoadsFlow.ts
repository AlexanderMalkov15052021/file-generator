import { road } from "@/helpers/points/road";
import { Coords, MooeDoc } from "@/types";
import { getRoadIdsBuffer } from "./getRoadIdsBuffer";
import { getLaneIdsBuffer } from "./getLaneIdsBuffer";

export const addRowRoadsFlow = (mooeDoc: MooeDoc, rowPoints: Coords[][]) => {

    const roadIdsBuffer = getRoadIdsBuffer(mooeDoc);
    const laneIdsBuffer = getLaneIdsBuffer(mooeDoc);

    for (let a = 1; a < rowPoints.length; a++) {
        for (let i = 0; i < rowPoints[a - 1].length; i++) {

            const startId = rowPoints[a - 1][i].id;
            const endId = rowPoints[a][i].id;

            mooeDoc?.mRoads.push(
                road(
                    startId,
                    endId,
                    rowPoints[a - 1][i],
                    rowPoints[a][i],
                    roadIdsBuffer[i + rowPoints[a].length * a],
                    laneIdsBuffer[i + rowPoints[a].length * a],
                    0,
                    1
                )
            );
        }
    }

}