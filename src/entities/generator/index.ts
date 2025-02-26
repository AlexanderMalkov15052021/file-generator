import { FieldType, MooeDoc } from "@/types";
import { makeAutoObservable } from "mobx";
import { modifyDoc } from "../../modules/changeDoc";
import { getLastStreamNum } from "@/modules/modifyDoc/getLastStreamNum";
import { getLastFlowNum } from "@/modules/modifyDoc/getLastFlowNum";

class GeneratorStor {

    historyIndex: number = 0;
    numBlock: number = 0;
    numColumn: number = 1;
    zoneType: number = 1;
    namingOrder: number = 1;
    dirRoad: number = 1;
    cellSide: number = 1;

    href: string = "";
    refFileName: string | null = null;
    loadingTime: number[] = [0, 0];

    isModalOpen: boolean = false;
    isLoadingDocChange: boolean = false;
    isShownFirstPointMessage: boolean = false;
    isShownSecondPointMessage: boolean = false;
    isLoading: boolean = false;
    isMessageShow: boolean = false;
    isOpenDrawer: boolean = false;

    // данные сообщения номера блока
    blockNumMessageData: string[] = [];

    history: MooeDoc[] = [];

    mooeDoc: MooeDoc = null;

    formValues: FieldType | null = null;

    lastStreamNum: number = 0;
    lastFlowNum: number = 0;

    constructor() {
        makeAutoObservable(this);
    }

    changeShowFirstPointMessage = (val: boolean) => {
        this.isShownFirstPointMessage = val;
    }

    changeShowSecondPointMessage = (val: boolean) => {
        this.isShownSecondPointMessage = val;
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
        this.setLastFlowNum(getLastFlowNum(doc));
    }

    setBlockNumMessageData = (val: string[]) => {
        this.blockNumMessageData = val;
    }

    setLastStreamNum = (val: number) => {
        this.lastStreamNum = val;
    }

    setLastFlowNum = (val: number) => {
        this.lastFlowNum = val;
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

    setNamingOrder = (val: number) => {
        this.namingOrder = val;
    }

    setDirRoad = (val: number) => {
        this.dirRoad = val;
    }

    setCellSide = (val: number) => {
        this.cellSide = val;
    }

    setIsModalOpen = (val: boolean) => {
        this.isModalOpen = val;
    }

    setIsLoadingDocChangen = (val: boolean) => {
        this.isLoadingDocChange = val;
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

    }

}

export const store = new GeneratorStor();
