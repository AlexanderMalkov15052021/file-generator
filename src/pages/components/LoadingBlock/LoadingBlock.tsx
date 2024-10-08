import { GeneratorStor } from "@/entities";
import { Spin } from "antd/lib";
import { observer } from "mobx-react-lite";

const LoadingBlock = observer(() => {
    const {
        store: { isLoading },
    } = GeneratorStor;

    return (
        isLoading && <>
            {/* <p className={"converting"}>Конвертирование файла...</p>
            <div className={"counter"}>
                <span style={{ color: "rgba(0, 0, 0, 0.88)" }}>{loadingTime && loadingTime[0]}</span>
                <span> - мин. : </span>
                <span style={{ color: "rgba(0, 0, 0, 0.88)" }}>{loadingTime && loadingTime[1]}</span>
                <span> - сек.</span>
            </div> */}
            <Spin size="large" style={{ position: "absolute", top: "32%" }} />
        </>
    );
});

export default LoadingBlock;
