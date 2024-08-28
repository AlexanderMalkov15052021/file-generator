import { memo, useState } from "react";

import type { FormProps } from 'antd';
import { Button, Form, Input, Radio } from 'antd';
import Title from "antd/es/typography/Title";

import styles from "./MapPartData.module.css";
import { RadioChangeEvent } from "antd/lib";

import {
    BoxPlotTwoTone,
    ProfileTwoTone
} from '@ant-design/icons';

const newPoints: { x: number; y: number; }[] = [];

type FieldType = {
    x1: number;
    y1: number;
    angle1: number;
    x2: number;
    y2: number;
    angle2: number;
    numRow: number;
    rowsInterval: number;
};

const toRadians = (angle: number) => angle * (Math.PI / 180);

const getRoundedNumber = (value: number, rounding: number) => Math.round(value * rounding) / rounding;

const getDistancePoints = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
}

const pointToLine = (x1: number, y1: number, x2: number, y2: number, distance: number) => {
    const Rab = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const k = distance / Rab;
    const Xc = getRoundedNumber(Number(x1) + Number(x2 - x1) * k, 1000);
    const Yc = getRoundedNumber(Number(y1) + Number(y2 - y1) * k, 1000);

    return { x: Xc, y: Yc };
}

type Props = {
    mooeData: any;
    setDoc: any;
}

