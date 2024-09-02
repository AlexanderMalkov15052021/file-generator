import { toRadians } from "../math"

export const pallet = (
    lastNum: number, lastId: number, colNum: number, pointX: number, pointY: number, angle: number, index: number
) => {
    return {
        "mIsJockeyEndpoint": false,
        "mLaneMarkDescript": "",
        "mLaneMarkEnName": `A${lastNum}col${colNum}row${index + 1}`,  // A603col01row21
        "mLaneMarkID": lastId + index,
        "mLaneMarkName": `A${lastNum}col${colNum}row${index + 1}`,  // GT97col01row01
        "mLaneMarkType": 11,
        "mLaneMarkWidth": 0.3,
        "mLaneMarkXYZW": {
            "w": Math.cos(toRadians(angle / 2)),
            "x": pointX,
            "y": pointY,
            "z": Math.sin(toRadians(angle / 2))
        },
        "neighborsID": []
    }
}