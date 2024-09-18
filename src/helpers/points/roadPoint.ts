import { toRadians } from "../math"

export const roadPoint = (name: string, id: number, pointX: number, pointY: number, angle: number) => {
    return {
        "mIsJockeyEndpoint": false,
        "mLaneMarkDescript": "",
        "mLaneMarkEnName": name,
        "mLaneMarkID": id,
        "mLaneMarkName": name,
        "mLaneMarkType": 0,
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