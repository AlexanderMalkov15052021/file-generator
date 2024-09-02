import type { FormProps } from 'antd/lib';
import { Button, Form, Input, Radio } from 'antd/lib';
import Title from 'antd/lib/typography/Title';

import styles from "./MapPartData.module.css";
import { RadioChangeEvent } from "antd/lib";

import { BoxPlotTwoTone, ProfileTwoTone } from '@ant-design/icons';
import { FieldType } from "@/types";
import { GeneratorStor } from "@/entities";
import { observer } from "mobx-react-lite";

export const MapPartData = observer(() => {

    const {
        store: {
            mooeDoc, numColumn, zoneType, columnSide, setNumColumn, setFormValues,
            setZoneType, setColumnSide, setIsModalOpen
        },
    } = GeneratorStor;

    const onChangeNumColumn = (evt: RadioChangeEvent) => setNumColumn(evt.target.value);

    const onChangeColumnSide = (evt: RadioChangeEvent) => {
        setColumnSide(evt.target.value);
    };
    const onChangeZoneType = (evt: RadioChangeEvent) => {
        setZoneType(evt.target.value);
    };

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        setFormValues(values);
        setIsModalOpen(true);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
        setFormValues(null);
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

                        <Title level={5}>{zoneType === 1 ? "Количество рядов:" : "Количество колонн:"}</Title>

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
                    <Title className={styles["item-title"]} level={4}>{zoneType === 1 ? "Колонны" : "Ряды:"}</Title>
                    <div className={styles["form-item-block"]}>

                        {zoneType === 1 && <div style={{ display: "flex", alignItems: "flex-start", flexDirection: "column" }}>
                            <Title level={5}>Количество колонн:</Title>

                            <Radio.Group onChange={onChangeNumColumn} value={numColumn} className={styles["common-radio-group"]}>
                                <Radio value={1}>Одна</Radio>
                                <Radio value={2}>Две</Radio>
                            </Radio.Group>
                        </div>}

                        {zoneType === 1 && numColumn === 1 &&
                            <div style={{ display: "flex", alignItems: "flex-start", flexDirection: "column" }}>
                                <Title level={5}>Сторона колонны:</Title>

                                <Radio.Group onChange={onChangeColumnSide} value={columnSide} className={styles["common-radio-group"]}>
                                    <Radio value={1}>Внешняя</Radio>
                                    <Radio value={2}>Внутренняя</Radio>
                                </Radio.Group>
                            </div>
                        }

                        {zoneType === 2 && <div style={{ display: "flex", alignItems: "flex-start", flexDirection: "column" }}>
                            <Title level={5}>Сторона ряда:</Title>

                            <Radio.Group onChange={onChangeColumnSide} value={columnSide} className={styles["common-radio-group"]}>
                                <Radio value={1}>Внешняя</Radio>
                                <Radio value={2}>Внутренняя</Radio>
                            </Radio.Group>
                        </div>}

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
                            rules={[{ required: true, message: 'Пожалуйста, введите "y" координату первой точки!' }]}
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
                            rules={[{ required: true, message: 'Пожалуйста, введите "y" координату второй точки!' }]}
                            className={styles["input-wrapper"]}
                        >
                            <Input type="number" autoComplete="on" />
                        </Form.Item>

                    </div>
                </div>

                <div className={styles["form-item"]}>
                    <Title className={styles["item-title"]} level={4}>Характеристики</Title>
                    <div className={styles["form-item-block"]}>
                        <Title level={5}>Угол поворота:</Title>

                        <Form.Item<FieldType>
                            label="Ѳ"
                            name="angle"
                            rules={[{ required: true, message: 'Пожалуйста, введите угол поворота!' }]}
                            className={styles["input-wrapper"]}
                        >
                            <Input max={180} min={-180} step={0.1} type="number" autoComplete="on" />
                        </Form.Item>

                        {zoneType === 1 && numColumn === 2 && <div>
                            <Title level={5}>Расстояние между колоннами:</Title>

                            <Form.Item<FieldType>
                                label={<BoxPlotTwoTone style={{ fontSize: '32px' }} />}
                                name="columnsInterval"
                                rules={[{ required: true, message: 'Пожалуйста, введите расстояние между колоннами!' }]}
                                className={styles["input-wrapper"]}
                            >
                                <Input type="number" autoComplete="on" />
                            </Form.Item>
                        </div>}

                    </div>
                </div>
            </div>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }} className={styles["submit-btn"]}>
                <Button disabled={!mooeDoc ? true : false} type="primary" htmlType="submit">
                    Применить
                </Button>
            </Form.Item>

        </Form>
    </>)
});