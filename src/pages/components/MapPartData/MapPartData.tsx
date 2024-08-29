import { memo, useState } from "react";

import type { FormProps } from 'antd';
import { Button, Form, Input, Radio } from 'antd';
import Title from "antd/es/typography/Title";

import styles from "./MapPartData.module.css";
import { RadioChangeEvent } from "antd/lib";

import { BoxPlotTwoTone, ProfileTwoTone } from '@ant-design/icons';
import { FieldType } from "@/types";
import { setGatesColumn } from "@/modules/zoneData/setGatesColumn";
import { setOutsideColumn } from "@/modules/zoneData/setOutsideColumn";
import { setInnerColumn } from "@/modules/zoneData/setInnerColumn";

type Props = {
    mooeData: any;
    setDoc: any;
}

const MapPartData = ({ mooeData, setDoc }: Props) => {
    const [roadDir1, setRoadDir1] = useState(1);
    const [roadDir2, setRoadDir2] = useState(1);
    const [columnSide, setColumnSide] = useState(1);
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
    const onChangeColumnSide = (evt: RadioChangeEvent) => {
        setColumnSide(evt.target.value);
    };
    const onChangeZoneType = (evt: RadioChangeEvent) => {
        setZoneType(evt.target.value);
    };

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {

        if (zoneType === 1 && numColumn === 1) {
            setOutsideColumn(values, mooeData, mooeData.mLaneMarks.length);
        }

        if (zoneType === 1 && numColumn === 2) {
            setOutsideColumn(values, mooeData, mooeData.mLaneMarks.length);
            setInnerColumn(values, mooeData, mooeData.mLaneMarks.length + 1000);
        }

        if (zoneType === 2) {
            setGatesColumn(values, mooeData, mooeData.mLaneMarks.length);
        }

        const dock = JSON.parse(JSON.stringify(mooeData));

        setDoc(dock);

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

                        <Title level={5}>Количество рядов:</Title>

                        <Form.Item<FieldType>
                            label={<ProfileTwoTone style={{ fontSize: '32px' }} />}
                            name="numRow"
                            rules={[{ required: true, message: 'Пожалуйста, введите количество рядов!' }]}
                            className={styles["input-wrapper"]}
                        >
                            <Input type="number" autoComplete="on" />
                        </Form.Item>

                        <div style={{ display: "flex", alignItems: "flex-start", flexDirection: "column" }}>
                            <Title level={5}>Тип зоны:</Title>

                            <Radio.Group onChange={onChangeZoneType} value={zoneType} className={styles["common-radio-group"]}>
                                <Radio value={1}>Буквы</Radio>
                                <Radio value={2}>Ворота</Radio>
                            </Radio.Group>
                        </div>

                    </div>
                </div>

                <div className={styles["form-item"]}>
                    <Title className={styles["item-title"]} level={4}>Колонны</Title>
                    <div className={styles["form-item-block"]}>

                        <div style={{ display: "flex", alignItems: "flex-start", flexDirection: "column" }}>
                            <Title level={5}>Количество колонн:</Title>

                            <Radio.Group onChange={onChangeNumColumn} value={numColumn} className={styles["common-radio-group"]}>
                                <Radio value={1}>Одна</Radio>
                                <Radio value={2}>Две</Radio>
                            </Radio.Group>
                        </div>

                        <div style={{ display: "flex", alignItems: "flex-start", flexDirection: "column" }}>
                            <Title level={5}>Сторона колонны:</Title>

                            <Radio.Group onChange={onChangeColumnSide} value={columnSide} className={styles["common-radio-group"]}>
                                <Radio value={1}>Внешняя</Radio>
                                <Radio value={2}>Внутренняя</Radio>
                            </Radio.Group>
                        </div>

                        <Title level={5}>Расстояние между колоннами:</Title>
                        <Form.Item<FieldType>
                            label={<BoxPlotTwoTone style={{ fontSize: '32px' }} />}
                            name="columnsInterval"
                            rules={[{ required: true, message: 'Пожалуйста, введите расстояние между колоннами!' }]}
                            className={styles["input-wrapper"]}
                        >
                            <Input type="number" autoComplete="on" />
                        </Form.Item>

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

                        {/* <Title level={5}>Угол поворота:</Title>

                        <Form.Item<FieldType>
                            label="Ѳ"
                            name="angle2"
                            rules={[{ required: true, message: 'Пожалуйста, введите угол поворота второй точки!' }]}
                            className={styles["input-wrapper"]}
                        >
                            <Input type="number" autoComplete="on" />
                        </Form.Item> */}
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
                <Button disabled={!mooeData ? true : false} type="primary" htmlType="submit">
                    Применить
                </Button>
            </Form.Item>
        </Form>
    </>)
}

export default memo(MapPartData);