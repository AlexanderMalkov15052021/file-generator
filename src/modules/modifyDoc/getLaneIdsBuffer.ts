import { MooeDoc } from "@/types";

export const getLaneIdsBuffer = (mooeDoc: MooeDoc) => {

    const bufferIds = Array.from({ length: 100000 }, (_, index) => index + 700000);

    const mLaneIds = mooeDoc?.mRoads.map(
        (obj: { mLanes: { mLaneID: number }[] }) => obj.mLanes.map((lane: { mLaneID: number }) => lane.mLaneID)
    ).flat();

    const laneIdsBuffer = bufferIds.filter((id: number) => !mLaneIds?.includes(id));

    return laneIdsBuffer;
}