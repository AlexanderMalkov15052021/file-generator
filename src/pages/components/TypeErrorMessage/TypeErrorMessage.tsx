import { GeneratorStor } from "@/entities";
import { observer } from "mobx-react-lite";

const TypeErrorMessage = () => {

    const {
        store: { isMessageShow },
    } = GeneratorStor;

    return isMessageShow && <p className={"message"}>Необходим файл с расширением .mooe!</p>
}

export default observer(TypeErrorMessage);
