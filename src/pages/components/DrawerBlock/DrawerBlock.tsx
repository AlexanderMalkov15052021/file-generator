import { Button, Drawer } from 'antd/lib';
import { LeftCircleTwoTone, MenuOutlined, RightCircleTwoTone } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { GeneratorStor } from "@/entities";


export const DrawerBlock = observer(() => {

    const {
        store: { history, historyIndex, isOpenDrawer, changeHistoryIndex, setMooeDoc, setIsOpenDrawer },
    } = GeneratorStor;

    const showDrawer = () => {
        setIsOpenDrawer(true);
    };

    const onClose = () => {
        setIsOpenDrawer(false);
    };

    const onLeftClick = () => {

        if (historyIndex > 0) {


            const dock = JSON.parse(JSON.stringify(history[historyIndex - 1]));

            setMooeDoc(dock);

            changeHistoryIndex(historyIndex - 1);

            console.log("Back history!");

        }


    }
    const onRightClick = () => {

        if (historyIndex <= history.length - 2) {

            const dock = JSON.parse(JSON.stringify(history[historyIndex + 1]));

            setMooeDoc(dock);

            changeHistoryIndex(historyIndex + 1);

            console.log("forward history!");

        }


    }

    return (<>
        <Button style={{ width: "40px", height: "40px", position: "absolute", left: 20, top: 20 }} type="primary" onClick={showDrawer}>
            <MenuOutlined style={{ fontSize: "20px" }} />
        </Button>

        <Drawer title="Меню" onClose={onClose} open={isOpenDrawer}>
            <p>История</p>
            <Button onClick={onLeftClick} style={{ height: "50px" }}>
                <LeftCircleTwoTone style={{ fontSize: "40px" }} />
            </Button>
            <Button onClick={onRightClick} style={{ height: "50px", marginLeft: "20px" }}>
                <RightCircleTwoTone style={{ fontSize: "40px" }} />
            </Button>
        </Drawer>
    </>)
});
