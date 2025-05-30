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

export const addOuterStream = (mooeDoc: MooeDoc) => {

    const firstRowPoints = getFirstRowPoints();

    const palletsNames = addPallets(mooeDoc, firstRowPoints);

    const startRoadPoints = addStartRoadPoints(palletsNames, mooeDoc, firstRowPoints, Math.PI * 3 / 2);

    const endRoadPoints = addEndRoadPoints(palletsNames, mooeDoc, firstRowPoints, Math.PI / 2);

    addStartToEndRoad(mooeDoc, startRoadPoints, endRoadPoints);

    addRowRoads(mooeDoc, endRoadPoints);

    addEntranceRoad(
        mooeDoc, endRoadPoints, firstRowPoints, Math.PI / 2, firstRowPoints.length - 1,
        firstRowPoints.length - 1, 0
    );

    addRowTargetPoints(mooeDoc, firstRowPoints, Math.PI / 2, 1, 0, palletsNames);

    addTargetPoints(mooeDoc, firstRowPoints, Math.PI / 2, palletsNames);

    addCachePoints(mooeDoc, firstRowPoints, Math.PI / 2);

    return mooeDoc;
}