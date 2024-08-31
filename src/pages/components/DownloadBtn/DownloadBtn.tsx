import { GeneratorStor } from "@/entities";
import { Button } from "antd";
import Link from "antd/lib/typography/Link";
import { observer } from "mobx-react-lite";

const DownloadBtn = () => {
    const {
        store: { href },
    } = GeneratorStor;

    return <>
        <Button className="buttun-upload" disabled={href ? false : true} type={"primary"}>
            <Link
                href={`${href ? href : ""}`} download={"test.mooe"}
            >
                Скачать .mooe
            </Link>
        </Button>
    </>
}

export default observer(DownloadBtn);