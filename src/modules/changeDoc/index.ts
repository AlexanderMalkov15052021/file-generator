import { MooeDoc } from "@/types";
import { addInnerStream } from "../addZone/addInnerStream";

import { addOuterStream } from "../addZone/addOuterStream";
import { GeneratorStor } from "@/entities";
import { addOuterFlow } from "../addZone/addOuterFlow";
// import { setGatesColumn } from "../zoneData/setGatesColumn";
import { setInnerGatesColumn } from "../zoneData/setInnerGatesColumn";

export const modifyDoc = (mooeDoc: MooeDoc) => {

    const {
        store: { zoneType, numColumn, columnSide, formValues },
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
            return addInnerStream(mooeDoc);
        }

        if (zoneType === 1 && numColumn === 2 && mooeDoc) {
            return getTwoColumn();
        }

        if (zoneType === 2 && mooeDoc && columnSide === 1) {
            // return setGatesColumn(formValues, mooeDoc, (mooeDoc as any).mLaneMarks.length);
            return addOuterFlow(mooeDoc);
        }

        if (zoneType === 2 && mooeDoc && columnSide === 2) {
            return setInnerGatesColumn(formValues, mooeDoc, (mooeDoc as any).mLaneMarks.length);
        }

        return addOuterStream(mooeDoc);

    }




    return getDoc();
}