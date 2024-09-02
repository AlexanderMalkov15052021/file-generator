import { MooeDoc } from "@/types";
import { addInnerStream } from "../addZone/addInnerStream";

import { addOuterStream } from "../addZone/addOuterStream";
import { GeneratorStor } from "@/entities";

export const modifyDoc = (mooeDoc: MooeDoc) => {

    const {
        store: { zoneType, numColumn, columnSide },
    } = GeneratorStor;




    const getDoc = () => {
        if (zoneType === 1 && numColumn === 1 && columnSide === 1 && mooeDoc) {
            return addOuterStream(mooeDoc);
        }

        if (zoneType === 1 && numColumn === 1 && columnSide === 2 && mooeDoc) {
            return addInnerStream(mooeDoc);
        }

        // if (zoneType === 1 && numColumn === 2 && mooeDoc) {
        //     setOutsideColumn(formValues, mooeDoc, (mooeDoc as any).mLaneMarks.length, numBlock);
        //     setInnerColumnTmp(formValues, mooeDoc, (mooeDoc as any).mLaneMarks.length + 1000);
        // }

        // if (zoneType === 2 && mooeDoc && columnSide === 1) {
        //     setGatesColumn(formValues, mooeDoc, (mooeDoc as any).mLaneMarks.length);
        // }

        // if (zoneType === 2 && mooeDoc && columnSide === 2) {
        //     setInnerGatesColumn(formValues, mooeDoc, (mooeDoc as any).mLaneMarks.length);
        // }
    }




    return getDoc();
}