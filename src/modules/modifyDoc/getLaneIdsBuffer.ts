import { firstLaneId, valuesRange } from "@/constants";
import { MooeDoc } from "@/types";

export const getLaneIdsBuffer = (mooeDoc: MooeDoc) => {

    const bufferIds = Array.from({ length: valuesRange }, (_, index) => index + firstLaneId);

    const mRoadIds = mooeDoc?.mRoads.map((obj: { mRoadID: number }) => obj.mRoadID);
    const mLaneIds = mooeDoc?.mRoads.map((obj: { mRoadID: number, mLanes: { mLaneID: number }[] }) => obj.mLanes[0].mLaneID);
    const mLaneMarksIds = mooeDoc?.mLaneMarks.map((obj: { mLaneMarkID: number }) => obj.mLaneMarkID);

    const laneIdsBuffer = bufferIds.filter((id: number) => !mLaneIds?.includes(id))
        .filter((id: number) => !mLaneMarksIds?.includes(id))
        .filter((id: number) => !mRoadIds?.includes(id));

    return laneIdsBuffer;
}