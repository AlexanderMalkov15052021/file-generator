import { GeneratorStor } from "@/entities";
import { Image, Modal } from "antd/lib";
import { observer } from "mobx-react-lite";

const SecondPointMessageBlock = observer(() => {

    const {
        store: { isShownSecondPointMessage, changeShowSecondPointMessage },
    } = GeneratorStor;

    const handleOk = () => {
        changeShowSecondPointMessage(false);
    };

    const handleCancel = () => changeShowSecondPointMessage(false);;

    return (<>
        <Modal
            okText={"Ok"}
            title={"Пример второй точки"}
            open={isShownSecondPointMessage}
            onOk={handleOk}
            onCancel={handleCancel}
            cancelButtonProps={{ style: { display: 'none' } }}
        >
            <Image src={"./img/png/second-point.png"}></Image>
        </Modal>
    </>)
});

export default SecondPointMessageBlock;