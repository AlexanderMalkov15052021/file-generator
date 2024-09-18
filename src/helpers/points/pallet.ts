export const pallet = (
    lastNum: number, lastId: number, colName: string, rowName: string, pointX: number, pointY: number, angle: number, zoneName: string
) => {
    return {
        "mIsJockeyEndpoint": false,
        "mLaneMarkDescript": "",
        "mLaneMarkEnName": `${zoneName}${lastNum}col${colName}row${rowName}`,  // A603col01row21
        "mLaneMarkID": lastId,
        "mLaneMarkName": `${zoneName}${lastNum}col${colName}row${rowName}`,  // GT97col01row01
        "mLaneMarkType": 11,
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