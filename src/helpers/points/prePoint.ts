export const prePoint = (name: string, id: number, pointX: number, pointY: number, angle: number, dir: number
) => {

    return {
        "mIsJockeyEndpoint": false,
        "mLaneMarkDescript": "",
        "mLaneMarkEnName": name,
        "mLaneMarkID": id,
        "mLaneMarkName": name,
        "mLaneMarkSize": {
            "height": 0,
            "length": 0,
            "width": 0
        },
        "mLaneMarkType": 7,
        "mLaneMarkWidth": 0.3,
        "mLaneMarkXYZW": {
            "w": Math.cos(angle / 2 + dir),
            "x": pointX,
            "y": pointY,
            "z": Math.sin(angle / 2 + dir)
        },
        "neighborsID": []
    }

}