import { GeneratorStor } from "@/entities";
import { road } from "@/helpers/points/road";
import { Coords, MooeDoc } from "@/types";

export const addRowRoadsFlow = (mooeDoc: MooeDoc, rowPoints: Coords[][], lastPointId: number) => {

    const {
        store: { formValues },
    } = GeneratorStor;

    for (let a = 1; a < rowPoints.length; a++) {
        for (let i = 0; i < rowPoints[a - 1].length; i++) {

            const startId = rowPoints[a - 1][i].id;
            const endId = rowPoints[a][i].id;

            mooeDoc?.mRoads.push(
                road(startId, endId, rowPoints[a - 1][i], rowPoints[a][i],
                    lastPointId + 1 + i + (rowPoints.length * a), 100, formValues?.angle ?? 0, 1
                )
            );
        }
    }

}