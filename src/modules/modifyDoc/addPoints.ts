import { GeneratorStor } from "@/entities";
import { getAtan2 } from "@/helpers/math";
import { pallet } from "@/helpers/points/pallet";
import { Coords, MooeDoc } from "@/types";

export const addPoints = (mooeDoc: MooeDoc, newPoints: Coords[], lastId: number, lastNum: number, isInnerColumn?: boolean) => {

    const {
        store: { formValues },
    } = GeneratorStor;

    const angle = getAtan2(Number(formValues?.x1), Number(formValues?.y1), Number(formValues?.x2), Number(formValues?.y2));

    newPoints.map((coords: Coords, index: number) => {

        mooeDoc?.mLaneMarks.push(
            pallet(lastNum, lastId, 1, coords.x, coords.y, angle + (isInnerColumn ? -Math.PI / 2 : Math.PI / 2), index)
        );

    });

    return mooeDoc;
}