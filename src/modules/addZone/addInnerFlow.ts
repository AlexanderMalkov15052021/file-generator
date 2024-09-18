import { MooeDoc } from "@/types";
import { getLastFlowNum } from "../modifyDoc/getLastFlowNum";
import { getLastPointId } from "../modifyDoc/getLastPointId";
import { getFirstRowPoints } from "../modifyDoc/getFirstRowPoints";
import { addPoints } from "../modifyDoc/addPoints";
import { addFlowRoadsPoints } from "../modifyDoc/addFlowRoadsPoints";
import { addRowRoadsFlow } from "../modifyDoc/addRowRoadsFlow";
import { roadsDist } from "@/constants";
import { addRowRoads } from "../modifyDoc/addRowRoads";
import { addFlowPalletPoints } from "../modifyDoc/addFlowPalletPoints";
import { addFlowCachePoints } from "../modifyDoc/addFlowCachePoints";
import { addFlowTargetPoints } from "../modifyDoc/addFlowTargetPoints";
import { addEntranceRoadFlow } from "../modifyDoc/addEntranceRoadFlow";

export const addInnerFlow = (mooeDoc: MooeDoc) => {

    const lastFlowNum = getLastFlowNum(mooeDoc);

    const lastPointId = getLastPointId(mooeDoc);

    const firstRowPoints = getFirstRowPoints();

    addPoints(mooeDoc, firstRowPoints, lastPointId + 1);

    const flowRoadsPoints = addFlowRoadsPoints(mooeDoc, firstRowPoints, lastPointId + 1 + firstRowPoints.length, Math.PI * 3 / 2);

    const additionalIndexes = roadsDist.length * firstRowPoints.length

    addRowRoadsFlow(mooeDoc, flowRoadsPoints, lastPointId + 1 + (firstRowPoints.length * 2) + additionalIndexes);

    addRowRoads(
        mooeDoc, flowRoadsPoints[flowRoadsPoints.length - 1], lastPointId + 1 + (firstRowPoints.length * 2) + additionalIndexes * 2
    );

    addFlowPalletPoints(
        mooeDoc,
        firstRowPoints,
        lastPointId + 1 + firstRowPoints.length + (firstRowPoints.length * 2) + additionalIndexes * 3,
        Math.PI * 3 / 2,
        lastFlowNum + 1
    );

    addFlowCachePoints(
        mooeDoc, firstRowPoints,
        lastPointId + 1 + firstRowPoints.length + (firstRowPoints.length * 2) + additionalIndexes * 9,
        Math.PI * 3 / 2, lastFlowNum + 1
    );

    addFlowTargetPoints(
        mooeDoc,
        flowRoadsPoints[flowRoadsPoints.length - 1],
        lastPointId + 1 + firstRowPoints.length + (firstRowPoints.length * 2) + additionalIndexes * 12,
        lastFlowNum + 1,
        Math.PI / 2,
        0
    );

    addEntranceRoadFlow(
        mooeDoc,
        flowRoadsPoints[flowRoadsPoints.length - 1],
        firstRowPoints,
        lastPointId + 1 + firstRowPoints.length + (firstRowPoints.length * 2) + additionalIndexes * 14,
        Math.PI
    );

    return mooeDoc;
}