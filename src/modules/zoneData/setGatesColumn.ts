import { getDistancePoints, getRoundedNumber, pointToLine, toRadians } from "@/helpers/math";
import { MooeData } from "@/types";

const distBetweenStackAndCachePoint = 0.15;

const fromStartToTargetPoint = 0.4;  // от начала до точки заезда

const fromStackToFirstCachePoint = 1.35 + distBetweenStackAndCachePoint;

const fromStackToSecomdCachePoint = 2.7 + distBetweenStackAndCachePoint;

const fromStackToTothirdCachePoint = 4.05 + distBetweenStackAndCachePoint;

const fromStackToFourthCachePoint = 5.4 + distBetweenStackAndCachePoint;

const fromStackToFifthCachePoint = 6.75 + distBetweenStackAndCachePoint;

const fromStackToSixthCachePoint = 8.1 + distBetweenStackAndCachePoint;

const fromStackToSeventhCachePoint = 9.45 + distBetweenStackAndCachePoint;

const fromStackToEighthCachePoint = 10.8 + distBetweenStackAndCachePoint;

const fromStackToNinthCachePoint = 12.3;


const fromStackToSecomdStack = 1.35;

const fromStackTothirdStack = 2.7;

const fromStackFourthStack = 4.05;

const fromStackFifthStack = 5.4;

const fromStackSixthStack = 6.75;

const fromStackSeventhStack = 8.1;

const fromStackEighthStack = 9.45;

const fromStackNinthStack = 10.8;

const fromStackToEnd = 0.16;  // от палеты до края

const distRow = 14;  // длинна ряда

export const setGatesColumn = (values: any, mooeData: MooeData, indexLength: number) => {

    // console.log(getDistancePoints(
    //     -27.558,
    //     -136.08,
    //     -27.158,
    //     -136.08
    // ));

    // console.log(getDistancePoints(
    //     -28.558,
    //     -136.07,
    //     -28.158,
    //     -136.07
    // ));


    const newPoints: { x: number; y: number; }[] = [];

    const distBetweenPoints = getDistancePoints(
        Number(values.x1) + Number(values.columnsInterval),
        values.y1,
        Number(values.x2) + Number(values.columnsInterval),
        values.y2
    );

    const dist = values.numRow <= 2
        ? getRoundedNumber(distBetweenPoints, 1000)
        : getRoundedNumber(distBetweenPoints / (values.numRow - 1), 1000);

    if (values.numRow > 2) {

        newPoints.push({ x: Number(values.x1) + Number(values.columnsInterval), y: Number(values.y1) });

        for (let i = 0; i < values.numRow - 2; i++) {
            newPoints.push(pointToLine(
                Number(values.x1) + Number(values.columnsInterval),
                values.y1, Number(values.x2) + Number(values.columnsInterval),
                values.y2, dist * (i + 1))
            );
        }

        newPoints.push({ x: Number(values.x2) + Number(values.columnsInterval), y: Number(values.y2) });
    }
    else {
        newPoints.push(
            { x: Number(values.x1) + Number(values.columnsInterval), y: Number(values.y1) },
            { x: Number(values.x2) + Number(values.columnsInterval), y: Number(values.y2) }
        );
    }


    // -26,714; -149,79
    // -35,698; -149,74


    newPoints.map((point: any, index: number) => {

        const endPointX = Math.cos((values.angle1) * Math.PI / 180 + Math.PI) * fromStackToEnd + point.x;
        const endPointY = Math.sin((values.angle1) * Math.PI / 180 + Math.PI) * fromStackToEnd + point.y;

        const startPointX = Math.cos((values.angle1) * Math.PI / 180) * distRow + endPointX;
        const startPointY = Math.sin((values.angle1) * Math.PI / 180) * distRow + endPointY;

        const secomdStackX = Math.cos((values.angle1) * Math.PI / 180) * fromStackToSecomdStack + point.x;
        const secomdStackY = Math.sin((values.angle1) * Math.PI / 180) * fromStackToSecomdStack + point.y;

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

        const secomdCachePointX = Math.cos((values.angle1) * Math.PI / 180) * fromStackToSecomdCachePoint + point.x;
        const secomdCachePointY = Math.sin((values.angle1) * Math.PI / 180) * fromStackToSecomdCachePoint + point.y;

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
                "mLaneMarkID": indexLength + 1000 + index,
                "mLaneMarkName": "",
                "mLaneMarkType": 0,
                "mLaneMarkWidth": 0.3,
                "mLaneMarkXYZW": {
                    "w": Math.cos(toRadians((values.angle1) / 2)),
                    "x": startPointX,
                    "y": startPointY,
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
                "mLaneMarkID": indexLength + 2000 + index,
                "mLaneMarkName": "",
                "mLaneMarkType": 0,
                "mLaneMarkWidth": 0.3,
                "mLaneMarkXYZW": {
                    "w": Math.cos(toRadians((values.angle1) / 2)),
                    "x": endPointX,
                    "y": endPointY,
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
                    "x": secomdCachePointX,
                    "y": secomdCachePointY,
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
                    "x": secomdStackX,
                    "y": secomdStackY,
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






        mooeData.mRoads.push(
            {
                "mBelongJunctionID": -1,
                "mEndPosition": {
                    "x": endPointX,
                    "y": endPointY,
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
                        "mDirection": 2,
                        "mEndPos": indexLength + 2000 + index,
                        "mGoalAgain": false,
                        "mLaneDescript": "",
                        "mLaneID": indexLength + 500 + index,
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
                "mLength": distRow,
                "mRForbiddenLine": [],
                "mRForbiddenLineID": -1,
                "mRoadID": indexLength + 5000 + index,
                "mRoadName": "",
                "mStartPosition": {
                    "x": startPointX,
                    "y": startPointY,
                    "z": Math.sin(toRadians((values.angle1) / 2))
                }
            }
        );


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
                            "mDirection": 2,
                            "mEndPos": indexLength + 1000 + index + 1,
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

        const leftTargetPointX = Math.cos((values.angle1) * Math.PI / 180 + Math.PI / 2)
            * fromStartToTargetPoint + startPointX;
        const leftTargetPointY = Math.sin((values.angle1) * Math.PI / 180 + Math.PI / 2)
            * fromStartToTargetPoint + startPointY;

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
                    "w": Math.cos(toRadians((values.angle1) / 2)),
                    "x": leftTargetPointX,
                    "y": leftTargetPointY,
                    "z": Math.sin(toRadians((values.angle1) / 2))
                },
                "mMapName": "",
                "mPrepointID": null,
                "mTaskListName": "",
                "neighborsID": []
            }
        );

    });
}