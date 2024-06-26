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

import {
  AuthData,
  HeaderRow,
  HttpMethod,
  ParamRow,
  ResponseState,
  httpMethodColors,
  httpMethods,
} from "@/types";
import { CheckIcon } from "@/public/svg/cheackbox";
import { makeHttpRequest } from "@/actions";

export const HttpRequestForm = () => {
  const { theme } = useTheme();
  const Theme2 = theme === "dark" ? githubDark : githubLight;
  const [paramsData, setParamsData] = useState<ParamRow[]>([
    {
      id: "1",
      key: "",
      value: "",
      description: "",
    },
  ]);
  const [headersData, setHeadersData] = useState<HeaderRow[]>([
    {
      id: "1",
      key: "Content-Type",
      value: "application/json",
      description:
        "recomended default header in case you're goint to mak http request",
    },
  ]);

  const [authData, setAuthData] = useState<AuthData>({
    authType: "",
    username: "",
    password: "",
    token: "",
  });

  const [jsonData, setJsonData] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ResponseState>(null);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState<string>("GET");

  const handleMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMethod = e.target.value;

    setMethod(selectedMethod);
  };

  const paramsFilled = paramsData.some(
    (param) =>
      param.key !== "" || param.value !== "" || param.description !== ""
  );

  const headersFilled = headersData.some(
    (header) =>
      header.key !== "" || header.value !== "" || header.description !== ""
  );

  const authFieldsFilled =
    (authData.authType === "basic_auth" &&
      (authData.username !== "" || authData.password !== "")) ||
    (authData.authType === "bearer_token" && authData.token !== "");

  const handleParamsChange = (
    updatedParams: SetStateAction<
      { id: string; key: string; value: string; description: string }[]
    >
  ) => {
    setParamsData(updatedParams);
  };

  const handleHeadersChange = (
    updatedHeaders: SetStateAction<
      { id: string; key: string; value: string; description: string }[]
    >
  ) => {
    setHeadersData(updatedHeaders);
  };

  const handleAuthChange = (
    updatedAuth: SetStateAction<{
      authType: string;
      username: string;
      password: string;
      token: string;
    }>
  ) => {
    setAuthData(updatedAuth);
  };

  const handleCodeMirrorChange = (value: string) => {
    setJsonData(value); // Actualiza jsonString con el nuevo valor
  };

  const handleSend = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);
    if (!url) {
      setLoading(false);

      return;
    }

    try {
      const startTime = Date.now();
      const data: any = await makeHttpRequest(
        url,
        method,
        paramsData,
        headersData,
        jsonData,
        authData
      );

      const endTime = Date.now();

      setResponse({
        data: data.data,
        status: data.status,
        time: endTime - startTime,
        size: new Blob([JSON.stringify(data)]).size / 1024,
        headers:  data.headers,
      });
    } catch (error: any) {
      setError(error.toString());
    } finally {
      setLoading(false);
    }
  };

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
                onChange={handleMethodChange}
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
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onClear={() => setUrl("")}
        />

        <Button
          className="h-[56px]"
          color="primary"
          disabled={loading}
          onClick={handleSend}
        >
          {loading ? "Sending..." : "SEND"}
        </Button>
      </div>
      <div className="flex w-full flex-col pt-2">
        <Tabs aria-label="Options">
          <Tab
            key="params"
            title={
              <div className="flex flex-row items-center gap-1">
                <p>Params</p>
                {paramsFilled && <CheckIcon color="success" size={8} />}
              </div>
            }
          >
            <Card>
              <CardBody className="max-h-[450px]">
                <Params data={paramsData} onParamsChange={handleParamsChange} />
              </CardBody>
            </Card>
          </Tab>
          <Tab
            key="authorization"
            title={
              <div className="flex flex-row items-center gap-1">
                <p>Authorization</p>
                {authFieldsFilled && <CheckIcon color="success" size={8} />}
              </div>
            }
          >
            <Card>
              <CardBody>
                <Auth data={authData} onParamsChange={handleAuthChange} />
              </CardBody>
            </Card>
          </Tab>
          <Tab
            key="headers"
            title={
              <div className="flex flex-row items-center gap-1">
                <p>Headers</p>
                {headersFilled && <CheckIcon color="success" size={8} />}
              </div>
            }
          >
            <Card>
              <CardBody className="max-h-[450px]">
                <Headers
                  data={headersData}
                  onHeadersChange={handleHeadersChange}
                />
              </CardBody>
            </Card>
          </Tab>
          <Tab
            key="body"
            title={
              <div className="flex flex-row items-center gap-1">
                <p>Body</p>
                {jsonData && <CheckIcon color="success" size={8} />}
              </div>
            }
          >
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
                    value={jsonData}
                    onChange={handleCodeMirrorChange}
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
            <Response
              data={response?.data}
              headers={response?.headers}
              loading={loading}
              size={response?.size}
              status={response?.status}
              time={response?.time}
            />
            {error && <div className="text-red-500">{error}</div>}
          </CardBody>
        </Card>
      </div>
    </>
  );
};
