import { distCenterToTargetPoint, roadsDist } from "@/constants";
import { getAtan2 } from "@/helpers/math";
import { Coords, MooeDoc } from "@/types";
import { targetPoint } from "@/helpers/points/targetPoint";
import { GeneratorStor } from "@/entities";
import { getPointIdsBuffer } from "./getPointIdsBuffer";

export const addFlowTargetPoints = (mooeDoc: MooeDoc, newPoints: Coords[], sideAngle: number, innerFlow?: boolean) => {

    const {
        store: { lastFlowNum, namingOrder, dirRoad },
    } = GeneratorStor;

    const angle = getAtan2(newPoints[0].x, newPoints[0].y, newPoints[newPoints.length - 1].x, newPoints[newPoints.length - 1].y);

    const pointIdsBuffer = getPointIdsBuffer(mooeDoc);

    const pointDir = dirRoad === 1 ? sideAngle : sideAngle - Math.PI;
    const targetPointDir = innerFlow ? pointDir - Math.PI : pointDir;

    const pointAngle = dirRoad === 1 ? angle + Math.PI : angle;

    newPoints.map((points: Coords, index: number) => {

        const pointX = Math.cos(angle) * (distCenterToTargetPoint / 2 * targetPointDir) + points.x;
        const pointY = Math.sin(angle) * (distCenterToTargetPoint / 2 * targetPointDir) + points.y;

        const columnName = namingOrder === 1 ? String(newPoints.length - index) : String(index + 1);
        const targetColumnName = columnName.length === 1 ? `0${columnName}` : columnName;

        mooeDoc?.mLaneMarks.push(targetPoint(
            pointIdsBuffer[index],
            pointX,
            pointY,
            pointAngle,
            lastFlowNum,
            targetColumnName,
            String(roadsDist.length),
            "前置点",
            targetPointDir,
            "GT"
        ));
    });

}