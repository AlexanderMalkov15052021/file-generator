import { GeneratorStor } from "@/entities";
import { getAtan2 } from "@/helpers/math";
import { pallet } from "@/helpers/points/pallet";
import { Coords, MooeDoc } from "@/types";
import { getPointIdsBuffer } from "./getPointIdsBuffer";

export const addPallets = (mooeDoc: MooeDoc, newPoints: Coords[], isInnerColumn?: boolean) => {

    const {
        store: { formValues, zoneType, lastStreamNum },
    } = GeneratorStor;

    const pointIdsBuffer = getPointIdsBuffer(mooeDoc);

    const angle = getAtan2(Number(formValues?.x1), Number(formValues?.y1), Number(formValues?.x2), Number(formValues?.y2));

    const palletsNames = newPoints.map((coords: Coords, index: number) => {

        const zoneName = zoneType === 1 ? formValues?.alleySymbol ?? "A" : "GT";
        const columnName = isInnerColumn ? "02" : "01";
        const rowName = String(newPoints.length - index);
        const targetRowName = rowName.length === 1 ? `0${rowName}` : rowName;

        mooeDoc?.mLaneMarks.push(
            pallet(
                lastStreamNum,
                pointIdsBuffer[index],
                columnName,
                targetRowName,
                coords.x,
                coords.y,
                angle + (isInnerColumn ? -Math.PI / 2 : Math.PI / 2),
                zoneType === 1 ? formValues?.alleySymbol ?? "A" : "GT"
            ));

        const name = `${zoneName}${lastStreamNum}col${columnName}row${targetRowName}`

        return name;

    });

    return palletsNames;
}