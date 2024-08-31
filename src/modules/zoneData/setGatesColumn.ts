import { getDistancePoints, getRoundedNumber, pointToLine, toRadians } from "@/helpers/math";
import { MooeData } from "@/types";

const distBetweenStackAndCachePoint = 0.15;

const fromStartToTargetPoint = 0.4;

const fromStackToFirstCachePoint = 1.35 + distBetweenStackAndCachePoint;

const fromStackToSecondCachePoint = 2.7 + distBetweenStackAndCachePoint;

const fromStackToTothirdCachePoint = 4.05 + distBetweenStackAndCachePoint;

const fromStackToFourthCachePoint = 5.4 + distBetweenStackAndCachePoint;

const fromStackToFifthCachePoint = 6.75 + distBetweenStackAndCachePoint;

const fromStackToSixthCachePoint = 8.1 + distBetweenStackAndCachePoint;

const fromStackToSeventhCachePoint = 9.45 + distBetweenStackAndCachePoint;

const fromStackToEighthCachePoint = 10.8 + distBetweenStackAndCachePoint;

const fromStackToNinthCachePoint = 12.3;


const fromStackToSecondStack = 1.35;

const fromStackTothirdStack = 2.7;

const fromStackFourthStack = 4.05;

const fromStackFifthStack = 5.4;

const fromStackSixthStack = 6.75;

const fromStackSeventhStack = 8.1;

const fromStackEighthStack = 9.45;

const fromStackNinthStack = 10.8;

const fromStackToEnd = 0.16;  // от палеты до края

const distRow = 14;  // длинна ряда



const roadsDist = [fromStackToEnd * -1, 1.35, 2.7, 4.05, 5.4, 6.75, 8.1, 9.45, 10.8, 13.86];

