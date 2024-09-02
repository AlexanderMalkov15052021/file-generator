import { MooeDoc } from "@/types";

export const getLastPointId = (mooeDoc: MooeDoc) => {

    const lastPointId = mooeDoc?.mLaneMarks.reduce((accum: number, point: any) => {

        point.mLaneMarkID > accum && (accum = point.mLaneMarkID);

        return accum;
    }, 0);

    return lastPointId ?? 0;
}