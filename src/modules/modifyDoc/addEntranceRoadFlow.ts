import { fromStackToCachePoint } from "@/constants";
import { GeneratorStor } from "@/entities";
import { getAtan2 } from "@/helpers/math";
import { road } from "@/helpers/points/road";
import { roadPoint } from "@/helpers/points/roadPoint";
import { Coords, MooeDoc } from "@/types";

export const addEntranceRoadFlow = (
    mooeDoc: MooeDoc, endPoints: Coords[], newPoints: Coords[], lastPointId: number, dirEndPoint: number
) => {

    const {
        store: { formValues },
    } = GeneratorStor;

    const angle = getAtan2(newPoints[0].x, newPoints[0].y, newPoints[newPoints.length - 1].x, newPoints[newPoints.length - 1].y);

    const pointX = endPoints[0].x;
    const pointY = endPoints[0].y;

    const newPointX = Math.cos(angle + dirEndPoint) * fromStackToCachePoint + pointX;
    const newPointY = Math.sin(angle + dirEndPoint) * fromStackToCachePoint + pointY;

    mooeDoc?.mLaneMarks.push(roadPoint("", lastPointId, newPointX, newPointY, angle));

    const endId = endPoints[0].id;

    mooeDoc?.mRoads.push(
        road(
            lastPointId,
            endId,
            { x: newPointX, y: newPointY, id: lastPointId },
            endPoints[0],
            300,
            300,
            formValues?.angle ?? 0,
            2
        )
    );

}