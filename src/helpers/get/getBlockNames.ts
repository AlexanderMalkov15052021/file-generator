import { MLaneMarks, MooeDoc } from "@/types";

export const getBlockNames = (mooeDoc: MooeDoc) => {
    const tetleRegex = /^[0-9]?[A-Za-z]+/;  // символы до чисел, начинающихся после симолов
    const countRegex = /\d+/;  // первые числовые символы строки

    const blockNames = mooeDoc?.mLaneMarks.reduce((record: Record<string, string[]>, point: MLaneMarks) => {

        const name = point.mLaneMarkName;

        if (name) {

            const count = (name.match(countRegex) || "")[0];
            const title = (name.match(tetleRegex) || "")[0];

            if (!record[count]) {
                title && (record[count] = [`${title}${count}`]);
            }
            else {
                !record[count].includes(`${title}${count}`) && record[count].push(`${title}${count}`);
            }

        }

        return record

    }, {});

    return blockNames || {};
}