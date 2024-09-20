import { MooeDoc } from "@/types";
import { getFirstRowPoints } from "../modifyDoc/getFirstRowPoints";
import { addFlowRoadsPoints } from "../modifyDoc/addFlowRoadsPoints";
import { addRowRoadsFlow } from "../modifyDoc/addRowRoadsFlow";
import { addRowRoads } from "../modifyDoc/addRowRoads";
import { addFlowPalletPoints } from "../modifyDoc/addFlowPalletPoints";
import { addFlowCachePoints } from "../modifyDoc/addFlowCachePoints";
import { addFlowTargetPoints } from "../modifyDoc/addFlowTargetPoints";
import { addEntranceRoadFlow } from "../modifyDoc/addEntranceRoadFlow";
import { addPrePoint } from "../modifyDoc/addPrePoint";
import { addPrePointRoad } from "../modifyDoc/addPrePointRoad";

export const addOuterFlow = (mooeDoc: MooeDoc, innerFlow?: boolean) => {

    const outerSide = innerFlow ? Math.PI * 3 / 2 : Math.PI / 2;

    const firstRowPoints = getFirstRowPoints();

    const palletsNames = addFlowPalletPoints(mooeDoc, firstRowPoints, outerSide);

    const flowRoadsPoints = addFlowRoadsPoints(palletsNames, mooeDoc, firstRowPoints, outerSide);

    addRowRoadsFlow(mooeDoc, flowRoadsPoints);

    addRowRoads(mooeDoc, flowRoadsPoints[flowRoadsPoints.length - 1]);

    addFlowCachePoints(mooeDoc, firstRowPoints, outerSide);

    addFlowTargetPoints(mooeDoc, flowRoadsPoints[flowRoadsPoints.length - 1], outerSide, innerFlow);

    addEntranceRoadFlow(mooeDoc, flowRoadsPoints[flowRoadsPoints.length - 1], firstRowPoints);

    addPrePoint(mooeDoc, firstRowPoints, outerSide, innerFlow);

    addPrePointRoad(mooeDoc, flowRoadsPoints[flowRoadsPoints.length - 1], firstRowPoints)

    return mooeDoc;
}