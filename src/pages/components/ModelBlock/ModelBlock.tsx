import { GeneratorStor } from "@/entities";
import { Modal } from "antd/lib";
import { observer } from "mobx-react-lite";

export const ModelBlock = observer(() => {

    const {
        store: { isModalOpen, setIsModalOpen, changeDoc },
    } = GeneratorStor;

    const handleOk = () => {
        changeDoc();
        setIsModalOpen(false);
    };

    const handleCancel = () => setIsModalOpen(false);


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
});