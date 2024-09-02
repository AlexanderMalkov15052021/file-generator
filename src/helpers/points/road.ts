import { Coords } from "@/types"
import { toRadians } from "../math"
import { distSmallRoad } from "@/constants";

export const road = (
    startId: number, endId: number, startPoint: Coords, endPoint: Coords, id: number, angle: number, roadDir: number
) => {
    return {
        "mBelongJunctionID": -1,
        "mEndPosition": {
            "x": endPoint.x,
            "y": endPoint.y,
            "z": Math.sin(toRadians(angle / 2))
        },
        "mLForbiddenLine": [],
        "mLForbiddenLineID": -1,
        "mLaneCount": 1,
        "mLanes": [
            {
                "mAssistedDrawFlag": false,
                "mAvoidObstacle": false,
                "mBindMarkAreaID": -1,
                "mBorder": {
                    "roadwidth_left": 0,
                    "roadwidth_right": 0
                },
                "mDelta": 0.04,
                "mDirection": roadDir,
                "mEndPos": endId,
                "mGoalAgain": false,
                "mLaneDescript": "",
                "mLaneID": id,
                "mLaneName": "",
                "mLanePro": 0,
                "mLaneType": 0,
                "mLeftAvoidanceArea": 0.1,
                "mLength": distSmallRoad,
                "mObstacleDistance": 0.1,
                "mObstacleWidth": 0.1,
                "mPlannerAgain": false,
                "mPointOfInterest": [],
                "mPosID": 0,
                "mRightAvoidanceArea": 0.1,
                "mSpeed": 0,
                "mStartPos": startId,
                "mWidth": 0.3,
                "usesensor": {
                    "fall_arrest_system": true,
                    "use_bottom_laser": true,
                    "use_front_realsense": true,
                    "use_front_realsense_rgb": true
                }
            }
        ],
        "mLength": distSmallRoad,
        "mRForbiddenLine": [],
        "mRForbiddenLineID": -1,
        "mRoadID": id + 1,
        "mRoadName": "",
        "mStartPosition": {
            "x": startPoint.x,
            "y": startPoint.y,
            "z": Math.sin(toRadians(angle / 2))
        }
    }
}