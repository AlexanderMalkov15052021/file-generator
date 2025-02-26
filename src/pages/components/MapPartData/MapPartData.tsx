import type { FormProps } from 'antd/lib';
import { Button, Form, Input, message, Radio, Tooltip } from 'antd/lib';
import Title from 'antd/lib/typography/Title';

import styles from "./MapPartData.module.css";
import { RadioChangeEvent } from "antd/lib";

import { BoxPlotTwoTone, EditTwoTone, ProfileTwoTone } from '@ant-design/icons';
import { FieldType } from "@/types";
import { GeneratorStor } from "@/entities";
import { observer } from "mobx-react-lite";
import { FormEvent, useEffect } from 'react';
import { getBlockNames } from '@/helpers';

const MapPartData = observer(() => {

    const {
        store: {
            mooeDoc, numColumn, zoneType, cellSide, dirRoad, lastStreamNum, lastFlowNum, namingOrder, blockNumMessageData,
            setNumColumn, setFormValues, setBlockNumMessageData,
            setZoneType, setCellSide, setIsModalOpen, setDirRoad, setLastStreamNum, changeShowFirstPointMessage,
            changeShowSecondPointMessage, setNamingOrder, setLastFlowNum
        },
    } = GeneratorStor;

    const [messageApi, contextHolder] = message.useMessage();

    const warning = () => {
        messageApi.open({
            type: 'warning',
            content: blockNumMessageData.reduce((accum, str) => `${accum} ${str}... `, ""),
            className: styles.warningMessage
        });
    };

    const [form] = Form.useForm();

    useEffect(() => {
        zoneType === 1 && form.setFieldsValue({ cellNum: lastStreamNum });
        zoneType === 2 && form.setFieldsValue({ cellNum: lastFlowNum });
    }, [lastStreamNum, lastFlowNum]);

    useEffect(() => {
        blockNumMessageData.length && warning();
    }, [blockNumMessageData]);

    const onChangeNumColumn = (evt: RadioChangeEvent) => setNumColumn(evt.target.value);

    const onChangeCellSide = (evt: RadioChangeEvent) => {
        setCellSide(evt.target.value);
    };
    const onChangeZoneType = (evt: RadioChangeEvent) => {
        setZoneType(evt.target.value);
    };
    const onChangeNamingOrder = (evt: RadioChangeEvent) => {
        setNamingOrder(evt.target.value);
    };
    const onChangeDirRoad = (evt: RadioChangeEvent) => {
        setDirRoad(evt.target.value);
    };

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        setFormValues(values);
        setIsModalOpen(true);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
        setFormValues(null);
    };

    const onChangeCellNum = (evt: any) => {
        zoneType === 1 && setLastStreamNum(evt.target.value);
        zoneType === 2 && setLastFlowNum(evt.target.value);
    }

    const showFirstPointMessage = () => {
        changeShowFirstPointMessage(true);
    }

    const showSecondPointMessage = () => {
        changeShowSecondPointMessage(true);
    }

    const onChangeX1 = (evt: FormEvent<HTMLInputElement>) => form.setFieldValue('x1', evt.currentTarget.value);
    const onChangeY1 = (evt: FormEvent<HTMLInputElement>) => form.setFieldValue('y1', evt.currentTarget.value);
    const onChangeX2 = (evt: FormEvent<HTMLInputElement>) => form.setFieldValue('x2', evt.currentTarget.value);
    const onChangeY2 = (evt: FormEvent<HTMLInputElement>) => form.setFieldValue('y2', evt.currentTarget.value);

    const onChangeNumOuterAlley = (evt: FormEvent<HTMLInputElement>) => {
        form.setFieldValue('numOuterAlley', evt.currentTarget.value);

        const blockNames = getBlockNames(mooeDoc);

        if (blockNames[evt.currentTarget.value]) {
            setBlockNumMessageData(blockNames[evt.currentTarget.value]);
        }

    }
    const onChangeNumInnerAlley = (evt: FormEvent<HTMLInputElement>) => form.setFieldValue('numInnerAlley', evt.currentTarget.value);
    const onChangeNumOuterColumn = (evt: FormEvent<HTMLInputElement>) => form.setFieldValue('numOuterColumn', evt.currentTarget.value);
    const onChangeNumInnerColumn = (evt: FormEvent<HTMLInputElement>) => form.setFieldValue('numInnerColumn', evt.currentTarget.value);

    return (<>
        {contextHolder}
        <div style={{ position: "absolute", left: 0, top: "50px", margin: "20px", marginTop: "30px" }}>
            <div className={styles["form-item"]}>
                <Title className={styles["item-title"]} level={4}>Данные по аллеям и ручьям</Title>
                <div className={styles["form-item-block"]}>

                    <p><span>Крайний номер аллеи: </span><span>{lastStreamNum}</span></p>
                    <p><span>Крайний номер ручья: </span><span>{lastFlowNum}</span></p>

                </div>
            </div>
        </div>
        <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ cellNum: lastStreamNum }}
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
                                <Radio value={1}>Аллеи</Radio>
                                <Radio value={2}>Ручьи</Radio>
                            </Radio.Group>
                        </div>

                        <div style={{ display: "flex", alignItems: "flex-start", flexDirection: "column" }}>
                            <Title level={5}>{zoneType === 1 ? "Наименование рядов:" : "Наименование колон:"}</Title>

                            <Radio.Group onChange={onChangeNamingOrder} value={namingOrder} className={styles["common-radio-group"]}>
                                <Radio value={1}>Прямое</Radio>
                                <Radio value={2}>Обратное</Radio>
                            </Radio.Group>
                        </div>

                    </div>
                </div>

                <div className={styles["form-item"]}>
                    <Title className={styles["item-title"]} level={4}>{zoneType === 1 ? "Аллеи" : "Ряды:"}</Title>
                    <div className={styles["form-item-block"]}>

                        {zoneType === 1 && <div style={{ display: "flex", alignItems: "flex-start", flexDirection: "column" }}>
                            <Title level={5}>Количество аллей:</Title>

                            <Radio.Group onChange={onChangeNumColumn} value={numColumn} className={styles["common-radio-group"]}>
                                <Radio value={1}>Одна</Radio>
                                <Radio value={2}>Две</Radio>
                            </Radio.Group>
                        </div>}

                        {zoneType === 1 && numColumn === 1 &&
                            <div style={{ display: "flex", alignItems: "flex-start", flexDirection: "column" }}>
                                <Title level={5}>Сторона колонны:</Title>

                                <Radio.Group onChange={onChangeCellSide} value={cellSide} className={styles["common-radio-group"]}>
                                    <Radio value={1}>Внешняя</Radio>
                                    <Radio value={2}>Внутренняя</Radio>
                                </Radio.Group>
                            </div>
                        }

                        {zoneType === 2 && <div style={{ display: "flex", alignItems: "flex-start", flexDirection: "column" }}>
                            <Title level={5}>Сторона ручья:</Title>

                            <Radio.Group onChange={onChangeCellSide} value={cellSide} className={styles["common-radio-group"]}>
                                <Radio value={1}>Внешняя</Radio>
                                <Radio value={2}>Внутренняя</Radio>
                            </Radio.Group>
                        </div>}

                        {zoneType === 1 && numColumn === 2 && <div>
                            <Title level={5}>Расстояние между аллеями:</Title>

                            <Form.Item<FieldType>
                                label={<BoxPlotTwoTone style={{ fontSize: '32px' }} />}
                                name="columnsInterval"
                                rules={[{ required: true, message: 'Пожалуйста, введите расстояние между аллеями!' }]}

                                className={styles["input-wrapper"]}
                            >
                                <Input type="number" autoComplete="on" />
                            </Form.Item>
                        </div>}

                        {zoneType === 2 && <div>
                            <Title level={5}>Крайний номер ручья</Title>

                            <Form.Item<FieldType>
                                label={<EditTwoTone style={{ fontSize: '32px' }} />}
                                name="cellNum"
                                rules={
                                    [{
                                        required: true,
                                        message: `Пожалуйста, введите крайний номер ручья!`
                                    }]
                                }
                                className={styles["input-wrapper"]}
                            >
                                <Input onChange={onChangeCellNum} type="number" autoComplete="on" />
                            </Form.Item>
                        </div>}

                        <div>
                            <Title level={5}>Название файла:</Title>

                            <Form.Item<FieldType>
                                label={<EditTwoTone style={{ fontSize: '32px' }} />}
                                name="fileName"
                                initialValue={"example"}
                                rules={[
                                    {
                                        required: true,
                                        pattern: new RegExp(
                                            /[a-zA-Z]/g
                                        ),
                                        message: 'Пожалуйста, введите название файла!'
                                    }
                                ]}
                                className={styles["input-wrapper"]}
                            >
                                <Input autoComplete="on" />
                            </Form.Item>
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
                            <Tooltip
                                zIndex={0}
                                trigger={['click']}
                                title={
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <div>Левая нижняя точка, относительно конечной точки, на координатной плоскости!</div>
                                        <Button onClick={showFirstPointMessage} style={{ margin: "10px" }}>Подсказка</Button>
                                    </div>
                                }
                                placement="top"
                            >
                                <Input onChange={onChangeX1} type="number" autoComplete="on" />
                            </Tooltip>
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="Y"
                            name="y1"
                            rules={[{ required: true, message: 'Пожалуйста, введите "y" координату первой точки!' }]}
                            className={styles["input-wrapper"]}
                        >
                            <Tooltip
                                zIndex={0}
                                trigger={['click']}
                                title={
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <div>Левая нижняя точка, относительно конечной точки, на координатной плоскости!</div>
                                        <Button onClick={showFirstPointMessage} style={{ margin: "10px" }}>Подсказка</Button>
                                    </div>
                                }
                                placement="top"
                            >
                                <Input onChange={onChangeY1} type="number" autoComplete="on" />
                            </Tooltip>
                        </Form.Item>







                        {zoneType === 1 && numColumn === 1 && cellSide === 1 && <div>
                            <Title level={5}>Номер внешней аллеи</Title>

                            <Form.Item<FieldType>
                                label={<EditTwoTone style={{ fontSize: '32px' }} />}
                                name="numOuterAlley"
                                rules={
                                    [{
                                        required: true,
                                        message: `Пожалуйста, введите номер внешней аллеи!`
                                    }]
                                }
                                className={styles["input-wrapper"]}
                            >
                                <Input min={0} onChange={onChangeNumOuterAlley} type="number" autoComplete="on" />
                            </Form.Item>
                        </div>}


                        {zoneType === 1 && numColumn === 2 && <div>
                            <Title level={5}>Номер внешней аллеи</Title>

                            <Form.Item<FieldType>
                                label={<EditTwoTone style={{ fontSize: '32px' }} />}
                                name="numOuterAlley"
                                rules={
                                    [{
                                        required: true,
                                        message: `Пожалуйста, введите номер внешней аллеи!`
                                    }]
                                }
                                className={styles["input-wrapper"]}
                            >
                                <Input min={0} onChange={onChangeNumOuterAlley} type="number" autoComplete="on" />
                            </Form.Item>
                        </div>}


                        {zoneType === 1 && numColumn === 1 && cellSide === 1 && <div>
                            <Title level={5}>Номер внешней колонны</Title>

                            <Form.Item<FieldType>
                                label={<EditTwoTone style={{ fontSize: '32px' }} />}
                                name="numOuterColumn"
                                rules={
                                    [{
                                        required: true,
                                        message: `Пожалуйста, введите номер внешней колонны!`
                                    }]
                                }
                                className={styles["input-wrapper"]}
                            >
                                <Input min={0} onChange={onChangeNumOuterColumn} type="number" autoComplete="on" />
                            </Form.Item>
                        </div>}

                        {zoneType === 1 && numColumn === 2 && <div>
                            <Title level={5}>Номер внешней колонны</Title>

                            <Form.Item<FieldType>
                                label={<EditTwoTone style={{ fontSize: '32px' }} />}
                                name="numOuterColumn"
                                rules={
                                    [{
                                        required: true,
                                        message: `Пожалуйста, введите номер внешней колонны!`
                                    }]
                                }
                                className={styles["input-wrapper"]}
                            >
                                <Input min={0} onChange={onChangeNumOuterColumn} type="number" autoComplete="on" />
                            </Form.Item>
                        </div>}






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
                            <Tooltip
                                zIndex={0}
                                trigger={['click']}
                                title={
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <div>Левая верхняя точка, относительно начальной точки, на координатной плоскости!</div>
                                        <Button onClick={showSecondPointMessage} style={{ margin: "10px" }}>Подсказка</Button>
                                    </div>
                                }
                                placement="top"
                            >
                                <Input onChange={onChangeX2} type="number" autoComplete="on" />
                            </Tooltip>
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="Y"
                            name="y2"
                            rules={[{ required: true, message: 'Пожалуйста, введите "y" координату второй точки!' }]}
                            className={styles["input-wrapper"]}
                        >
                            <Tooltip
                                zIndex={0}
                                trigger={['click']}
                                title={
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <div>Левая верхняя точка, относительно начальной точки, на координатной плоскости!</div>
                                        <Button onClick={showSecondPointMessage} style={{ margin: "10px" }}>Подсказка</Button>
                                    </div>
                                }
                                placement="top"
                            >
                                <Input onChange={onChangeY2} type="number" autoComplete="on" />
                            </Tooltip>
                        </Form.Item>





                        {zoneType === 1 && numColumn === 1 && cellSide === 2 && <div>
                            <Title level={5}>Номер внутренней аллеи</Title>

                            <Form.Item<FieldType>
                                label={<EditTwoTone style={{ fontSize: '32px' }} />}
                                name="numInnerAlley"
                                rules={
                                    [{
                                        required: true,
                                        message: `Пожалуйста, введите номер внутренней алле!`
                                    }]
                                }
                                className={styles["input-wrapper"]}
                            >
                                <Input min={0} onChange={onChangeNumInnerAlley} type="number" autoComplete="on" />
                            </Form.Item>
                        </div>}

                        {zoneType === 1 && numColumn === 2 && <div>
                            <Title level={5}>Номер внутренней аллеи</Title>

                            <Form.Item<FieldType>
                                label={<EditTwoTone style={{ fontSize: '32px' }} />}
                                name="numInnerAlley"
                                rules={
                                    [{
                                        required: true,
                                        message: `Пожалуйста, введите номер внутренней аллеи!`
                                    }]
                                }
                                className={styles["input-wrapper"]}
                            >
                                <Input min={0} onChange={onChangeNumInnerAlley} type="number" autoComplete="on" />
                            </Form.Item>
                        </div>}





                        {zoneType === 1 && numColumn === 1 && cellSide === 2 && <div>
                            <Title level={5}>Номер внутренней колонны</Title>

                            <Form.Item<FieldType>
                                label={<EditTwoTone style={{ fontSize: '32px' }} />}
                                name="numInnerColumn"
                                rules={
                                    [{
                                        required: true,
                                        message: `Пожалуйста, введите номер внутренней колонны!`
                                    }]
                                }
                                className={styles["input-wrapper"]}
                            >
                                <Input min={0} onChange={onChangeNumInnerColumn} type="number" autoComplete="on" />
                            </Form.Item>
                        </div>}



                        {zoneType === 1 && numColumn === 2 && <div>
                            <Title level={5}>Номер внутренней колонны</Title>

                            <Form.Item<FieldType>
                                label={<EditTwoTone style={{ fontSize: '32px' }} />}
                                name="numInnerColumn"
                                rules={
                                    [{
                                        required: true,
                                        message: `Пожалуйста, введите номер внутренней колонны!`
                                    }]
                                }
                                className={styles["input-wrapper"]}
                            >
                                <Input min={0} onChange={onChangeNumInnerColumn} type="number" autoComplete="on" />
                            </Form.Item>
                        </div>}





                    </div>
                </div>

                <div className={styles["form-item"]}>
                    <Title className={styles["item-title"]} level={4}>{zoneType === 1 ? "Настройки аллеи" : "Настройки ручья"}</Title>
                    <div className={styles["form-item-block"]}>

                        <div style={{ display: "flex", alignItems: "flex-start", flexDirection: "column" }}>
                            <Title level={5}>{zoneType === 1 ? "Направление колонны:" : "Направление ряда:"}</Title>

                            <Radio.Group onChange={onChangeDirRoad} value={dirRoad} className={styles["common-radio-group"]}>
                                <Radio value={1}>Прямое</Radio>
                                <Radio value={2}>Обратное</Radio>
                            </Radio.Group>
                        </div>

                        {zoneType === 1 && <div>
                            <Title level={5}>Начальная буква аллеи:</Title>

                            <Form.Item<FieldType>
                                label={<EditTwoTone style={{ fontSize: '32px' }} />}
                                name="alleySymbol"
                                rules={[
                                    {
                                        required: true,
                                        pattern: new RegExp(
                                            /[a-zA-Z]/g
                                        ),
                                        message: 'Пожалуйста, введите начальную букву аллеи!'
                                    }
                                ]}
                                className={styles["input-wrapper"]}
                            >
                                <Input autoComplete="on" />
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

export default MapPartData;
