// import { setGatesColumn } from "@/modules/zoneData/setGatesColumn";
// import { setInnerColumnTmp } from "@/modules/zoneData/setInnerColumnTmp";
// import { setInnerGatesColumn } from "@/modules/zoneData/setInnerGatesColumn";
// import { setOutsideColumn } from "@/modules/zoneData/setOutsideColumn";
// import { setSingleInnerColumn } from "@/modules/zoneData/setSingleInnerColumn";
import { FieldType, MooeDoc } from "@/types";
import { makeAutoObservable } from "mobx";
import { modifyDoc } from "../../modules/changeDoc";
import { getLastStreamNum } from "@/modules/modifyDoc/getLastStreamNum";

class GeneratorStor {

    historyIndex: number = 0;
    numBlock: number = 0;
    numColumn: number = 1;
    zoneType: number = 1;
    dirRoad: number = 1;
    columnSide: number = 1;
    href: string = "";
    refFileName: string | null = null;
    loadingTime: number[] = [0, 0];

    isModalOpen: boolean = false;
    isLoading: boolean = false;
    isMessageShow: boolean = false;
    isOpenDrawer: boolean = false;

    history: MooeDoc[] = [];

    mooeDoc: MooeDoc = null;

    formValues: FieldType | null = null;

    lastStreamNum: number = 0;

    constructor() {
        makeAutoObservable(this);
    }


    changeHistoryIndex = (val: number) => {
        this.historyIndex = val;
    }

    changeHistory = (doc: MooeDoc) => {
        this.history.push(doc);
        this.changeHistoryIndex(this.history.length);
    }

    increaseNumBlock = () => this.numBlock++

    setMooeDoc = (doc: MooeDoc) => {
        this.mooeDoc = doc;
        this.setHref(doc);
        this.setLastStreamNum(getLastStreamNum(doc));
    }

    setLastStreamNum = (val: number) => {
        this.lastStreamNum = val;
    }

    setNumColumn = (val: number) => {
        this.numColumn = val;
    }

    setFormValues = (values: FieldType | null) => {
        this.formValues = values;
    }

    setZoneType = (val: number) => {
        this.zoneType = val;
    }

    setDirRoad = (val: number) => {
        this.dirRoad = val;
    }

    setColumnSide = (val: number) => {
        this.columnSide = val;
    }

    setIsModalOpen = (val: boolean) => {
        this.isModalOpen = val;
    }

    setHref = (doc: MooeDoc) => {
        const newDock = JSON.stringify(doc);

        const file = new Blob([newDock as unknown as string], { type: 'application/mooe' });
        const url = URL.createObjectURL(file);

        this.href = url;
    }

    setIsMessageShow = (val: boolean) => this.isMessageShow = val;

    setIsLoading = (val: boolean) => this.isLoading = val;

    setLoadingTime = (val: number[]) => this.loadingTime = val;

    setRefFileName = (val: string | null) => this.refFileName = val;

    setIsOpenDrawer = (val: boolean) => this.isOpenDrawer = val;



    changeDoc = () => {

        const doc = modifyDoc(this.mooeDoc);

        this.setMooeDoc(doc);


        // if (this.zoneType === 1 && this.numColumn === 1 && this.columnSide === 1 && this.mooeDoc) {
        //     setOutsideColumn(this.formValues, this.mooeDoc, (this.mooeDoc as any).mLaneMarks.length, this.numBlock);
        // }

        // if (this.zoneType === 1 && this.numColumn === 1 && this.columnSide === 2 && this.mooeDoc) {
        //     setSingleInnerColumn(this.formValues, this.mooeDoc, (this.mooeDoc as any).mLaneMarks.length);
        // }

        // if (this.zoneType === 1 && this.numColumn === 2 && this.mooeDoc) {
        //     setOutsideColumn(this.formValues, this.mooeDoc, (this.mooeDoc as any).mLaneMarks.length, this.numBlock);
        //     setInnerColumnTmp(this.formValues, this.mooeDoc, (this.mooeDoc as any).mLaneMarks.length + 1000);
        // }

        // if (this.zoneType === 2 && this.mooeDoc && this.columnSide === 1) {
        //     setGatesColumn(this.formValues, this.mooeDoc, (this.mooeDoc as any).mLaneMarks.length);
        // }

        // if (this.zoneType === 2 && this.mooeDoc && this.columnSide === 2) {
        //     setInnerGatesColumn(this.formValues, this.mooeDoc, (this.mooeDoc as any).mLaneMarks.length);
        // }

        // const doc = JSON.parse(JSON.stringify(modifiedDoc));

        // this.setMooeDoc(doc);

        // this.changeHistory(doc);

        // this.increaseNumBlock();
    }

}

export const store = new GeneratorStor();
