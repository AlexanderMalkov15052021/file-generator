import { GeneratorStor } from "@/entities";
import { Modal, Spin } from "antd/lib";
import { observer } from "mobx-react-lite";

const ModelBlock = observer(() => {

    const {
        store: { isModalOpen, isLoadingDocChange, setIsModalOpen, changeDoc, setIsLoadingDocChangen },
    } = GeneratorStor;

    const handleOk = () => {
        setIsLoadingDocChangen(true)
        setTimeout(() => setChangeDoc(), 250);
    };

    const setChangeDoc = () => {
        setIsLoadingDocChangen(false);
        setIsModalOpen(false);
        console.time("Generate cell");
        changeDoc();
        console.timeEnd("Generate cell");
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
            <span style={{ fontSize: 20, margin: "20px" }}>Принять изменения?</span>
            {isLoadingDocChange && <Spin />}
        </Modal>
    </>)
});

export default ModelBlock;