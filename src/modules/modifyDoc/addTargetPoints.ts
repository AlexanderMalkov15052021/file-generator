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
        store: { formValues, zoneType, lastStreamNum, namingOrder, columnCount },
    } = GeneratorStor;

    const pointIdsBuffer = getPointIdsBuffer(mooeDoc);

    const angle = getAtan2(newPoints[0].x, newPoints[0].y, newPoints[newPoints.length - 1].x, newPoints[newPoints.length - 1].y);

    newPoints.map((points: Coords, index: number) => {

        const targetPointX = Math.cos(angle + sideAngle) * fromStackToTargetPoint + points.x;
        const targetPointY = Math.sin(angle + sideAngle) * fromStackToTargetPoint + points.y;

        const columnNum = String(formValues?.columnNum).length === 1 ? `0${formValues?.columnNum}` : String(formValues?.columnNum);

        const countUp = columnCount === 1 ? "02" : "01";
        const countDown = columnCount === 1 ? "01" : "02";

        const columnName = isInnerColumn ? countUp : countDown;

        const targetColumnName = formValues?.columnNum ? columnNum : columnName;

        const zoneName = zoneType === 1 ? formValues?.alleySymbol ?? "A" : "GT";
        const rowName = namingOrder === 1 ? String(newPoints.length - index) : String(index + 1);
        const targetRowName = rowName.length === 1 ? `0${rowName}` : rowName;

        mooeDoc?.mLaneMarks.push(
            targetPoint(
                pointIdsBuffer[index],
                targetPointX,
                targetPointY,
                angle + (isInnerColumn ? -Math.PI / 2 : Math.PI / 2),
                lastStreamNum,
                targetColumnName,
                targetRowName,
                "检",
                0,
                zoneName
            )
        );
    });

}