import Head from "next/head";
import { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from "react";

import { Image } from 'antd/lib';
import Title from "antd/lib/typography/Title";

import dynamic from 'next/dynamic';
import { setOutsideColumn } from "@/modules/zoneData/setOutsideColumn";
import { setSingleInnerColumn } from "@/modules/zoneData/setSingleInnerColumn";
import { setInnerColumnTmp } from "@/modules/zoneData/setInnerColumnTmp";
import { setGatesColumn } from "@/modules/zoneData/setGatesColumn";
import { setInnerGatesColumn } from "@/modules/zoneData/setInnerGatesColumn";


const DownloadBtn = dynamic(() => import("./components/DownloadBtn/DownloadBtn"), { ssr: false });

const LoadingBlock = dynamic(() => import("./components/LoadingBlock/LoadingBlock"), { ssr: false });

const UploadForm = dynamic(() => import("./components/UploadForm/UploadForm"), { ssr: false });

const MapPartData = dynamic(() => import("./components/MapPartData/MapPartData"), { ssr: false });

const ModelBlock = dynamic(() => import("./components/ModelBlock/ModelBlock"), { ssr: false });

const DrawerBlock = dynamic(() => import("./components/DrawerBlock/DrawerBlock"), { ssr: false });


export default function Home() {

  const [time, setTime] = useState([0, 0]);

  const [href, setHref] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const [isMessageShow, setIsMessageShow] = useState<boolean>(false);

  const [mooeData, setMooeData] = useState(null);

  const [columnSide, setColumnSide] = useState(1);

  const [numColumn, setNumColumn] = useState(1);

  const [zoneType, setZoneType] = useState(1);

  const [numBlock, setNumBlock] = useState<number>(1);

  const [formValues, setFormValues] = useState(null);

  const [history, setHistory] = useState<any[]>([]);

  const [historyIndex, setHistoryIndex] = useState<number>(0);






  const refInputFiles = useRef(null);

  const refTime = useRef([0, 0]);

  const refFileName = useRef<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const changeDock = () => {
    if (zoneType === 1 && numColumn === 1 && columnSide === 1 && mooeData) {
      setOutsideColumn(formValues, mooeData, (mooeData as any).mLaneMarks.length, numBlock);
    }

    if (zoneType === 1 && numColumn === 1 && columnSide === 2 && mooeData) {
      setSingleInnerColumn(formValues, mooeData, (mooeData as any).mLaneMarks.length);
    }

    if (zoneType === 1 && numColumn === 2 && mooeData) {
      setOutsideColumn(formValues, mooeData, (mooeData as any).mLaneMarks.length, numBlock);
      setInnerColumnTmp(formValues, mooeData, (mooeData as any).mLaneMarks.length + 1000);
    }

    if (zoneType === 2 && mooeData && columnSide === 1) {
      setGatesColumn(formValues, mooeData, (mooeData as any).mLaneMarks.length);
    }

    if (zoneType === 2 && mooeData && columnSide === 2) {
      setInnerGatesColumn(formValues, mooeData, (mooeData as any).mLaneMarks.length);
    }

    const dock = JSON.parse(JSON.stringify(mooeData));

    setMooeData(dock);

    setHistory(arr => [...arr, dock]);

    setHistoryIndex(history.length);

    setNumBlock((num: number) => ++num);
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {

    changeDock();

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  useEffect(() => {
    if (mooeData) {
      const newDock = JSON.stringify(mooeData);

      const file = new Blob([newDock as unknown as string], { type: 'application/mooe' });
      const url = URL.createObjectURL(file);

      setHref(url);
    }
  }, [mooeData]);

  const readFile = useCallback((evt: ChangeEvent<HTMLInputElement>) => {

    if (!evt.target.files) return;

    if (evt.target.files[0].name.split(".").at(-1) !== "mooe") {
      setIsMessageShow(true);
      return
    };

    setLoading(true);

    const file = evt.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);

    refFileName.current = file.name;

    reader.onload = async () => {

      setMooeData(JSON.parse(reader.result as string));

      setHistory(arr => [...arr, JSON.parse(reader.result as string)]);

      setHistoryIndex(history.length);

      setHref(null);

      setLoading(false);

    };

    reader.onerror = () => {
      console.error(reader.error);
    };

  }, [refFileName.current]);

  const restFiles = useCallback((evt: FormEvent<HTMLFormElement>) => {
    setHref(null);
    setIsMessageShow(false);
    evt.currentTarget.reset();
    refFileName.current = null;
    setTime([0, 0]);
    refTime.current = [0, 0];
  }, [refFileName.current]);

  return (
    <>
      <Head>
        <title>Map generator</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={"main-container"}>
        <Image className={"mainImg"} preview={false} src="img/svg/ak.svg"></Image>
        <Title className={"h1"}><span className={"titleBlock"}><span>Генератор</span><span>.mooe</span></span></Title>
        <main className={"main-block"}>

          <UploadForm
            loading={loading}
            refFileName={refFileName}
            refInputFiles={refInputFiles}
            restFiles={restFiles}
            readFile={readFile}
          />

          {isMessageShow && <p className={"message"}>Необходим файл с расширением .mooe!</p>}

          {loading && <LoadingBlock time={time} />}

          <DownloadBtn href={href} />

          {/* {
            href && <div>
              <Title style={{ fontSize: "30px" }} className={"h2"}>Общее время генерации</Title>
              <div className={"counter"}>
                <span style={{ color: "rgba(0, 0, 0, 0.88)" }}>{time[0]}</span>
                <span> - мин. : </span>
                <span style={{ color: "rgba(0, 0, 0, 0.88)" }}>{time[1]}</span>
                <span> - сек.</span>
              </div>
            </div>
          } */}

          <MapPartData
            mooeData={mooeData}
            zoneType={zoneType}
            numColumn={numColumn}
            columnSide={columnSide}
            setColumnSide={setColumnSide}
            setNumColumn={setNumColumn}
            setZoneType={setZoneType}
            setFormValues={setFormValues}
            showModal={showModal}
          />

          <ModelBlock handleOk={handleOk} handleCancel={handleCancel} isModalOpen={isModalOpen} />

          <DrawerBlock
            history={history}
            historyIndex={historyIndex}
            setHistoryIndex={setHistoryIndex}
            setMooeData={setMooeData}
            setHref={setHref}
          />

        </main>
      </div>
    </>
  );
}
