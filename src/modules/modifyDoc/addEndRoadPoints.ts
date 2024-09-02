import { distSmallRoad, fromStackToEnd } from "@/constants";
import { GeneratorStor } from "@/entities";
import { getAtan2 } from "@/helpers/math";
import { roadPoint } from "@/helpers/points/roadPoint";
import { Coords, MooeDoc } from "@/types";

export const addEndRoadPoints = (mooeDoc: MooeDoc, newPoints: Coords[], lastId: number, sideAngle: number) => {

    const {
        store: { formValues },
    } = GeneratorStor;

    const endRoadPoints = newPoints.map((coords: Coords, index: number) => {

        const angle = getAtan2(newPoints[0].x, newPoints[0].y, newPoints[newPoints.length - 1].x, newPoints[newPoints.length - 1].y);

        const pointX = Math.cos(angle + sideAngle) * (distSmallRoad - fromStackToEnd) + coords.x;
        const pointY = Math.sin(angle + sideAngle) * (distSmallRoad - fromStackToEnd) + coords.y;

        mooeDoc?.mLaneMarks.push(roadPoint(lastId + index, pointX, pointY, formValues?.angle ?? 0));

        return { x: pointX, y: pointY, id: lastId + index }

    });

    return endRoadPoints;

}