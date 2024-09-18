import { GeneratorStor } from "@/entities";
import { Image, Modal } from "antd/lib";
import { observer } from "mobx-react-lite";

const FirstPointMessageBlock = observer(() => {

    const {
        store: { isShownFirstPointMessage, changeShowFirstPointMessage },
    } = GeneratorStor;

    const handleOk = () => {
        changeShowFirstPointMessage(false);
    };

    const handleCancel = () => changeShowFirstPointMessage(false);;

    return (<>
        <Modal
            okText={"Ok"}
            title={"Пример первой точки"}
            open={isShownFirstPointMessage}
            onOk={handleOk}
            onCancel={handleCancel}
            cancelButtonProps={{ style: { display: 'none' } }}
        >
            <Image src={"./img/png/first-point.png"}></Image>
        </Modal>
    </>)
});

export default FirstPointMessageBlock;