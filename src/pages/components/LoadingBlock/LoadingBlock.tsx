import { GeneratorStor } from "@/entities";
import { Spin } from "antd";
import { observer } from "mobx-react-lite";

const LoadingBlock = () => {
    const {
        store: { isLoading, loadingTime },
    } = GeneratorStor;

    return (
        isLoading && <>
            <p className={"converting"}>Конвертирование файла...</p>
            <div className={"counter"}>
                <span style={{ color: "rgba(0, 0, 0, 0.88)" }}>{loadingTime && loadingTime[0]}</span>
                <span> - мин. : </span>
                <span style={{ color: "rgba(0, 0, 0, 0.88)" }}>{loadingTime && loadingTime[1]}</span>
                <span> - сек.</span>
            </div>
            <Spin />
        </>
    );
}

export default observer(LoadingBlock);