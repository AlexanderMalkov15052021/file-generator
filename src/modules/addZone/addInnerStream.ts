import { MooeDoc } from "@/types";
import { getFirstRowPoints } from "../modifyDoc/getFirstRowPoints";
import { addPallets } from "../modifyDoc/addPallets";
import { addStartRoadPoints } from "../modifyDoc/addStartRoadPoints";
import { addEndRoadPoints } from "../modifyDoc/addEndRoadPoints";
import { addStartToEndRoad } from "../modifyDoc/addStartToEndRoad";
import { addRowRoads } from "../modifyDoc/addRowRoads";
import { addEntranceRoad } from "../modifyDoc/addEntranceRoad";
import { addRowTargetPoints } from "../modifyDoc/addRowTargetPoints";
import { addTargetPoints } from "../modifyDoc/addTargetPoints";
import { addCachePoints } from "../modifyDoc/addCachePoints";

export const addInnerStream = (mooeDoc: MooeDoc, isInnerColumn?: boolean) => {

    const firstRowPoints = getFirstRowPoints(isInnerColumn);

    const palletsNames = addPallets(mooeDoc, firstRowPoints, true);

    const startRoadPoints = addStartRoadPoints(palletsNames, mooeDoc, firstRowPoints, Math.PI / 2);

    const endRoadPoints = addEndRoadPoints(palletsNames, mooeDoc, firstRowPoints, Math.PI * 3 / 2);

    addStartToEndRoad(mooeDoc, startRoadPoints, endRoadPoints);

    addRowRoads(mooeDoc, endRoadPoints, isInnerColumn);

    addEntranceRoad(
        mooeDoc, endRoadPoints, firstRowPoints, Math.PI * 3 / 2, firstRowPoints.length - 1,
        firstRowPoints.length - 1, Math.PI, isInnerColumn
    );

    addRowTargetPoints(mooeDoc, firstRowPoints, Math.PI * 3 / 2, -1, Math.PI / 2, isInnerColumn);

    addTargetPoints(mooeDoc, firstRowPoints, Math.PI * 3 / 2, true);

    addCachePoints(mooeDoc, firstRowPoints, Math.PI * 3 / 2, true);

    return mooeDoc;
}