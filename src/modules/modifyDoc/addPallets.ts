import { GeneratorStor } from "@/entities";
import { getAtan2 } from "@/helpers/math";
import { pallet } from "@/helpers/points/pallet";
import { Coords, MooeDoc } from "@/types";
import { getPointIdsBuffer } from "./getPointIdsBuffer";

export const addPallets = (mooeDoc: MooeDoc, newPoints: Coords[], isInnerColumn?: boolean) => {

    const {
        store: { formValues, zoneType, lastStreamNum, lastFlowNum, namingOrder },
    } = GeneratorStor;

    const pointIdsBuffer = getPointIdsBuffer(mooeDoc);

    const angle = getAtan2(Number(formValues?.x1), Number(formValues?.y1), Number(formValues?.x2), Number(formValues?.y2));

    const palletsNames = newPoints.map((coords: Coords, index: number) => {


        const innerColumnNumStr = String(formValues?.numInnerColumn);
        const outerColumnNumStr = String(formValues?.numOuterColumn);

        const outerColumnNum = outerColumnNumStr.length === 1 ? `0${outerColumnNumStr}` : outerColumnNumStr;
        const innerColumnNum = innerColumnNumStr.length === 1 ? `0${innerColumnNumStr}` : innerColumnNumStr;

        const targetColumnName = isInnerColumn ? innerColumnNum : outerColumnNum;


        const zoneName = zoneType === 1 ? formValues?.alleySymbol ?? "A" : "GT";
        const rowName = namingOrder === 1 ? String(newPoints.length - index) : String(index + 1);
        const targetRowName = rowName.length === 1 ? `0${rowName}` : rowName;


        const cellName = zoneType === 1 ? lastStreamNum : lastFlowNum;

        const innerCellName = formValues?.numInnerAlley ? formValues?.numInnerAlley : cellName;
        const outerCellName = formValues?.numOuterAlley ? formValues?.numOuterAlley : cellName;

        const targetCellName = isInnerColumn ? innerCellName : outerCellName;


        mooeDoc?.mLaneMarks.push(
            pallet(
                targetCellName,
                pointIdsBuffer[index],
                targetColumnName,
                targetRowName,
                coords.x,
                coords.y,
                angle + (isInnerColumn ? -Math.PI / 2 : Math.PI / 2),
                zoneName
            ));

        const name = `${zoneName}${targetCellName}col${targetColumnName}row${targetRowName}`

        return name;

    });

    return palletsNames;
}