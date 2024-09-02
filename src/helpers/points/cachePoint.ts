export const cachePoint = (
    lastId: number, pointX: number, pointY: number, angle: number, lastNum: number, colNum: number, roeNum: number, postName: string
) => {

    return {
        "mIsJockeyEndpoint": false,
        "mLaneMarkDescript": "",
        "mLaneMarkEnName": `A${lastNum}col${colNum}row${roeNum}${postName}`,  // A603col01row21
        "mLaneMarkID": lastId,
        "mLaneMarkName": `A${lastNum}col${colNum}row${roeNum}${postName}`,  // A603col01row21
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