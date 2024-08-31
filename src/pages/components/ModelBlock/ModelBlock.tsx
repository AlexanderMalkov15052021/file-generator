import { Modal } from "antd";
import { memo } from "react";

type Props = {
    handleOk: any;
    handleCancel: any
    isModalOpen: any
}

const ModelBlock = ({ handleOk, handleCancel, isModalOpen }: Props) => {
    return (<>
        <Modal
            cancelText={"Отменить"}
            okText={"Принять"}
            title={"Добавление данных в документ..."}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <p>Принять изменения?</p>
        </Modal>
    </>)
}

export default memo(ModelBlock);
