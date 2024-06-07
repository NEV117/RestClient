/* eslint-disable prettier/prettier */
"use client";

import { Input } from "@nextui-org/input";
import {
  Button,
  Card,
  CardBody,
  Select,
  SelectItem,
  Tab,
  Tabs,
} from "@nextui-org/react";
import CodeMirror from "@uiw/react-codemirror";
import { useTheme } from "next-themes";
import { githubLight, githubDark } from "@uiw/codemirror-theme-github";
import { javascript } from "@codemirror/lang-javascript";
import { SetStateAction, useState } from "react";

import { Params } from "./Params/Params";
import { Headers } from "./Headers/Headers";
import { Response } from "./Response/Response";
import { Auth } from "./Auth/Auth";

import { HttpMethod, ParamRow, httpMethodColors, httpMethods, jsonString } from "@/types";
import { CheckIcon } from "@/public/svg/cheackbox";

export const HttpRequestForm = () => {
  const { theme } = useTheme();
  const Theme2 = theme === "dark" ? githubDark : githubLight;  
  const [activeTabs, setActiveTabs] = useState(["params"]);
  const [paramsData, setParamsData] = useState<ParamRow[]>([{
    id: "1",
    key: "",
    value: "",
    description: ""
  }]);
  const [paramsDataBackup, setParamsDataBackup] = useState<ParamRow[]>([]);

  const handleParamsChange = (updatedParams: SetStateAction<{ id: string; key: string; value: string; description: string; }[]>) => {
    setParamsData(updatedParams);
  };

  const paramsFilled = paramsData.some(param => param.key !== "" || param.value !== "" || param.description !== "");
  
  const toggleTab = (tabKey: string) => {
    setActiveTabs(prevTabs => {
      if (prevTabs.includes(tabKey)) {
        return prevTabs.filter(key => key !== tabKey);
      } else {
        return [...prevTabs, tabKey];
      }
    });
  };

  const isTabActive = (tabKey: string) => {
    return activeTabs.includes(tabKey);
  };

  if (isTabActive("params") && paramsDataBackup.length > 0) {
    setParamsData(paramsDataBackup);
    setParamsDataBackup([]);
  }

  return (
    <>
      <div className="flex flex-row items-center justify-center gap-3">
        <Input
          isClearable
          classNames={{
            label: "text-black/50 dark:text-white/90",
            input: [
              "bg-transparent",
              "text-black/90 dark:text-white/90",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
            ],
            innerWrapper: ["bg-transparent"],
            inputWrapper: [
              "bg-default-200/50",
              "dark:bg-default/60",
              "backdrop-blur-xl",
              "backdrop-saturate-200",
              "hover:bg-default-200/70",
              "dark:hover:bg-default/70",
              "group-data-[focus=true]:bg-default-200/50",
              "dark:group-data-[focus=true]:bg-default/60",
              "!cursor-text",
              "!min-h-[56px]",
              "pl-0",
            ],
          }}
          label=""
          placeholder="https://example.dev:port/api/books/"
          radius="lg"
          startContent={
            <>
              <Select
                classNames={{
                  label: "group-data-[filled=true]:-translate-y-5 pt-2",
                  base: ["w-[150px]", "pl-0"],
                  innerWrapper: ["!pl-0", "!pt-0"],
                  trigger: ["pt-2"],
                  value: ["pt-3"],
                }}
                defaultSelectedKeys={["GET"]}
                label="Method"
              >
                {httpMethods.map((httpMethod) => (
                  <SelectItem
                    key={httpMethod.key}
                    color={httpMethodColors[httpMethod.key as HttpMethod]}
                  >
                    {httpMethod.label}
                  </SelectItem>
                ))}
              </Select>
            </>
          }
        />

        <Button className="h-[56px]" color="primary">
          SEND
        </Button>
      </div>
      <div className="flex w-full flex-col pt-2">
        <Tabs aria-label="Options">
        <Tab
            key="params"
            title={
              <div className="flex flex-row items-center gap-1">
                <p>Params</p>
                {paramsFilled && activeTabs.includes("params") && <CheckIcon color="success" size={8} />}
              </div>
            }
            onClick={() => toggleTab("params")}
          >
            <Card>
              <CardBody className="max-h-[450px]">
              <Params data={paramsData} onParamsChange={handleParamsChange} />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="authorization" title="Authorization" 
            onClick={() => toggleTab("authorization")}>
            <Card>
              <CardBody>
                <Auth/>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="headers" title="Headers" 
            onClick={() => toggleTab("headers")}>
            <Card>
              <CardBody>
                <Headers />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="body" title="Body" 
            onClick={() => toggleTab("body")}>
            <Card>
              <CardBody>
                <div
                  style={{
                    borderRadius: "10px",
                    overflow: "hidden",
                    minHeight: "238px",
                    maxHeight: "238px",
                  }}
                >
                  <CodeMirror
                    extensions={[javascript({ jsx: true })]}
                    height="238px"
                    theme={Theme2}
                    value={jsonString}
                  />
                </div>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
      <div>
        <h1 className="pb-2">Response:</h1>
        <Card>
          <CardBody>
            <Response />
          </CardBody>
        </Card>
      </div>
    </>
  );
};
