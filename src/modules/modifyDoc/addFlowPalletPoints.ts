import { palletDist } from "@/constants";
import { getAtan2 } from "@/helpers/math";
import { pallet } from "@/helpers/points/pallet";
import { Coords, MooeDoc } from "@/types";

export const addFlowPalletPoints = (mooeDoc: MooeDoc, newPoints: Coords[], lastId: number,
    sideAngle: number, lastNum: number, isInnerColumn?: boolean) => {

    const angle = getAtan2(newPoints[0].x, newPoints[0].y, newPoints[newPoints.length - 1].x, newPoints[newPoints.length - 1].y);

    palletDist.reduce((accum: number, dist: number) => {

        newPoints.map((coords: Coords, index: number) => {

            const pointX = Math.cos(angle + sideAngle) * dist + coords.x;
            const pointY = Math.sin(angle + sideAngle) * dist + coords.y;

            mooeDoc?.mLaneMarks.push(pallet(
                lastNum,
                lastId + accum,
                1,
                pointX,
                pointY,
                angle + (isInnerColumn ? Math.PI / 2 : -Math.PI / 2),
                index + newPoints.length + accum,
                "GT"
            ));

            accum++;
        });

        return accum;
    }, 0);

}