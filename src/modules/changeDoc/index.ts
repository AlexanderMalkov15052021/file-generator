import { MooeDoc } from "@/types";
import { GeneratorStor } from "@/entities";
import { addInnerStream } from "../addZone/addInnerStream";
import { addOuterStream } from "../addZone/addOuterStream";
import { addOuterFlow } from "../addZone/addOuterFlow";

export const modifyDoc = (mooeDoc: MooeDoc) => {

    const {
        store: { zoneType, numColumn, cellSide },
    } = GeneratorStor;

    const getTwoColumn = () => {
        const dock = addOuterStream(mooeDoc);
        return addInnerStream(dock, true);
    }

    const getDoc = () => {
        if (zoneType === 1 && numColumn === 1 && cellSide === 1 && mooeDoc) {
            return addOuterStream(mooeDoc);
        }

        if (zoneType === 1 && numColumn === 1 && cellSide === 2 && mooeDoc) {
            return addInnerStream(mooeDoc, true);
        }

        if (zoneType === 1 && numColumn === 2 && mooeDoc) {
            return getTwoColumn();
        }

        if (zoneType === 2 && mooeDoc && cellSide === 1) {
            return addOuterFlow(mooeDoc);
        }

        if (zoneType === 2 && mooeDoc && cellSide === 2) {
            return addOuterFlow(mooeDoc, true);
        }

        return addOuterStream(mooeDoc);

    }

    return getDoc();
}