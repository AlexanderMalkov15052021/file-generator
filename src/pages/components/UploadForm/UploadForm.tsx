import { GeneratorStor } from "@/entities";
import { observer } from "mobx-react-lite";
import { ChangeEvent, FormEvent } from "react";

const UploadForm = observer(() => {

    const {
        store: { isLoading, refFileName, setIsMessageShow, setIsLoading, setMooeDoc, changeHistory, setLoadingTime, setRefFileName },
    } = GeneratorStor;

    const readFile = (evt: ChangeEvent<HTMLInputElement>) => {

        if (!evt.target.files) return;

        if (evt.target.files[0].name.split(".").at(-1) !== "mooe") {
            setIsMessageShow(true);
            return
        };

        setIsLoading(true);

        const file = evt.target.files[0];
        const reader = new FileReader();
        reader.readAsText(file);

        setRefFileName(file.name);

        reader.onload = async () => {

            setMooeDoc(JSON.parse(reader.result as string));

            changeHistory(JSON.parse(reader.result as string));

            setIsLoading(false);

        };

        reader.onerror = () => {
            console.error(reader.error);
        };

    }

    const restFiles = (evt: FormEvent<HTMLFormElement>) => {
        setIsMessageShow(false);
        evt.currentTarget.reset();
        setRefFileName(null);
        setLoadingTime([0, 0]);
    }


    return <>
        <form onClick={isLoading ? evt => evt.preventDefault() : restFiles}>
            <label htmlFor="file-upload" className={isLoading ? "disabledUpload custom-file-upload" : "custom-file-upload"}>
                {refFileName ? refFileName : "Выберите файл .mooe"}
            </label>
            <input id="file-upload" type="file" onChange={isLoading ? evt => evt.preventDefault() : readFile} />
        </form>
    </>
});

export default UploadForm;