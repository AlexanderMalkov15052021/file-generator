import Head from "next/head";

import { Image } from 'antd/lib';
import Title from "antd/lib/typography/Title";

import DrawerBlock from "./components/DrawerBlock/DrawerBlock";
import TypeErrorMessage from "./components/TypeErrorMessage/TypeErrorMessage";
import UploadForm from "./components/UploadForm/UploadForm";
import LoadingBlock from "./components/LoadingBlock/LoadingBlock";
import DownloadBtn from "./components/DownloadBtn/DownloadBtn";
import MapPartData from "./components/MapPartData/MapPartData";
import ModelBlock from "./components/ModelBlock/ModelBlock";

export default function Home() {

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

          <UploadForm />

          <TypeErrorMessage />

          <LoadingBlock />

          <DownloadBtn />

          <MapPartData />

          <ModelBlock />

          <DrawerBlock />

        </main>
      </div>
    </>
  );
}
