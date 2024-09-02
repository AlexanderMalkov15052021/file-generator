import { GeneratorStor } from "@/entities";
import { Button } from "antd/lib";
import Link from "antd/lib/typography/Link";
import { observer } from "mobx-react-lite";

const DownloadBtn = observer(() => {
    const {
        store: { href },
    } = GeneratorStor;

    return <>
        <Button className="buttun-upload" disabled={href ? false : true} type={"primary"}>
            <Link
                href={`${href ? href : ""}`} download={"domodedovo.mooe"}
            >
                Скачать .mooe
            </Link>
        </Button>
    </>
});

export default DownloadBtn;