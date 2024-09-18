import { MooeDoc } from "@/types";
import { getLastPointId } from "../modifyDoc/getLastPointId";
import { getFirstRowPoints } from "../modifyDoc/getFirstRowPoints";
import { addPoints } from "../modifyDoc/addPallets";
import { addStartRoadPoints } from "../modifyDoc/addStartRoadPoints";
import { addEndRoadPoints } from "../modifyDoc/addEndRoadPoints";
import { addStartToEndRoad } from "../modifyDoc/addStartToEndRoad";
import { addRowRoads } from "../modifyDoc/addRowRoads";
import { addEntranceRoad } from "../modifyDoc/addEntranceRoad";
import { addRowTargetPoints } from "../modifyDoc/addRowTargetPoints";
import { addTargetPoints } from "../modifyDoc/addTargetPoints";
import { addCachePoints } from "../modifyDoc/addCachePoints";

export const addInnerStream = (mooeDoc: MooeDoc, isInnerColumn?: boolean) => {

    const lastPointId = getLastPointId(mooeDoc) + 1;

    // const firstRowPoints = getFirstRowPoints(isInnerColumn);

    // addPoints(mooeDoc, firstRowPoints, lastPointId, true);

    // const startRoadPoints = addStartRoadPoints(mooeDoc, firstRowPoints, lastPointId + firstRowPoints.length, Math.PI / 2);

    // const endRoadPoints = addEndRoadPoints(mooeDoc, firstRowPoints, lastPointId + (firstRowPoints.length * 2), Math.PI * 3 / 2);

    // addStartToEndRoad(mooeDoc, startRoadPoints, endRoadPoints, lastPointId + (firstRowPoints.length * 3));

    // addRowRoads(mooeDoc, endRoadPoints, lastPointId + (firstRowPoints.length * 3), isInnerColumn);

    // addEntranceRoad(
    //     mooeDoc, endRoadPoints, firstRowPoints, lastPointId + (firstRowPoints.length * 4), Math.PI * 3 / 2,
    //     firstRowPoints.length - 1, firstRowPoints.length - 1, Math.PI, isInnerColumn
    // );

    // addRowTargetPoints(
    //     mooeDoc, firstRowPoints, lastPointId + (firstRowPoints.length * 5), Math.PI * 3 / 2, -1, Math.PI / 2, isInnerColumn
    // );

    // addTargetPoints(mooeDoc, firstRowPoints, lastPointId + (firstRowPoints.length * 6), Math.PI * 3 / 2, true);

    // addCachePoints(mooeDoc, firstRowPoints, lastPointId + (firstRowPoints.length * 7), Math.PI * 3 / 2, true);

    return mooeDoc;
}