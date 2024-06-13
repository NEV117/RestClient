/* eslint-disable prettier/prettier */
import { javascript } from "@codemirror/lang-javascript";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";
import CodeMirror from "@uiw/react-codemirror";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";


type ResponseProps = {
  data: any | undefined;
  status: number | undefined;
  time: number | undefined;
  size: number | undefined;
  headers: Record<string, string> | undefined;
};

export const Response = ({ data, status, time, size, headers }: ResponseProps) => {
  const { theme } = useTheme();
  const Theme2 = theme === "dark" ? githubDark : githubLight;
  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    const updateMaxHeight = () => {
      setMaxHeight(window.innerHeight - 714);
    };

    // Set initial max height on mount
    updateMaxHeight();

    // Update max height on window resize
    window.addEventListener("resize", updateMaxHeight);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("resize", updateMaxHeight);
    };
  }, []);

  return (
    <>
      <div className="flex flex-row gap-4 text-sm pb-2">
        <p>Status: {status}</p> 
        <p>Time: {time}ms</p> 
        <p>Size: {size}Kb</p>
      </div>
      <Tabs aria-label="Options">
        <Tab key="body" title="Body">
          <Card>
            <CardBody>
              <div
                style={{
                  borderRadius: "10px",
                  overflow: "auto",
                  maxHeight: `${maxHeight}px`,
                }}
              >
                <CodeMirror
                  readOnly
                  extensions={[javascript({ jsx: true })]}
                  theme={Theme2}
                  value={JSON.stringify(data, null, 2)}
                />
              </div>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="headers" title="Headers">
          <Card>
            <CardBody>
              <div
                style={{
                  borderRadius: "10px",
                  overflow: "auto",
                  maxHeight: `${maxHeight}px`,
                }}
              >
                <CodeMirror
                  readOnly
                  extensions={[javascript({ jsx: true })]}
                  theme={Theme2}
                  value={JSON.stringify(headers, null, 2)}
                />
              </div>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </>
  );
};
