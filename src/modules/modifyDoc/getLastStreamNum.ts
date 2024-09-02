import { MooeDoc } from "@/types";

export const getLastStreamNum = (mooeDoc: MooeDoc) => {
    const streamNum = mooeDoc?.mLaneMarks.reduce((accum: number, point: any) => {
        if (!isNaN(Number(point.mLaneMarkName.slice(1, 2)))) {
            const tail = point.mLaneMarkName.slice(1);
            const numberWithString = tail.split("col")[0];
            const num = Number(numberWithString.replace("entrance", ""));

            num > accum && (accum = num);
        }

        return accum;
    }, 0);

    return streamNum ?? 0;
}