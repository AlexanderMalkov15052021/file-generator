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
        store: { formValues, zoneType, lastStreamNum, namingOrder, lastFlowNum },
    } = GeneratorStor;

    const pointIdsBuffer = getPointIdsBuffer(mooeDoc);

    const angle = getAtan2(newPoints[0].x, newPoints[0].y, newPoints[newPoints.length - 1].x, newPoints[newPoints.length - 1].y);

    newPoints.map((points: Coords, index: number) => {

        const targetPointX = Math.cos(angle + sideAngle) * fromStackToTargetPoint + points.x;
        const targetPointY = Math.sin(angle + sideAngle) * fromStackToTargetPoint + points.y;


        const innerColumnNumStr = String(formValues?.numInnerColumn);
        const outerColumnNumStr = String(formValues?.numOuterColumn);

        const outerColumnNum = outerColumnNumStr.length === 1 ? `0${outerColumnNumStr}` : outerColumnNumStr;
        const innerColumnNum = innerColumnNumStr.length === 1 ? `0${innerColumnNumStr}` : innerColumnNumStr;

        const targetColumnName = isInnerColumn ? innerColumnNum : outerColumnNum;


        const zoneName = zoneType === 1 ? formValues?.alleySymbol ?? "A" : "GT";
        const rowName = namingOrder === 1 ? String(newPoints.length - index) : String(index + 1);
        const targetRowName = rowName.length === 1 ? `0${rowName}` : rowName;


        const cellName = zoneType === 1 ? lastStreamNum : lastFlowNum;

        const innerCellName = formValues?.numInnerAlley ? formValues?.numInnerAlley : cellName;
        const outerCellName = formValues?.numOuterAlley ? formValues?.numOuterAlley : cellName;

        const targetCellName = isInnerColumn ? innerCellName : outerCellName;


        mooeDoc?.mLaneMarks.push(
            targetPoint(
                pointIdsBuffer[index],
                targetPointX,
                targetPointY,
                angle + (isInnerColumn ? -Math.PI / 2 : Math.PI / 2),
                targetCellName,
                targetColumnName,
                targetRowName,
                "检",
                0,
                zoneName
            )
        );
    });

}