export const setGatesColumn = (values: any, mooeData: MooeData, indexLength: number) => {

    // console.log(getDistancePoints(
    //     -26.716,
    //     -149.95,
    //     -26.558,
    //     -136.09
    // ));

    // console.log(getDistancePoints(
    //     -27.716,
    //     -149.94,
    //     -27.558,
    //     -136.08
    // ));

    const pointX1 = Number(values.x1) - Math.cos(values.angle1 * Math.PI / 180) * (values.columnsInterval ?? 0);
    const pointX2 = Number(values.x2) - Math.cos(values.angle1 * Math.PI / 180) * (values.columnsInterval ?? 0);
    const pointY1 = Number(values.y1) - Math.sin(values.angle1 * Math.PI / 180) * (values.columnsInterval ?? 0);
    const pointY2 = Number(values.y2) - Math.sin(values.angle1 * Math.PI / 180) * (values.columnsInterval ?? 0);

    const newPoints: { x: number; y: number; }[] = [];

    const distBetweenPoints = getDistancePoints(
        pointX1,
        pointY1,
        pointX2,
        pointY2
    );

    const dist = values.numRow <= 2
        ? getRoundedNumber(distBetweenPoints, 1000)
        : getRoundedNumber(distBetweenPoints / (values.numRow - 1), 1000);

    if (values.numRow > 2) {

        newPoints.push({ x: pointX1, y: pointY1 });

        for (let i = 0; i < values.numRow - 2; i++) {
            newPoints.push(pointToLine(
                pointX1,
                pointY1,
                pointX2,
                pointY2,
                dist * (i + 1))
            );
        }

        newPoints.push({ x: pointX2, y: pointY2 });
    }
    else {
        newPoints.push(
            { x: pointX1, y: pointY1 },
            { x: pointX2, y: pointY2 }
        );
    }


    // -26,714; -149,79
    // -35,698; -149,74


    newPoints.map((point: any, index: number) => {

        const secondStackX = Math.cos((values.angle1) * Math.PI / 180) * fromStackToSecondStack + point.x;
        const secondStackY = Math.sin((values.angle1) * Math.PI / 180) * fromStackToSecondStack + point.y;

        const tothirdStackX = Math.cos((values.angle1) * Math.PI / 180) * fromStackTothirdStack + point.x;
        const tothirdStackY = Math.sin((values.angle1) * Math.PI / 180) * fromStackTothirdStack + point.y;

        const fourthStackX = Math.cos((values.angle1) * Math.PI / 180) * fromStackFourthStack + point.x;
        const fourthStackY = Math.sin((values.angle1) * Math.PI / 180) * fromStackFourthStack + point.y;

        const fifthStackX = Math.cos((values.angle1) * Math.PI / 180) * fromStackFifthStack + point.x;
        const fifthStackY = Math.sin((values.angle1) * Math.PI / 180) * fromStackFifthStack + point.y;

        const sixthStackX = Math.cos((values.angle1) * Math.PI / 180) * fromStackSixthStack + point.x;
        const sixthStackY = Math.sin((values.angle1) * Math.PI / 180) * fromStackSixthStack + point.y;

        const seventhStackX = Math.cos((values.angle1) * Math.PI / 180) * fromStackSeventhStack + point.x;
        const seventhStackY = Math.sin((values.angle1) * Math.PI / 180) * fromStackSeventhStack + point.y;

        const eighthStackX = Math.cos((values.angle1) * Math.PI / 180) * fromStackEighthStack + point.x;
        const eighthStackY = Math.sin((values.angle1) * Math.PI / 180) * fromStackEighthStack + point.y;

        const ninthStackX = Math.cos((values.angle1) * Math.PI / 180) * fromStackNinthStack + point.x;
        const ninthStackY = Math.sin((values.angle1) * Math.PI / 180) * fromStackNinthStack + point.y;






        const firstCachePointX = Math.cos((values.angle1) * Math.PI / 180) * fromStackToFirstCachePoint + point.x;
        const firstCachePointY = Math.sin((values.angle1) * Math.PI / 180) * fromStackToFirstCachePoint + point.y;

        const secondCachePointX = Math.cos((values.angle1) * Math.PI / 180) * fromStackToSecondCachePoint + point.x;
        const secondCachePointY = Math.sin((values.angle1) * Math.PI / 180) * fromStackToSecondCachePoint + point.y;

        const tothirdCachePointX = Math.cos((values.angle1) * Math.PI / 180) * fromStackToTothirdCachePoint + point.x;
        const tothirdCachePointY = Math.sin((values.angle1) * Math.PI / 180) * fromStackToTothirdCachePoint + point.y;

        const fourthCachePointX = Math.cos((values.angle1) * Math.PI / 180) * fromStackToFourthCachePoint + point.x;
        const fourthCachePointY = Math.sin((values.angle1) * Math.PI / 180) * fromStackToFourthCachePoint + point.y;

        const fifthCachePointX = Math.cos((values.angle1) * Math.PI / 180) * fromStackToFifthCachePoint + point.x;
        const fifthCachePointY = Math.sin((values.angle1) * Math.PI / 180) * fromStackToFifthCachePoint + point.y;

        const sixthCachePointX = Math.cos((values.angle1) * Math.PI / 180) * fromStackToSixthCachePoint + point.x;
        const sixthCachePointY = Math.sin((values.angle1) * Math.PI / 180) * fromStackToSixthCachePoint + point.y;

        const seventhCachePointX = Math.cos((values.angle1) * Math.PI / 180) * fromStackToSeventhCachePoint + point.x;
        const seventhCachePointY = Math.sin((values.angle1) * Math.PI / 180) * fromStackToSeventhCachePoint + point.y;

        const eighthCachePointX = Math.cos((values.angle1) * Math.PI / 180) * fromStackToEighthCachePoint + point.x;
        const eighthCachePointY = Math.sin((values.angle1) * Math.PI / 180) * fromStackToEighthCachePoint + point.y;

        const ninthCachePointX = Math.cos((values.angle1) * Math.PI / 180) * fromStackToNinthCachePoint + point.x;
        const ninthCachePointY = Math.sin((values.angle1) * Math.PI / 180) * fromStackToNinthCachePoint + point.y;














        mooeData.mLaneMarks.push(
            {
                "mIsJockeyEndpoint": false,
                "mLaneMarkDescript": "",
                "mLaneMarkEnName": "",
                "mLaneMarkID": indexLength + 19000 + index,  // 11000
                "mLaneMarkName": "",
                "mLaneMarkType": 9,
                "mLaneMarkWidth": 0.3,
                "mLaneMarkXYZW": {
                    "w": Math.cos(toRadians((values.angle1) / 2)),
                    "x": firstCachePointX,
                    "y": firstCachePointY,
                    "z": Math.sin(toRadians((values.angle1) / 2))
                },
                "neighborsID": []
            }
        );

        mooeData.mLaneMarks.push(
            {
                "mIsJockeyEndpoint": false,
                "mLaneMarkDescript": "",
                "mLaneMarkEnName": "",
                "mLaneMarkID": indexLength + 20000 + index,
                "mLaneMarkName": "",
                "mLaneMarkType": 9,
                "mLaneMarkWidth": 0.3,
                "mLaneMarkXYZW": {
                    "w": Math.cos(toRadians((values.angle1) / 2)),
                    "x": secondCachePointX,
                    "y": secondCachePointY,
                    "z": Math.sin(toRadians((values.angle1) / 2))
                },
                "neighborsID": []
            }
        );

        mooeData.mLaneMarks.push(
            {
                "mIsJockeyEndpoint": false,
                "mLaneMarkDescript": "",
                "mLaneMarkEnName": "",
                "mLaneMarkID": indexLength + 21000 + index,
                "mLaneMarkName": "",
                "mLaneMarkType": 9,
                "mLaneMarkWidth": 0.3,
                "mLaneMarkXYZW": {
                    "w": Math.cos(toRadians((values.angle1) / 2)),
                    "x": tothirdCachePointX,
                    "y": tothirdCachePointY,
                    "z": Math.sin(toRadians((values.angle1) / 2))
                },
                "neighborsID": []
            }
        );

        mooeData.mLaneMarks.push(
            {
                "mIsJockeyEndpoint": false,
                "mLaneMarkDescript": "",
                "mLaneMarkEnName": "",
                "mLaneMarkID": indexLength + 22000 + index,
                "mLaneMarkName": "",
                "mLaneMarkType": 9,
                "mLaneMarkWidth": 0.3,
                "mLaneMarkXYZW": {
                    "w": Math.cos(toRadians((values.angle1) / 2)),
                    "x": fourthCachePointX,
                    "y": fourthCachePointY,
                    "z": Math.sin(toRadians((values.angle1) / 2))
                },
                "neighborsID": []
            }
        );

        mooeData.mLaneMarks.push(
            {
                "mIsJockeyEndpoint": false,
                "mLaneMarkDescript": "",
                "mLaneMarkEnName": "",
                "mLaneMarkID": indexLength + 23000 + index,
                "mLaneMarkName": "",
                "mLaneMarkType": 9,
                "mLaneMarkWidth": 0.3,
                "mLaneMarkXYZW": {
                    "w": Math.cos(toRadians((values.angle1) / 2)),
                    "x": fifthCachePointX,
                    "y": fifthCachePointY,
                    "z": Math.sin(toRadians((values.angle1) / 2))
                },
                "neighborsID": []
            }
        );

        mooeData.mLaneMarks.push(
            {
                "mIsJockeyEndpoint": false,
                "mLaneMarkDescript": "",
                "mLaneMarkEnName": "",
                "mLaneMarkID": indexLength + 24000 + index,
                "mLaneMarkName": "",
                "mLaneMarkType": 9,
                "mLaneMarkWidth": 0.3,
                "mLaneMarkXYZW": {
                    "w": Math.cos(toRadians((values.angle1) / 2)),
                    "x": sixthCachePointX,
                    "y": sixthCachePointY,
                    "z": Math.sin(toRadians((values.angle1) / 2))
                },
                "neighborsID": []
            }
        );

        mooeData.mLaneMarks.push(
            {
                "mIsJockeyEndpoint": false,
                "mLaneMarkDescript": "",
                "mLaneMarkEnName": "",
                "mLaneMarkID": indexLength + 25000 + index,
                "mLaneMarkName": "",
                "mLaneMarkType": 9,
                "mLaneMarkWidth": 0.3,
                "mLaneMarkXYZW": {
                    "w": Math.cos(toRadians((values.angle1) / 2)),
                    "x": seventhCachePointX,
                    "y": seventhCachePointY,
                    "z": Math.sin(toRadians((values.angle1) / 2))
                },
                "neighborsID": []
            }
        );

        mooeData.mLaneMarks.push(
            {
                "mIsJockeyEndpoint": false,
                "mLaneMarkDescript": "",
                "mLaneMarkEnName": "",
                "mLaneMarkID": indexLength + 26000 + index,
                "mLaneMarkName": "",
                "mLaneMarkType": 9,
                "mLaneMarkWidth": 0.3,
                "mLaneMarkXYZW": {
                    "w": Math.cos(toRadians((values.angle1) / 2)),
                    "x": eighthCachePointX,
                    "y": eighthCachePointY,
                    "z": Math.sin(toRadians((values.angle1) / 2))
                },
                "neighborsID": []
            }
        );

        mooeData.mLaneMarks.push(
            {
                "mIsJockeyEndpoint": false,
                "mLaneMarkDescript": "",
                "mLaneMarkEnName": "",
                "mLaneMarkID": indexLength + 27000 + index,
                "mLaneMarkName": "",
                "mLaneMarkType": 9,
                "mLaneMarkWidth": 0.3,
                "mLaneMarkXYZW": {
                    "w": Math.cos(toRadians((values.angle1) / 2)),
                    "x": ninthCachePointX,
                    "y": ninthCachePointY,
                    "z": Math.sin(toRadians((values.angle1) / 2))
                },
                "neighborsID": []
            }
        );








        mooeData.mLaneMarks.push(
            {
                "mIsJockeyEndpoint": false,
                "mLaneMarkDescript": "",
                "mLaneMarkEnName": "",
                "mLaneMarkID": indexLength + 11000 + index,  // 11000
                "mLaneMarkName": "",
                "mLaneMarkType": 11,
                "mLaneMarkWidth": 0.3,
                "mLaneMarkXYZW": {
                    "w": Math.cos(toRadians((values.angle1) / 2)),
                    "x": secondStackX,
                    "y": secondStackY,
                    "z": Math.sin(toRadians((values.angle1) / 2))
                },
                "neighborsID": []
            }
        );

        mooeData.mLaneMarks.push(
            {
                "mIsJockeyEndpoint": false,
                "mLaneMarkDescript": "",
                "mLaneMarkEnName": "",
                "mLaneMarkID": indexLength + 12000 + index,
                "mLaneMarkName": "",
                "mLaneMarkType": 11,
                "mLaneMarkWidth": 0.3,
                "mLaneMarkXYZW": {
                    "w": Math.cos(toRadians((values.angle1) / 2)),
                    "x": tothirdStackX,
                    "y": tothirdStackY,
                    "z": Math.sin(toRadians((values.angle1) / 2))
                },
                "neighborsID": []
            }
        );

        mooeData.mLaneMarks.push(
            {
                "mIsJockeyEndpoint": false,
                "mLaneMarkDescript": "",
                "mLaneMarkEnName": "",
                "mLaneMarkID": indexLength + 13000 + index,
                "mLaneMarkName": "",
                "mLaneMarkType": 11,
                "mLaneMarkWidth": 0.3,
                "mLaneMarkXYZW": {
                    "w": Math.cos(toRadians((values.angle1) / 2)),
                    "x": fourthStackX,
                    "y": fourthStackY,
                    "z": Math.sin(toRadians((values.angle1) / 2))
                },
                "neighborsID": []
            }
        );

        mooeData.mLaneMarks.push(
            {
                "mIsJockeyEndpoint": false,
                "mLaneMarkDescript": "",
                "mLaneMarkEnName": "",
                "mLaneMarkID": indexLength + 14000 + index,
                "mLaneMarkName": "",
                "mLaneMarkType": 11,
                "mLaneMarkWidth": 0.3,
                "mLaneMarkXYZW": {
                    "w": Math.cos(toRadians((values.angle1) / 2)),
                    "x": fifthStackX,
                    "y": fifthStackY,
                    "z": Math.sin(toRadians((values.angle1) / 2))
                },
                "neighborsID": []
            }
        );

        mooeData.mLaneMarks.push(
            {
                "mIsJockeyEndpoint": false,
                "mLaneMarkDescript": "",
                "mLaneMarkEnName": "",
                "mLaneMarkID": indexLength + 15000 + index,
                "mLaneMarkName": "",
                "mLaneMarkType": 11,
                "mLaneMarkWidth": 0.3,
                "mLaneMarkXYZW": {
                    "w": Math.cos(toRadians((values.angle1) / 2)),
                    "x": sixthStackX,
                    "y": sixthStackY,
                    "z": Math.sin(toRadians((values.angle1) / 2))
                },
                "neighborsID": []
            }
        );

        mooeData.mLaneMarks.push(
            {
                "mIsJockeyEndpoint": false,
                "mLaneMarkDescript": "",
                "mLaneMarkEnName": "",
                "mLaneMarkID": indexLength + 16000 + index,
                "mLaneMarkName": "",
                "mLaneMarkType": 11,
                "mLaneMarkWidth": 0.3,
                "mLaneMarkXYZW": {
                    "w": Math.cos(toRadians((values.angle1) / 2)),
                    "x": seventhStackX,
                    "y": seventhStackY,
                    "z": Math.sin(toRadians((values.angle1) / 2))
                },
                "neighborsID": []
            }
        );

        mooeData.mLaneMarks.push(
            {
                "mIsJockeyEndpoint": false,
                "mLaneMarkDescript": "",
                "mLaneMarkEnName": "",
                "mLaneMarkID": indexLength + 17000 + index,
                "mLaneMarkName": "",
                "mLaneMarkType": 11,
                "mLaneMarkWidth": 0.3,
                "mLaneMarkXYZW": {
                    "w": Math.cos(toRadians((values.angle1) / 2)),
                    "x": eighthStackX,
                    "y": eighthStackY,
                    "z": Math.sin(toRadians((values.angle1) / 2))
                },
                "neighborsID": []
            }
        );

        mooeData.mLaneMarks.push(
            {
                "mIsJockeyEndpoint": false,
                "mLaneMarkDescript": "",
                "mLaneMarkEnName": "",
                "mLaneMarkID": indexLength + 18000 + index,
                "mLaneMarkName": "",
                "mLaneMarkType": 11,
                "mLaneMarkWidth": 0.3,
                "mLaneMarkXYZW": {
                    "w": Math.cos(toRadians((values.angle1) / 2)),
                    "x": ninthStackX,
                    "y": ninthStackY,
                    "z": Math.sin(toRadians((values.angle1) / 2))
                },
                "neighborsID": []
            }
        );

        mooeData.mLaneMarks.push(
            {
                "mIsJockeyEndpoint": false,
                "mLaneMarkDescript": "",
                "mLaneMarkEnName": "",
                "mLaneMarkID": indexLength + 3000 + index,
                "mLaneMarkName": "",
                "mLaneMarkType": 11,
                "mLaneMarkWidth": 0.3,
                "mLaneMarkXYZW": {
                    "w": Math.cos(toRadians((values.angle1) / 2)),
                    "x": point.x,
                    "y": point.y,
                    "z": Math.sin(toRadians((values.angle1) / 2))
                },
                "neighborsID": []
            }
        );

        const endPointX = Math.cos((values.angle1) * Math.PI / 180 + Math.PI) * fromStackToEnd + point.x;
        const endPointY = Math.sin((values.angle1) * Math.PI / 180 + Math.PI) * fromStackToEnd + point.y;

        const startPointX = Math.cos((values.angle1) * Math.PI / 180) * distRow + endPointX;
        const startPointY = Math.sin((values.angle1) * Math.PI / 180) * distRow + endPointY;

        roadsDist.map((dist: number, distIndex: number) => {

            const newEndPointX = Math.cos((values.angle1) * Math.PI / 180 + Math.PI) * fromStackToEnd + newPoints[index].x;
            const newEndPointY = Math.sin((values.angle1) * Math.PI / 180 + Math.PI) * fromStackToEnd + newPoints[index].y;

            const newStartPointX = Math.cos((values.angle1) * Math.PI / 180) * dist + newEndPointX;
            const newStartPointY = Math.sin((values.angle1) * Math.PI / 180) * dist + newEndPointY;

            mooeData.mLaneMarks.push(
                {
                    "mIsJockeyEndpoint": false,
                    "mLaneMarkDescript": "",
                    "mLaneMarkEnName": "",
                    "mLaneMarkID": indexLength + 1000 + (distIndex + 1) + index * roadsDist.length,
                    "mLaneMarkName": "",
                    "mLaneMarkType": 0,
                    "mLaneMarkWidth": 0.3,
                    "mLaneMarkXYZW": {
                        "w": Math.cos(toRadians((values.angle1) / 2)),
                        "x": newStartPointX,
                        "y": newStartPointY,
                        "z": Math.sin(toRadians((values.angle1) / 2))
                    },
                    "neighborsID": []
                }
            );

            if (distIndex < roadsDist.length - 1) {

                mooeData.mRoads.push(
                    {
                        "mBelongJunctionID": -1,
                        "mEndPosition": {
                            "x": newEndPointX,
                            "y": newEndPointX,
                            "z": Math.sin(toRadians((values.angle1) / 2))
                        },
                        "mLForbiddenLine": [],
                        "mLForbiddenLineID": -1,
                        "mLaneCount": 2,  //
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
                                "mDirection": 1, // 1
                                "mEndPos": indexLength + 1000 + (distIndex + 2) + index * roadsDist.length,
                                "mGoalAgain": false,
                                "mLaneDescript": "",
                                "mLaneID": indexLength + 500 + (distIndex + 1) + index * roadsDist.length,
                                "mLaneName": "",
                                "mLanePro": 0,
                                "mLaneType": 0,
                                "mLeftAvoidanceArea": 0.1,
                                "mLength": distRow,
                                "mObstacleDistance": 0.1,
                                "mObstacleWidth": 0.1,
                                "mPlannerAgain": false,
                                "mPointOfInterest": [],
                                "mPosID": 0,
                                "mRightAvoidanceArea": 0.1,
                                "mSpeed": 0,
                                "mStartPos": indexLength + 1000 + (distIndex + 1) + index * roadsDist.length,
                                "mWidth": 0.3,
                                "usesensor": {
                                    "fall_arrest_system": true,
                                    "use_bottom_laser": true,
                                    "use_front_realsense": true,
                                    "use_front_realsense_rgb": true
                                }
                            }
                        ],
                        "mLength": distRow,
                        "mRForbiddenLine": [],
                        "mRForbiddenLineID": -1,
                        "mRoadID": indexLength + 5000 + (distIndex + 1) + index * roadsDist.length,
                        "mRoadName": "",
                        "mStartPosition": {
                            "x": newStartPointX,
                            "y": newStartPointY,
                            "z": Math.sin(toRadians((values.angle1) / 2))
                        }
                    }
                );
            }

        });

        if (index !== newPoints.length - 1) {

            const nextEndPointX = Math.cos((values.angle1) * Math.PI / 180 + Math.PI) * fromStackToEnd + newPoints[index + 1].x;
            const nextEndPointY = Math.sin((values.angle1) * Math.PI / 180 + Math.PI) * fromStackToEnd + newPoints[index + 1].y;

            const nextStartPointX = Math.cos((values.angle1) * Math.PI / 180) * distRow + nextEndPointX;
            const nextStartPointY = Math.sin((values.angle1) * Math.PI / 180) * distRow + nextEndPointY;

            mooeData.mRoads.push(
                {
                    "mBelongJunctionID": -1,
                    "mEndPosition": {
                        "x": nextStartPointX,
                        "y": nextStartPointY,
                        "z": Math.sin(toRadians((values.angle1) / 2))
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
                            "mDirection": 1, // 2
                            "mEndPos": indexLength + 1000 + roadsDist.length + index * roadsDist.length,
                            "mGoalAgain": false,
                            "mLaneDescript": "",
                            "mLaneID": indexLength + 100 + index,
                            "mLaneName": "",
                            "mLanePro": 0,
                            "mLaneType": 0,
                            "mLeftAvoidanceArea": 0.1,
                            "mLength": distRow,
                            "mObstacleDistance": 0.1,
                            "mObstacleWidth": 0.1,
                            "mPlannerAgain": false,
                            "mPointOfInterest": [],
                            "mPosID": 0,
                            "mRightAvoidanceArea": 0.1,
                            "mSpeed": 0,
                            "mStartPos": indexLength + 1000 + (roadsDist.length + roadsDist.length) + index * roadsDist.length,
                            "mWidth": 0.3,
                            "usesensor": {
                                "fall_arrest_system": true,
                                "use_bottom_laser": true,
                                "use_front_realsense": true,
                                "use_front_realsense_rgb": true
                            }
                        }
                    ],
                    "mLength": distRow,
                    "mRForbiddenLine": [],
                    "mRForbiddenLineID": -1,
                    "mRoadID": indexLength + 7000 + index,
                    "mRoadName": "",
                    "mStartPosition": {
                        "x": startPointX,
                        "y": startPointY,
                        "z": Math.sin(toRadians((values.angle1) / 2))
                    }
                }
            );
        }

        const targetEndPointX = Math.cos((values.angle1) * Math.PI / 180 + Math.PI) * fromStackToEnd + point.x;
        const targetEndPointY = Math.sin((values.angle1) * Math.PI / 180 + Math.PI) * fromStackToEnd + point.y;

        const targetStartPointX = Math.cos((values.angle1) * Math.PI / 180) * roadsDist[roadsDist.length - 1] + targetEndPointX;
        const targetStartPointY = Math.sin((values.angle1) * Math.PI / 180) * roadsDist[roadsDist.length - 1] + targetEndPointY;

        const leftTargetPointX = Math.cos((values.angle1) * Math.PI / 180 + Math.PI / 2)
            * fromStartToTargetPoint + targetStartPointX;
        const leftTargetPointY = Math.sin((values.angle1) * Math.PI / 180 + Math.PI / 2)
            * fromStartToTargetPoint + targetStartPointY;

        index !== newPoints.length - 1 && mooeData.mLaneMarks.push(
            {
                "mAvoidPointID": null,
                "mBindRoadGroups": [],
                "mID": null,
                "mIsJockeyEndpoint": false,
                "mLaneMarkDescript": "",
                "mLaneMarkEnName": "B303col02row01检",
                "mLaneMarkID": indexLength + 28000 + index,
                "mLaneMarkName": "B303col02row01检",
                "mLaneMarkSize": {
                    "height": 0,
                    "length": 0,
                    "width": 0
                },
                "mLaneMarkType": 2,
                "mLaneMarkWidth": 0.3,
                "mLaneMarkXYZW": {
                    "w": Math.cos(toRadians((values.angle1) / 2) - Math.PI / 4),
                    "x": leftTargetPointX,
                    "y": leftTargetPointY,
                    "z": Math.sin(toRadians((values.angle1) / 2) - Math.PI / 4)
                },
                "mMapName": "",
                "mPrepointID": null,
                "mTaskListName": "",
                "neighborsID": []
            }
        );
    });
}