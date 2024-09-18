import { roadsDist } from "@/constants";
import { GeneratorStor } from "@/entities";
import { getAtan2 } from "@/helpers/math";
import { roadPoint } from "@/helpers/points/roadPoint";
import { Coords, MooeDoc } from "@/types";

export const addFlowRoadsPoints = (mooeDoc: MooeDoc, newPoints: Coords[], lastId: number, sideAngle: number) => {

    const {
        store: { formValues },
    } = GeneratorStor;

    const startRoadPoints = roadsDist.map((dist: number, distIndex: number) => {

        return newPoints.map((coords: Coords, index: number) => {

            const angle = getAtan2(newPoints[0].x, newPoints[0].y, newPoints[newPoints.length - 1].x, newPoints[newPoints.length - 1].y);

            const pointX = Math.cos(angle + sideAngle) * dist + coords.x;
            const pointY = Math.sin(angle + sideAngle) * dist + coords.y;

            mooeDoc?.mLaneMarks.push(roadPoint("", lastId + (index + (distIndex * roadsDist.length)), pointX, pointY, formValues?.angle ?? 0));

            return { x: pointX, y: pointY, id: lastId + (index + (distIndex * roadsDist.length)) }
        });

    });

    return startRoadPoints;

}