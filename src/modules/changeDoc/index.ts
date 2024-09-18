import { MooeDoc } from "@/types";
import { GeneratorStor } from "@/entities";
import { addInnerStream } from "../addZone/addInnerStream";
import { addOuterStream } from "../addZone/addOuterStream";
import { addOuterFlow } from "../addZone/addOuterFlow";
import { addInnerFlow } from "../addZone/addInnerFlow";

export const modifyDoc = (mooeDoc: MooeDoc) => {

    const {
        store: { zoneType, numColumn, columnSide },
    } = GeneratorStor;

    const getTwoColumn = () => {
        const dock = addOuterStream(mooeDoc);
        return addInnerStream(dock, true);
    }

    const getDoc = () => {
        if (zoneType === 1 && numColumn === 1 && columnSide === 1 && mooeDoc) {
            return addOuterStream(mooeDoc);
        }

        if (zoneType === 1 && numColumn === 1 && columnSide === 2 && mooeDoc) {
            return addInnerStream(mooeDoc, true);
        }

        if (zoneType === 1 && numColumn === 2 && mooeDoc) {
            return getTwoColumn();
        }

        if (zoneType === 2 && mooeDoc && columnSide === 1) {
            return addOuterFlow(mooeDoc);
        }

        if (zoneType === 2 && mooeDoc && columnSide === 2) {
            return addInnerFlow(mooeDoc);
        }

        return addOuterStream(mooeDoc);

    }

    return getDoc();
}