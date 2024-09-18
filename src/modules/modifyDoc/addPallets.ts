import { GeneratorStor } from "@/entities";
import { getAtan2 } from "@/helpers/math";
import { pallet } from "@/helpers/points/pallet";
import { Coords, MooeDoc } from "@/types";
import { getPointIdsBuffer } from "./getPointIdsBuffer";

export const addPallets = (mooeDoc: MooeDoc, newPoints: Coords[], isInnerColumn?: boolean) => {

    const {
        store: { formValues, zoneType, lastStreamNum, rowOrder },
    } = GeneratorStor;

    const pointIdsBuffer = getPointIdsBuffer(mooeDoc);

    const angle = getAtan2(Number(formValues?.x1), Number(formValues?.y1), Number(formValues?.x2), Number(formValues?.y2));

    const palletsNames = newPoints.map((coords: Coords, index: number) => {

        const columnNum = String(formValues?.columnNum).length === 1 ? `0${formValues?.columnNum}` : String(formValues?.columnNum);
        const columnName = isInnerColumn ? "02" : "01";
        const targetColumnName = formValues?.columnNum ? columnNum : columnName;

        const zoneName = zoneType === 1 ? formValues?.alleySymbol ?? "A" : "GT";
        const rowName = rowOrder === 1 ? String(newPoints.length - index) : String(index + 1);
        const targetRowName = rowName.length === 1 ? `0${rowName}` : rowName;

        mooeDoc?.mLaneMarks.push(
            pallet(
                lastStreamNum,
                pointIdsBuffer[index],
                targetColumnName,
                targetRowName,
                coords.x,
                coords.y,
                angle + (isInnerColumn ? -Math.PI / 2 : Math.PI / 2),
                zoneName
            ));

        const name = `${zoneName}${lastStreamNum}col${targetColumnName}row${targetRowName}`

        return name;

    });

    return palletsNames;
}