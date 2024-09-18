import { distSmallRoad, fromStackToEnd } from "@/constants";
import { GeneratorStor } from "@/entities";
import { getAtan2 } from "@/helpers/math";
import { roadPoint } from "@/helpers/points/roadPoint";
import { Coords, MooeDoc } from "@/types";
import { getPointIdsBuffer } from "./getPointIdsBuffer";

export const addEndRoadPoints = (palletsNames: string[], mooeDoc: MooeDoc, newPoints: Coords[], sideAngle: number) => {

    const {
        store: { formValues },
    } = GeneratorStor;

    const pointIdsBuffer = getPointIdsBuffer(mooeDoc);

    const endRoadPoints = newPoints.map((coords: Coords, index: number) => {

        const angle = getAtan2(newPoints[0].x, newPoints[0].y, newPoints[newPoints.length - 1].x, newPoints[newPoints.length - 1].y);

        const pointX = Math.cos(angle + sideAngle) * (distSmallRoad - fromStackToEnd) + coords.x;
        const pointY = Math.sin(angle + sideAngle) * (distSmallRoad - fromStackToEnd) + coords.y;

        const nameParts = palletsNames[index].split("row");
        const name = nameParts[1].length === 1 ? `${nameParts[0]}row100${nameParts[1]}` : `${nameParts[0]}row10${nameParts[1]}`;

        mooeDoc?.mLaneMarks.push(roadPoint(name, pointIdsBuffer[index], pointX, pointY, formValues?.angle ?? 0));

        return { x: pointX, y: pointY, id: pointIdsBuffer[index] }

    });

    return endRoadPoints;

}