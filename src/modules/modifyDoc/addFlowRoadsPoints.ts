import { roadsDist, fromStackToEnd } from "@/constants";
import { getAtan2 } from "@/helpers/math";
import { roadPoint } from "@/helpers/points/roadPoint";
import { Coords, MooeDoc } from "@/types";
import { getPointIdsBuffer } from "./getPointIdsBuffer";

export const addFlowRoadsPoints = (palletsNames: string[][], mooeDoc: MooeDoc, newPoints: Coords[], sideAngle: number) => {

    const pointIdsBuffer = getPointIdsBuffer(mooeDoc);

    const roadPoints = roadsDist.map((dist: number, distIndex: number) => {

        if (distIndex < roadsDist.length - 1) {
            return newPoints.map((coords: Coords, index: number) => {

                const angle = getAtan2(newPoints[0].x, newPoints[0].y, newPoints[newPoints.length - 1].x, newPoints[newPoints.length - 1].y);

                const pointX = Math.cos(angle + sideAngle) * (dist - fromStackToEnd) + coords.x;
                const pointY = Math.sin(angle + sideAngle) * (dist - fromStackToEnd) + coords.y;

                const nameParts = palletsNames[distIndex][index].split("row");
                const name = nameParts[1].length === 1 ? `${nameParts[0]}row200${nameParts[1]}` : `${nameParts[0]}row20${nameParts[1]}`;

                mooeDoc?.mLaneMarks.push(
                    roadPoint(name, pointIdsBuffer[index + newPoints.length * distIndex], pointX, pointY, 0)
                );

                return { x: pointX, y: pointY, id: pointIdsBuffer[index + newPoints.length * distIndex] }
            });
        }

        return newPoints.map((coords: Coords, index: number) => {

            const angle = getAtan2(newPoints[0].x, newPoints[0].y, newPoints[newPoints.length - 1].x, newPoints[newPoints.length - 1].y);

            const pointX = Math.cos(angle + sideAngle) * (dist - fromStackToEnd) + coords.x;
            const pointY = Math.sin(angle + sideAngle) * (dist - fromStackToEnd) + coords.y;

            const nameParts = palletsNames[distIndex - 1][index].split("row");
            const name = `${nameParts[0]}row1000`;

            mooeDoc?.mLaneMarks.push(
                roadPoint(name, pointIdsBuffer[index + newPoints.length * distIndex], pointX, pointY, 0)
            );

            return { x: pointX, y: pointY, id: pointIdsBuffer[index + newPoints.length * distIndex] }
        });
    });

    return roadPoints;

}