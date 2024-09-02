import { MooeDoc } from "@/types";

export const getLastFlowNum = (MooeDoc: MooeDoc) => {

    const flowNum = MooeDoc?.mLaneMarks.reduce((accum: number, point: any) => {

        if (point.mLaneMarkName.slice(0, 2) === "GT") {
            const tail = point.mLaneMarkName.slice(2);
            const numberWithString = tail.split("col")[0];
            const num = Number(numberWithString.replace("entrance", ""));

            num > accum && (accum = num);
        }

        return accum;
    }, 0);

    return flowNum ?? 0;
}