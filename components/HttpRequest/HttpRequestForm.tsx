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
import { Params } from "./Params/Params";
export const httpMethods = [
  { key: "GET", label: "GET" },
  { key: "POST", label: "POST" },
  { key: "PUT", label: "PUT" },
  { key: "PATCH", label: "PATCH" },
  { key: "DELETE", label: "DELETE" },
  { key: "HEAD", label: "HEAD" },
  { key: "OPTIONS", label: "OPTIONS" },
];

/* // Mapeo de métodos HTTP a colores
const httpMethodColors = {
  GET: "success",
  POST: "warning",
  PUT: "info",
  PATCH: "info",
  DELETE: "danger",
  HEAD: "default",
  OPTIONS: "default",
}; */

const jsonObject = {
  date: "2024-04-10",
  hour: "09:00 AM",
  serviceId: 1,
  barberId: 1,
  barberShopNit: "Mario's",
};
const jsonString = JSON.stringify(jsonObject, null, 2);

type SelectItemColor =
  | "success"
  | "warning"
  | "danger"
  | "default"
  | "primary"
  | "secondary";
type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "HEAD"
  | "OPTIONS";
// Mapeo de métodos HTTP a colores
const httpMethodColors: Record<HttpMethod, SelectItemColor> = {
  GET: "success",
  POST: "warning",
  PUT: "primary",
  PATCH: "secondary",
  DELETE: "danger",
  HEAD: "primary",
  OPTIONS: "secondary",
};

export const HttpRequestForm = () => {
  const { theme } = useTheme();
  const Theme2 = theme === "dark" ? githubDark : githubLight;

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
                  label: "group-data-[filled=true]:-translate-y-5",
                  base: ["w-[150px]", "pl-0"],
                  innerWrapper: ["!pl-0", "!pt-0"],
                  trigger: ["pt-2"],
                  label: ["pt-2"],
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

        <Button className="h-[56px]" color="primary" >
          SEND
        </Button>
      </div>
      <div className="flex w-full flex-col pt-2">
        <Tabs aria-label="Options">
          <Tab key="params" title="Params">
            <Card>
              <CardBody className="max-h-[450px]">
                <Params/>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="authorization" title="Authorization">
            <Card>
              <CardBody>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur.
              </CardBody>
            </Card>
          </Tab>
          <Tab key="headers" title="Headers">
            <Card>
              <CardBody>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
              </CardBody>
            </Card>
          </Tab>
          <Tab key="body" title="Body">
            <Card>
              <CardBody>
                <div style={{ borderRadius: "10px", overflow: "hidden" }}>
                  <CodeMirror
                    extensions={[javascript({ jsx: true })]}
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
            <div style={{ borderRadius: "10px", overflow: "hidden" }}>
              <CodeMirror
                extensions={[javascript({ jsx: true })]}
                theme={Theme2}
                value={jsonString}
              />
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};
