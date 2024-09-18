import { MooeDoc } from "@/types";

export const getRoadIdsBuffer = (mooeDoc: MooeDoc) => {

    const bufferIds = Array.from({ length: 100000 }, (_, index) => index + 800000);

    const mRoadIds = mooeDoc?.mRoads.map((obj: { mRoadID: number }) => obj.mRoadID);

    const roadIdsBuffer = bufferIds.filter((id: number) => !mRoadIds?.includes(id));

    return roadIdsBuffer;
}