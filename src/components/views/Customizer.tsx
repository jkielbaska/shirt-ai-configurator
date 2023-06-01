"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";
import { config } from "@/config/config";
import { state } from "@/store";
import { download } from "@/assets";
import { downloadCanvasToImage, reader } from "@/config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "@/config/constants";
import { fadeAnimation, slideAnimation } from "@/config/motion";
import { AIPicker } from "@/components/AIPicker";
import { ColorPicker } from "@/components/ColorPicker";
import { FilePicker } from "@/components/FilePicker";
import { Tab } from "@/components/Tab";
import { CustomButton } from "@/components/CustomButton";
import { tDecalTypes, tTabs } from "@/types/tConstants";
import { initialFilterTab, tActiveFilterTab } from "@/types/tTabs";
import { tState } from "@/types/tState";

export default function Customizer() {
  const snap = useSnapshot(state);

  const [file, setFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState<any>("");
  const [generatingImg, setGeneratingImg] = useState<any>("");
  const [activeEditorTab, setActiveEditorTab] = useState<any>("");
  const [activeFilterTab, setActiveFilterTab] =
    useState<tActiveFilterTab>(initialFilterTab);

  //show tab content depending on the active tab - switch/case needs to go.
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
      case "aipicker":
        return (
          <AIPicker
            prompt={prompt}
            setPrompt={setPrompt}
            generatingImg={generatingImg}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  const handleSubmit = async () => {
    if (!prompt) return alert("Please enter a prompt");
    try {
      //backend call
    } catch (error) {
      alert(error);
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab("");
    }
  };

  const handleDecals = (result: tDecalTypes, type: string) => {
    const decalType = DecalTypes[type as keyof typeof DecalTypes];

    state[decalType.stateProperty as keyof tState] = result;

    if (!activeFilterTab[decalType.filterTab as keyof tActiveFilterTab]) {
      handleActiveFilterTab(decalType.filterTab as keyof tActiveFilterTab);
    }
  };

  const handleActiveFilterTab = (tabName: keyof tActiveFilterTab) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    //after state, activeFilterTab needs to be updated
    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName],
      };
    });
  };

  const readFile = (type: string) => {
    reader(file).then((result) => {
      handleDecals(result, type);
      setActiveEditorTab("");
    });
  };

  return (
    <>
      <AnimatePresence>
        {!snap.intro && (
          <>
            <motion.div
              key="custom"
              className="absolute top-0 left-0 z-10"
              {...slideAnimation("left")}
            >
              <div className="flex items-center min-h-screen">
                <div className="editortabs-container tabs">
                  {EditorTabs.map((tab, i) => (
                    <Tab
                      key={tab.name}
                      tab={tab}
                      handleClick={() => setActiveEditorTab(tab.name)}
                    ></Tab>
                  ))}

                  {generateTabContent()}
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute z-10 top-5 right-5"
              {...fadeAnimation}
            >
              <CustomButton
                type="filled"
                title="Go Back"
                handleClick={() => (state.intro = true)}
                customStyles="w-fit px-4 py-2.4 font-bold text-sm"
              />
            </motion.div>

            <motion.div
              className="filtertabs-container"
              {...slideAnimation("up")}
            >
              {FilterTabs.map((tab: tTabs, i) => (
                <Tab
                  key={tab.name}
                  tab={tab}
                  isFilterTab
                  isActiveTab={
                    activeFilterTab[tab.name as keyof tActiveFilterTab]
                  }
                  handleClick={() =>
                    handleActiveFilterTab(tab.name as keyof tActiveFilterTab)
                  }
                ></Tab>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
