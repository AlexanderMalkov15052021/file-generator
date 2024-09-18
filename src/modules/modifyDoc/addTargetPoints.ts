import { fromStackToTargetPoint } from "@/constants";
import { getAtan2 } from "@/helpers/math";
import { Coords, MooeDoc } from "@/types";
import { targetPoint } from "@/helpers/points/targetPoint";
import { GeneratorStor } from "@/entities";
import { getPointIdsBuffer } from "./getPointIdsBuffer";

export const addTargetPoints = (
    mooeDoc: MooeDoc, newPoints: Coords[], sideAngle: number, isInnerColumn?: boolean
) => {

    const {
        store: { formValues, zoneType, lastStreamNum },
    } = GeneratorStor;

    const pointIdsBuffer = getPointIdsBuffer(mooeDoc);

    const angle = getAtan2(newPoints[0].x, newPoints[0].y, newPoints[newPoints.length - 1].x, newPoints[newPoints.length - 1].y);

    newPoints.map((points: Coords, index: number) => {

        const targetPointX = Math.cos(angle + sideAngle) * fromStackToTargetPoint + points.x;
        const targetPointY = Math.sin(angle + sideAngle) * fromStackToTargetPoint + points.y;

        const zoneName = zoneType === 1 ? formValues?.alleySymbol ?? "A" : "GT";
        const columnName = isInnerColumn ? "02" : "01";
        const rowName = String(newPoints.length - index);
        const targetRowName = rowName.length === 1 ? `0${rowName}` : rowName;

        mooeDoc?.mLaneMarks.push(
            targetPoint(
                pointIdsBuffer[index],
                targetPointX,
                targetPointY,
                angle + (isInnerColumn ? -Math.PI / 2 : Math.PI / 2),
                lastStreamNum,
                columnName,
                targetRowName,
                "检",
                0,
                zoneName
            )
        );
    });

}