const MapPartData = ({ mooeData, setDoc }: Props) => {
    const [roadDir1, setRoadDir1] = useState(1);
    const [roadDir2, setRoadDir2] = useState(1);
    const [numColumn, setNumColumn] = useState(1);
    const [zoneType, setZoneType] = useState(1);

    const onChangeRoadDir1 = (evt: RadioChangeEvent) => {
        setRoadDir1(evt.target.value);
    };
    const onChangeRoadDir2 = (evt: RadioChangeEvent) => {
        setRoadDir2(evt.target.value);
    };
    const onChangeNumColumn = (evt: RadioChangeEvent) => {
        setNumColumn(evt.target.value);
    };
    const onChangeZoneType = (evt: RadioChangeEvent) => {
        setZoneType(evt.target.value);
    };

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {

        const distBetweenPoints = getDistancePoints(values.x1, values.y1, values.x2, values.y2);

        const dist = values.numRow <= 2
            ? getRoundedNumber(distBetweenPoints, 1000)
            : getRoundedNumber(distBetweenPoints / (values.numRow - 1), 1000);

        if (values.numRow > 2) {

            for (let i = 0; i < values.numRow - 2; i++) {
                newPoints.push(pointToLine(values.x1, values.y1, values.x2, values.y2, dist * (i + 1)));
            }

            newPoints.push(
                { x: Number(values.x1), y: Number(values.y1) },
                { x: Number(values.x2), y: Number(values.y2) }
            );
        }
        else {
            newPoints.push(
                { x: Number(values.x1), y: Number(values.y1) },
                { x: Number(values.x2), y: Number(values.y2) }
            );
        }

        newPoints.map((point: any, index: number) => {
            mooeData.mLaneMarks.push(
                {
                    "mIsJockeyEndpoint": false,
                    "mLaneMarkDescript": "",
                    "mLaneMarkEnName": "",
                    "mLaneMarkID": 653825 + 100 + index,
                    "mLaneMarkName": "",
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
        });

        setDoc(mooeData);

    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (<>
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className={styles["form"]}
        >
            <div className={styles["form-block"]}>


                <div className={styles["form-item"]}>
                    <Title className={styles["item-title"]} level={4}>Общие данные</Title>
                    <div className={styles["form-item-block"]}>
                        <div style={{ display: "flex", alignItems: "flex-start", flexDirection: "column" }}>
                            <Title level={5}>Количество колонн:</Title>

                            <Radio.Group onChange={onChangeNumColumn} value={numColumn} className={styles["common-radio-group"]}>
                                <Radio value={1}>Одна</Radio>
                                <Radio value={2}>Две</Radio>
                            </Radio.Group>
                        </div>

                        <Title level={5}>Количество рядов:</Title>

                        <Form.Item<FieldType>
                            label={<ProfileTwoTone style={{ fontSize: '32px' }} />}
                            name="numRow"
                            rules={[{ required: true, message: 'Пожалуйста, введите количество рядов!' }]}
                            className={styles["input-wrapper"]}
                        >
                            <Input type="number" autoComplete="on" />
                        </Form.Item>

                        <Title level={5}>Расстояние между рядами:</Title>
                        <Form.Item<FieldType>
                            label={<BoxPlotTwoTone style={{ fontSize: '32px' }} />}
                            name="rowsInterval"
                            rules={[{ required: true, message: 'Пожалуйста, введите расстояние между рядами!' }]}
                            className={styles["input-wrapper"]}
                        >
                            <Input type="number" autoComplete="on" />
                        </Form.Item>

                        <div style={{ display: "flex", alignItems: "flex-start", flexDirection: "column" }}>
                            <Title level={5}>Тип зоны:</Title>

                            <Radio.Group onChange={onChangeZoneType} value={zoneType} className={styles["common-radio-group"]}>
                                <Radio value={1}>Ворота</Radio>
                                <Radio value={2}>Буквы</Radio>
                            </Radio.Group>
                        </div>

                    </div>
                </div>


                <div className={styles["form-item"]}>
                    <Title className={styles["item-title"]} level={4}>Начальная точка</Title>
                    <div className={styles["form-item-block"]}>
                        <Title level={5}>Координаты:</Title>

                        <Form.Item<FieldType>
                            label="X"
                            name="x1"
                            rules={[{ required: true, message: 'Пожалуйста, введите "x" координату первой точки!' }]}
                            className={styles["input-wrapper"]}
                        >
                            <Input type="number" autoComplete="on" />
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="Y"
                            name="y1"
                            rules={[{ required: true, message: 'Пожалуйста, введите "x" координату первой точки!' }]}
                            className={styles["input-wrapper"]}
                        >
                            <Input type="number" autoComplete="on" />
                        </Form.Item>

                        <Title level={5}>Угол поворота:</Title>

                        <Form.Item<FieldType>
                            label="Ѳ"
                            name="angle1"
                            rules={[{ required: true, message: 'Пожалуйста, введите угол поворота первой точки!' }]}
                            className={styles["input-wrapper"]}
                        >
                            <Input type="number" autoComplete="on" />
                        </Form.Item>
                    </div>
                </div>

                <div className={styles["form-item"]}>
                    <Title className={styles["item-title"]} level={4}>Конечная точка</Title>
                    <div className={styles["form-item-block"]}>
                        <Title level={5}>Координаты:</Title>

                        <Form.Item<FieldType>
                            label="X"
                            name="x2"
                            rules={[{ required: true, message: 'Пожалуйста, введите "x" координату второй точки!' }]}
                            className={styles["input-wrapper"]}
                        >
                            <Input type="number" autoComplete="on" />
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="Y"
                            name="y2"
                            rules={[{ required: true, message: 'Пожалуйста, введите "x" координату второй точки!' }]}
                            className={styles["input-wrapper"]}
                        >
                            <Input type="number" autoComplete="on" />
                        </Form.Item>

                        <Title level={5}>Угол поворота:</Title>

                        <Form.Item<FieldType>
                            label="Ѳ"
                            name="angle2"
                            rules={[{ required: true, message: 'Пожалуйста, введите угол поворота второй точки!' }]}
                            className={styles["input-wrapper"]}
                        >
                            <Input type="number" autoComplete="on" />
                        </Form.Item>
                    </div>
                </div>

                <div className={styles["form-item"]}>
                    <Title className={styles["item-title"]} level={4}>Направления дорог</Title>

                    <div className={styles["form-item-block"]}>
                        <Title level={5}>Главная дорога 1:</Title>

                        <Radio.Group onChange={onChangeRoadDir1} value={roadDir1} className={styles["radio-group"]}>
                            <Radio value={1}>Прямое</Radio>
                            <Radio value={2}>Обратное</Radio>
                            <Radio value={3}>Двунаправленное</Radio>
                        </Radio.Group>
                    </div>

                    <div className={styles["form-item-block"]}>
                        <Title level={5}>Главная дорога 2:</Title>

                        <Radio.Group onChange={onChangeRoadDir2} value={roadDir2} className={styles["radio-group"]}>
                            <Radio value={1}>Прямое</Radio>
                            <Radio value={2}>Обратное</Radio>
                            <Radio value={3}>Двунаправленное</Radio>
                        </Radio.Group>
                    </div>

                </div>

            </div>


            <Form.Item wrapperCol={{ offset: 8, span: 16 }} className={styles["submit-btn"]}>
                <Button type="primary" htmlType="submit">
                    Применить
                </Button>
            </Form.Item>
        </Form>
    </>)
}

export default memo(MapPartData);