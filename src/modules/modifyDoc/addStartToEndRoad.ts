import { GeneratorStor } from "@/entities";
import { road } from "@/helpers/points/road";
import { Coords, MooeDoc } from "@/types";

export const addStartToEndRoad = (mooeDoc: MooeDoc, startPoints: Coords[], endPoints: Coords[], lastPointId: number) => {

    const {
        store: { formValues },
    } = GeneratorStor;

    for (let i = 0; i < startPoints.length; i++) {

        const startId = lastPointId + i - (startPoints.length * 2);
        const endId = lastPointId + i - startPoints.length;

        mooeDoc?.mRoads.push(
            road(startId, endId, startPoints[i], endPoints[i], lastPointId + i, formValues?.angle ?? 0, 1)
        );
    }

}