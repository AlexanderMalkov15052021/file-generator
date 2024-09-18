import { MooeDoc } from "@/types";

export const getPointIdsBuffer = (mooeDoc: MooeDoc) => {

    const bufferIds = Array.from({ length: 100000 }, (_, index) => index + 600000);

    const mLaneMarkIds = mooeDoc?.mLaneMarks.map((obj: { mLaneMarkID: number }) => obj.mLaneMarkID);

    const pointIdsBuffer = bufferIds.filter((id: number) => !mLaneMarkIds?.includes(id));

    return pointIdsBuffer;
}