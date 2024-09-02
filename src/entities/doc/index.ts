import { makeAutoObservable } from "mobx";

class DocStor {

    lastGTNum = 0;

    constructor() {
        makeAutoObservable(this);
    }

    setLastGTNum = (num: number) => {
        this.lastGTNum = num;
    }

}

export const store = new DocStor();
