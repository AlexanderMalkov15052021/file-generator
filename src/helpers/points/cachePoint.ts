export const cachePoint = (
    id: number, pointX: number, pointY: number, angle: number,
    lastNum: number, colName: string, rowNuame: string, postName: string, zoneName: string
) => {

    return {
        "mIsJockeyEndpoint": false,
        "mLaneMarkDescript": "",
        "mLaneMarkEnName": `${zoneName}${lastNum}col${colName}row${rowNuame}${postName}`,  // A603col01row21
        "mLaneMarkID": id,
        "mLaneMarkName": `${zoneName}${lastNum}col${colName}row${rowNuame}${postName}`,  // A603col01row21
        "mLaneMarkSize": {
            "height": 0,
            "length": 0,
            "width": 0
        },
        "mLaneMarkType": 9,
        "mLaneMarkWidth": 0.3,
        "mLaneMarkXYZW": {
            "w": Math.cos(angle / 2),
            "x": pointX,
            "y": pointY,
            "z": Math.sin(angle / 2)
        },
        "neighborsID": []
    }
}