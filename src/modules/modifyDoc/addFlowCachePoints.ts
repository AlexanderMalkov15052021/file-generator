import { cachePointDist } from "@/constants";
import { getAtan2 } from "@/helpers/math";
import { cachePoint } from "@/helpers/points/cachePoint";
import { Coords, MooeDoc } from "@/types";

export const addFlowCachePoints = (mooeDoc: MooeDoc, newPoints: Coords[], lastId: number,
    sideAngle: number, lastNum: number, isInnerColumn?: boolean) => {

    const angle = getAtan2(newPoints[0].x, newPoints[0].y, newPoints[newPoints.length - 1].x, newPoints[newPoints.length - 1].y);

    cachePointDist.reduce((accum: number, dist: number, distIndex: number) => {

        newPoints.map((coords: Coords, index: number) => {

            const pointX = Math.cos(angle + sideAngle) * dist + coords.x;
            const pointY = Math.sin(angle + sideAngle) * dist + coords.y;

            mooeDoc?.mLaneMarks.push(cachePoint(
                lastId + accum,
                pointX,
                pointY,
                angle + (isInnerColumn ? Math.PI / 2 : -Math.PI / 2),
                lastNum,
                String(index + 1),
                String(distIndex + 2),
                "C",
                "GT"
            ));

            accum++;
        });

        return accum;

    }, 0);

}