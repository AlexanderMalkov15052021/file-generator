import { palletDist } from "@/constants";
import { GeneratorStor } from "@/entities";
import { getAtan2 } from "@/helpers/math";
import { pallet } from "@/helpers/points/pallet";
import { Coords, MooeDoc } from "@/types";
import { getPointIdsBuffer } from "./getPointIdsBuffer";

export const addFlowPalletPoints = (mooeDoc: MooeDoc, newPoints: Coords[], sideAngle: number) => {

    const {
        store: { lastFlowNum, namingOrder },
    } = GeneratorStor;

    const pointIdsBuffer = getPointIdsBuffer(mooeDoc);

    const angle = getAtan2(newPoints[0].x, newPoints[0].y, newPoints[newPoints.length - 1].x, newPoints[newPoints.length - 1].y);

    return palletDist.map((dist: number, distIndex: number) => {

        return newPoints.map((coords: Coords, index: number) => {

            const pointX = Math.cos(angle + sideAngle) * dist + coords.x;
            const pointY = Math.sin(angle + sideAngle) * dist + coords.y;

            const columnName = namingOrder === 1 ? String(newPoints.length - index) :String(index + 1);
            const rowName = String(distIndex + 1);
            const targetRowName = rowName.length === 1 ? `0${rowName}` : rowName;
            const targetColumnName = columnName.length === 1 ? `0${columnName}` : columnName;

            mooeDoc?.mLaneMarks.push(pallet(
                lastFlowNum,
                pointIdsBuffer[index + newPoints.length * distIndex],
                targetColumnName,
                targetRowName,
                pointX,
                pointY,
                angle + sideAngle,
                "GT"
            ));

            const name = `GT${lastFlowNum}col${targetColumnName}row${targetRowName}`

            return name;

        });

    });

}