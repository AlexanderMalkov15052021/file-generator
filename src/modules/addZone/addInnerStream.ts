import { MooeDoc } from "@/types";
import { getLastStreamNum } from "../modifyDoc/getLastStreamNum";
import { getLastPointId } from "../modifyDoc/getLastPointId";
import { getFirstRowPoints } from "../modifyDoc/getFirstRowPoints";
import { addPoints } from "../modifyDoc/addPoints";
import { addStartRoadPoints } from "../modifyDoc/addStartRoadPoints";
import { addEndRoadPoints } from "../modifyDoc/addEndRoadPoints";
import { addStartToEndRoad } from "../modifyDoc/addStartToEndRoad";
import { addRowRoads } from "../modifyDoc/addRowRoads";
import { addEntranceRoad } from "../modifyDoc/addEntranceRoad";
import { addRowTargetPoints } from "../modifyDoc/addRowTargetPoints";
import { addTargetPoints } from "../modifyDoc/addTargetPoints";
import { addCachePoints } from "../modifyDoc/addCachePoints";

export const addInnerStream = (mooeDoc: MooeDoc) => {

    const lastStreamNum = getLastStreamNum(mooeDoc);

    const lastPointId = getLastPointId(mooeDoc);

    const firstRowPoints = getFirstRowPoints();

    addPoints(mooeDoc, firstRowPoints, lastPointId + 1, lastStreamNum + 1);

    const startRoadPoints = addStartRoadPoints(mooeDoc, firstRowPoints, lastPointId + 1 + firstRowPoints.length, Math.PI / 2);

    const endRoadPoints = addEndRoadPoints(mooeDoc, firstRowPoints, lastPointId + 1 + (firstRowPoints.length * 2), Math.PI * 3 / 2);

    addStartToEndRoad(mooeDoc, startRoadPoints, endRoadPoints, lastPointId + 1 + (firstRowPoints.length * 3));

    addRowRoads(mooeDoc, endRoadPoints, lastPointId + 1 + (firstRowPoints.length * 3));

    addEntranceRoad(
        mooeDoc, endRoadPoints, firstRowPoints, lastPointId + 1 + (firstRowPoints.length * 4), Math.PI * 3 / 2, 0, 0, Math.PI
    );

    addRowTargetPoints(
        mooeDoc, firstRowPoints, lastPointId + 1 + (firstRowPoints.length * 5), lastStreamNum + 1, Math.PI * 3 / 2, -1, Math.PI / 2
    );

    addTargetPoints(mooeDoc, firstRowPoints, lastPointId + 1 + (firstRowPoints.length * 6), lastStreamNum + 1, Math.PI * 3 / 2);

    addCachePoints(mooeDoc, firstRowPoints, lastPointId + 1 + (firstRowPoints.length * 7), lastStreamNum + 1, Math.PI * 3 / 2);

    return mooeDoc;
}