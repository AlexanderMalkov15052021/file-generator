import { fromStackToCachePoint } from "@/constants";
import { getAtan2 } from "@/helpers/math";
import { Coords, MooeDoc } from "@/types";
import { cachePoint } from "@/helpers/points/cachePoint";
import { GeneratorStor } from "@/entities";

export const addCachePoints = (
    mooeDoc: MooeDoc, newPoints: Coords[], lastPointId: number, lastNum: number, sideAngle: number, isInnerColumn?: boolean
) => {

    const {
        store: { formValues, zoneType },
    } = GeneratorStor;

    const angle = getAtan2(newPoints[0].x, newPoints[0].y, newPoints[newPoints.length - 1].x, newPoints[newPoints.length - 1].y);

    newPoints.map((points: Coords, index: number) => {

        const targetPointX = Math.cos(angle + sideAngle) * fromStackToCachePoint + points.x;
        const targetPointY = Math.sin(angle + sideAngle) * fromStackToCachePoint + points.y;

        mooeDoc?.mLaneMarks.push(
            cachePoint(
                lastPointId + index, targetPointX, targetPointY, angle + (isInnerColumn ? -Math.PI / 2 : Math.PI / 2),
                lastNum, isInnerColumn ? 2 : 1, newPoints.length - index, "识别", zoneType === 1 ? formValues?.alleySymbol ?? "A" : "GT"
            ));
    });

}