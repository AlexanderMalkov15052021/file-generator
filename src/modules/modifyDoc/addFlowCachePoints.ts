import { cachePointDist } from "@/constants";
import { getAtan2 } from "@/helpers/math";
import { cachePoint } from "@/helpers/points/cachePoint";
import { Coords, MooeDoc } from "@/types";
import { getPointIdsBuffer } from "./getPointIdsBuffer";
import { GeneratorStor } from "@/entities";

export const addFlowCachePoints = (mooeDoc: MooeDoc, newPoints: Coords[], sideAngle: number) => {

    const {
        store: { lastFlowNum, namingOrder },
    } = GeneratorStor;

    const angle = getAtan2(newPoints[0].x, newPoints[0].y, newPoints[newPoints.length - 1].x, newPoints[newPoints.length - 1].y);

    const pointIdsBuffer = getPointIdsBuffer(mooeDoc);

    cachePointDist.map((dist: number, distIndex: number) => {

        newPoints.map((coords: Coords, index: number) => {

            const pointX = Math.cos(angle + sideAngle) * dist + coords.x;
            const pointY = Math.sin(angle + sideAngle) * dist + coords.y;

            const columnName = namingOrder === 1 ? String(newPoints.length - index) :String(index + 1);
            const rowName = String(distIndex + 1);
            const targetRowName = rowName.length === 1 ? `0${rowName}` : rowName;
            const targetColumnName = columnName.length === 1 ? `0${columnName}` : columnName;

            mooeDoc?.mLaneMarks.push(cachePoint(
                pointIdsBuffer[index + newPoints.length * distIndex],
                pointX,
                pointY,
                angle + sideAngle,
                lastFlowNum,
                targetColumnName,
                targetRowName,
                "识别",
                "GT"
            ));

        });

    });

}