import { GeneratorStor } from "@/entities";
import { pallet } from "@/helpers/points/pallet";
import { Coords, MooeDoc } from "@/types";

export const addPoints = (mooeDoc: MooeDoc, newPoints: Coords[], lastId: number, lastNum: number) => {

    const {
        store: { formValues },
    } = GeneratorStor;

    newPoints.map((coords: Coords, index: number) => {

        mooeDoc?.mLaneMarks.push(pallet(lastNum, lastId, 1, coords.x, coords.y, formValues?.angle ?? 0, index));

    });

    return mooeDoc;
}