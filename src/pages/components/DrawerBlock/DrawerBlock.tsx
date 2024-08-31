import { memo, useState } from "react";
import { Button, Drawer } from 'antd';
import { LeftCircleTwoTone, MenuOutlined, RightCircleTwoTone } from "@ant-design/icons";

type Props = {
    history: any[];
    historyIndex: number;
    setHistoryIndex: any;
    setMooeData: any;
    setHref: any;
}

const DrawerBlock = ({ history, historyIndex, setHistoryIndex, setMooeData }: Props) => {

    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const onLeftClick = () => {

        if (historyIndex > 0) {


            const dock = JSON.parse(JSON.stringify(history[historyIndex - 1]));

            setMooeData(dock);

            setHistoryIndex(historyIndex - 1);

            console.log("Back history!");

        }


    }
    const onRightClick = () => {

        if (historyIndex <= history.length - 2) {

            const dock = JSON.parse(JSON.stringify(history[historyIndex + 1]));

            setMooeData(dock);

            setHistoryIndex(historyIndex + 1);

            console.log("forward history!");

        }


    }

    return (<>
        <Button style={{ width: "40px", height: "40px", position: "absolute", left: 20, top: 20 }} type="primary" onClick={showDrawer}>
            <MenuOutlined style={{ fontSize: "20px" }} />
        </Button>

        <Drawer title="Меню" onClose={onClose} open={open}>
            <p>История</p>
            <Button onClick={onLeftClick} style={{ height: "50px" }}>
                <LeftCircleTwoTone style={{ fontSize: "40px" }} />
            </Button>
            <Button onClick={onRightClick} style={{ height: "50px", marginLeft: "20px" }}>
                <RightCircleTwoTone style={{ fontSize: "40px" }} />
            </Button>
        </Drawer>
    </>)
}

export default memo(DrawerBlock);
