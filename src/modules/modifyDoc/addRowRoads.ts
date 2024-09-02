import { GeneratorStor } from "@/entities";
import { road } from "@/helpers/points/road";
import { Coords, MooeDoc } from "@/types";

export const addRowRoads = (mooeDoc: MooeDoc, endPoints: Coords[], lastPointId: number) => {

    const {
        store: { formValues },
    } = GeneratorStor;

    for (let i = 1; i < endPoints.length; i++) {

        const startId = endPoints[i - 1].id;
        const endId = endPoints[i].id;

        mooeDoc?.mRoads.push(
            road(startId, endId, endPoints[i - 1], endPoints[i], lastPointId + i + endPoints.length, formValues?.angle ?? 0, 1)
        );
    }

}