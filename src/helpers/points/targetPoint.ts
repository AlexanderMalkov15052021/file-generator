// Таргет поинт
export const targetPoint = (
    id: number, pointX: number, pointY: number, angle: number,
    name: string, postName: string, dir: number
) => {

    return {
        "mAvoidPointID": null,
        "mBindRoadGroups": [],
        "mID": null,
        "mIsJockeyEndpoint": false,
        "mLaneMarkDescript": "",
        "mLaneMarkEnName": `${name}${postName}`,  // A603col01row21
        "mLaneMarkID": id,
        "mLaneMarkName": `${name}${postName}`,  // A603col01row21
        "mLaneMarkSize": {
            "height": 0,
            "length": 0,
            "width": 0
        },
        "mLaneMarkType": 2,
        "mLaneMarkWidth": 0.3,
        "mLaneMarkXYZW": {
            "w": Math.cos(angle / 2 + dir),
            "x": pointX,
            "y": pointY,
            "z": Math.sin(angle / 2 + dir)
        },
        "mMapName": "",
        "mPrepointID": null,
        "mTaskListName": "",
        "neighborsID": []
    }
}