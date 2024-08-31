import { getDistancePoints, getRoundedNumber, pointToLine, toRadians } from "@/helpers/math";
import { MooeDoc } from "@/types";

const fromStartPointSmallRoadToTargetPoint = 0.5;  // от палеты до cache point

const fromStackToCachePoint = 1.5;  // от палеты до cache point

const fromStackToTargetPoint = 0.6;  // от палеты до точки заезда

const fromStackToEnd = 0.16;  // от палеты до края

const distSmallRoad = 2.16;  // длинна маленткой дороги

export const setOutsideColumn = (values: any, mooeData: MooeDoc, indexLength: number, numBlock: number) => {

    const newPoints: { x: number; y: number; }[] = [];

    const distBetweenPoints = getDistancePoints(values.x1, values.y1, values.x2, values.y2);

    const dist = values.numRow <= 2
        ? getRoundedNumber(distBetweenPoints, 1000)
        : getRoundedNumber(distBetweenPoints / (values.numRow - 1), 1000);

    if (values.numRow > 2) {

        newPoints.push({ x: Number(values.x1), y: Number(values.y1) });

        for (let i = 0; i < values.numRow - 2; i++) {
            newPoints.push(pointToLine(values.x1, values.y1, values.x2, values.y2, dist * (i + 1)));
        }

        newPoints.push({ x: Number(values.x2), y: Number(values.y2) });
    }
    else {
        newPoints.push(
            { x: Number(values.x1), y: Number(values.y1) },
            { x: Number(values.x2), y: Number(values.y2) }
        );
    }

    // -55,422; -127,93
    // -55,145; -99,47

    newPoints.map((point: any, index: number) => {

        const endPointX = Math.cos(values.angle1 * Math.PI / 180 + Math.PI) * fromStackToEnd + point.x;
        const endPointY = Math.sin(values.angle1 * Math.PI / 180 + Math.PI) * fromStackToEnd + point.y;

        const startPointX = Math.cos(values.angle1 * Math.PI / 180) * distSmallRoad + endPointX;
        const startPointY = Math.sin(values.angle1 * Math.PI / 180) * distSmallRoad + endPointY;

        const targetPointX = Math.cos(values.angle1 * Math.PI / 180) * fromStackToTargetPoint + point.x;
        const targetPointY = Math.sin(values.angle1 * Math.PI / 180) * fromStackToTargetPoint + point.y;

        const cachePointX = Math.cos(values.angle1 * Math.PI / 180) * fromStackToCachePoint + point.x;
        const cachePointY = Math.sin(values.angle1 * Math.PI / 180) * fromStackToCachePoint + point.y;

        mooeData?.mLaneMarks.push(
            {
                "mAvoidPointID": null,
                "mBindRoadGroups": [],
                "mID": null,
                "mIsJockeyEndpoint": false,
                "mLaneMarkDescript": "",
                "mLaneMarkEnName": `A-${numBlock};col-${1};row-${index + 1}`,
                "mLaneMarkID": indexLength + 8000 + index,
                "mLaneMarkName": `A-${numBlock};col-${1};row-${index + 1}`,
                "mLaneMarkSize": {
                    "height": 0,
                    "length": 0,
                    "width": 0
                },
                "mLaneMarkType": 2,
                "mLaneMarkWidth": 0.3,
                "mLaneMarkXYZW": {
                    "w": Math.cos(toRadians(values.angle1 / 2)),
                    "x": targetPointX,
                    "y": targetPointY,
                    "z": Math.sin(toRadians(values.angle1 / 2))
                },
                "mMapName": "",
                "mPrepointID": null,
                "mTaskListName": "",
                "neighborsID": []
            }
        );

        mooeData?.mLaneMarks.push(
            {
                "mIsJockeyEndpoint": false,
                "mLaneMarkDescript": "",
                "mLaneMarkEnName": `B-${numBlock};col-${1};row-${index + 1}`,
                "mLaneMarkID": indexLength + 9000 + index,
                "mLaneMarkName": `B-${numBlock};col-${1};row-${index + 1}`,
                "mLaneMarkSize": {
                    "height": 0,
                    "length": 0,
                    "width": 0
                },
                "mLaneMarkType": 9,
                "mLaneMarkWidth": 0.3,
                "mLaneMarkXYZW": {
                    "w": Math.cos(toRadians(values.angle1 / 2)),
                    "x": cachePointX,
                    "y": cachePointY,
                    "z": Math.sin(toRadians(values.angle1 / 2))
                },
                "neighborsID": []
            }
        );

        mooeData?.mLaneMarks.push(
            {
                "mIsJockeyEndpoint": false,
                "mLaneMarkDescript": "",
                "mLaneMarkEnName": "",
                "mLaneMarkID": indexLength + 1000 + index,
                "mLaneMarkName": "",
                "mLaneMarkType": 0,
                "mLaneMarkWidth": 0.3,
                "mLaneMarkXYZW": {
                    "w": Math.cos(toRadians(values.angle1 / 2)),
                    "x": startPointX,
                    "y": startPointY,
                    "z": Math.sin(toRadians(values.angle1 / 2))
                },
                "neighborsID": []
            }
        );

        mooeData?.mLaneMarks.push(
            {
                "mIsJockeyEndpoint": false,
                "mLaneMarkDescript": "",
                "mLaneMarkEnName": "",
                "mLaneMarkID": indexLength + 2000 + index,
                "mLaneMarkName": "",
                "mLaneMarkType": 0,
                "mLaneMarkWidth": 0.3,
                "mLaneMarkXYZW": {
                    "w": Math.cos(toRadians(values.angle1 / 2)),
                    "x": endPointX,
                    "y": endPointY,
                    "z": Math.sin(toRadians(values.angle1 / 2))
                },
                "neighborsID": []
            }
        );

        mooeData?.mLaneMarks.push(
            {
                "mIsJockeyEndpoint": false,
                "mLaneMarkDescript": "",
                "mLaneMarkEnName": `E-${numBlock};col-${1};row-${index + 1}`,
                "mLaneMarkID": indexLength + 3000 + index,
                "mLaneMarkName": `E-${numBlock};col-${1};row-${index + 1}`,
                "mLaneMarkType": 11,
                "mLaneMarkWidth": 0.3,
                "mLaneMarkXYZW": {
                    "w": Math.cos(toRadians(values.angle1 / 2)),
                    "x": point.x,
                    "y": point.y,
                    "z": Math.sin(toRadians(values.angle1 / 2))
                },
                "neighborsID": []
            }
        );

        mooeData?.mRoads.push(
            {
                "mBelongJunctionID": -1,
                "mEndPosition": {
                    "x": endPointX,
                    "y": endPointY,
                    "z": Math.sin(toRadians(values.angle1 / 2))
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
                        "mDirection": 2,
                        "mEndPos": indexLength + 2000 + index,
                        "mGoalAgain": false,
                        "mLaneDescript": "",
                        "mLaneID": indexLength + 500 + index,
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
                        "mStartPos": indexLength + 1000 + index,
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
                "mRoadID": indexLength + 5000 + index,
                "mRoadName": "",
                "mStartPosition": {
                    "x": startPointX,
                    "y": startPointY,
                    "z": Math.sin(toRadians(values.angle1 / 2))
                }
            }
        );


        if (index !== newPoints.length - 1) {

            const nextEndPointX = Math.cos(values.angle1 * Math.PI / 180 + Math.PI) * fromStackToEnd + newPoints[index + 1].x;
            const nextEndPointY = Math.sin(values.angle1 * Math.PI / 180 + Math.PI) * fromStackToEnd + newPoints[index + 1].y;

            const nextStartPointX = Math.cos(values.angle1 * Math.PI / 180) * distSmallRoad + nextEndPointX;
            const nextStartPointY = Math.sin(values.angle1 * Math.PI / 180) * distSmallRoad + nextEndPointY;

            mooeData?.mRoads.push(
                {
                    "mBelongJunctionID": -1,
                    "mEndPosition": {
                        "x": nextStartPointX,
                        "y": nextStartPointY,
                        "z": Math.sin(toRadians(values.angle1 / 2))
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
                            "mDirection": 1,
                            "mEndPos": indexLength + 1000 + index + 1,
                            "mGoalAgain": false,
                            "mLaneDescript": "",
                            "mLaneID": indexLength + 100 + index,
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
                            "mStartPos": indexLength + 1000 + index,
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
                    "mRoadID": indexLength + 7000 + index,
                    "mRoadName": "",
                    "mStartPosition": {
                        "x": startPointX,
                        "y": startPointY,
                        "z": Math.sin(toRadians(values.angle1 / 2))
                    }
                }
            );
        }

        const leftTargetPointX = Math.cos(Math.PI / 2)
            * fromStartPointSmallRoadToTargetPoint + startPointX;
        const leftTargetPointY = Math.sin(Math.PI / 2)
            * fromStartPointSmallRoadToTargetPoint + startPointY;

        mooeData?.mLaneMarks.push(
            {
                "mAvoidPointID": null,
                "mBindRoadGroups": [],
                "mID": null,
                "mIsJockeyEndpoint": false,
                "mLaneMarkDescript": "",
                "mLaneMarkEnName": `F-${numBlock};col-${1};row-${index + 1}`,
                "mLaneMarkID": indexLength + 10000 + index,
                "mLaneMarkName": `F-${numBlock};col-${1};row-${index + 1}`,
                "mLaneMarkSize": {
                    "height": 0,
                    "length": 0,
                    "width": 0
                },
                "mLaneMarkType": 2,
                "mLaneMarkWidth": 0.3,
                "mLaneMarkXYZW": {
                    "w": Math.cos(toRadians(values.angle1 / 2) - Math.PI / 4),
                    "x": leftTargetPointX,
                    "y": leftTargetPointY,
                    "z": Math.sin(toRadians(values.angle1 / 2) - Math.PI / 4)
                },
                "mMapName": "",
                "mPrepointID": null,
                "mTaskListName": "",
                "neighborsID": []
            }
        );

    });



    const coordsPoint = pointToLine(
        values.x1,
        values.y1,
        values.x2,
        values.y2,
        dist * values.numRow
    );

    const coordsPointX = Math.cos(values.angle1 * Math.PI / 180) * (distSmallRoad - fromStackToEnd) + coordsPoint.x;
    const coordsPointY = Math.sin(values.angle1 * Math.PI / 180) * (distSmallRoad - fromStackToEnd) + coordsPoint.y;

    const newEndPointX = Math.cos(values.angle1 * Math.PI / 180) * (distSmallRoad - fromStackToEnd) + newPoints[newPoints.length - 1].x;
    const newEndPointY = Math.sin(values.angle1 * Math.PI / 180) * (distSmallRoad - fromStackToEnd) + newPoints[newPoints.length - 1].y;

    mooeData?.mLaneMarks.push(
        {
            "mIsJockeyEndpoint": false,
            "mLaneMarkDescript": "",
            "mLaneMarkEnName": "",
            "mLaneMarkID": indexLength + 1000 + newPoints.length,
            "mLaneMarkName": "",
            "mLaneMarkType": 0,
            "mLaneMarkWidth": 0.3,
            "mLaneMarkXYZW": {
                "w": Math.cos(toRadians(values.angle1 / 2)),
                "x": coordsPointX,
                "y": coordsPointY,
                "z": Math.sin(toRadians(values.angle1 / 2))
            },
            "neighborsID": []
        }
    );

    mooeData?.mRoads.push(
        {
            "mBelongJunctionID": -1,
            "mEndPosition": {
                "x": newEndPointX,
                "y": newEndPointY,
                "z": Math.sin(toRadians(values.angle1 / 2))
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
                    "mDirection": 2,
                    "mEndPos": indexLength + 1000 + newPoints.length - 1,
                    "mGoalAgain": false,
                    "mLaneDescript": "",
                    "mLaneID": indexLength + 100 + newPoints.length,
                    "mLaneName": "",
                    "mLanePro": 0,
                    "mLaneType": 0,
                    "mLeftAvoidanceArea": 0.1,
                    "mLength": distSmallRoad - fromStackToEnd,
                    "mObstacleDistance": 0.1,
                    "mObstacleWidth": 0.1,
                    "mPlannerAgain": false,
                    "mPointOfInterest": [],
                    "mPosID": 0,
                    "mRightAvoidanceArea": 0.1,
                    "mSpeed": 0,
                    "mStartPos": indexLength + 1000 + newPoints.length,
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
            "mRoadID": indexLength + 7000 + newPoints.length,
            "mRoadName": "",
            "mStartPosition": {
                "x": coordsPointX,
                "y": coordsPointY,
                "z": Math.sin(toRadians(values.angle1 / 2))
            }
        }
    );

}