import { distSmallRoad, fromStackToCachePoint, fromStackToEnd } from "@/constants";
import { getAtan2 } from "@/helpers/math";
import { Coords, MooeDoc } from "@/types";
import { targetPoint } from "@/helpers/points/targetPoint";
import { GeneratorStor } from "@/entities";
import { getPointIdsBuffer } from "./getPointIdsBuffer";

export const addRowTargetPoints = (
    mooeDoc: MooeDoc, newPoints: Coords[], sideAngle: number,
    dirPoint: number, dirRot: number, isInnerColumn?: boolean
) => {

    const {
        store: { formValues, zoneType, lastStreamNum, dirRoad, namingOrder },
    } = GeneratorStor;

    const pointIdsBuffer = getPointIdsBuffer(mooeDoc);

    const angle = getAtan2(newPoints[0].x, newPoints[0].y, newPoints[newPoints.length - 1].x, newPoints[newPoints.length - 1].y);

    newPoints.map((points: Coords, index: number) => {

        const targetPointX = Math.cos(angle + sideAngle) * (distSmallRoad - fromStackToEnd) + points.x;
        const targetPointY = Math.sin(angle + sideAngle) * (distSmallRoad - fromStackToEnd) + points.y;

        const pointX = Math.cos(angle) * ((fromStackToCachePoint * (dirRoad === 1 ? 1 : -1)) / 2 * dirPoint) + targetPointX;
        const pointY = Math.sin(angle) * ((fromStackToCachePoint * (dirRoad === 1 ? 1 : -1)) / 2 * dirPoint) + targetPointY;

        const columnNum = String(formValues?.columnNum).length === 1 ? `0${formValues?.columnNum}` : String(formValues?.columnNum);
        const columnName = isInnerColumn ? "01" : "02";
        const targetColumnName = formValues?.columnNum ? columnNum : columnName;

        const zoneName = zoneType === 1 ? formValues?.alleySymbol ?? "A" : "GT";
        const rowName = namingOrder === 1 ? String(newPoints.length - index) : String(index + 1);
        const targetRowName = rowName.length === 1 ? `0${rowName}` : rowName;

        mooeDoc?.mLaneMarks.push(
            targetPoint(
                pointIdsBuffer[index],
                pointX,
                pointY,
                angle + (dirRoad === 1 ? 0 : Math.PI),
                lastStreamNum,
                targetColumnName,
                targetRowName,
                "前置点",
                dirRot,
                zoneName
            )
        );
    });

}