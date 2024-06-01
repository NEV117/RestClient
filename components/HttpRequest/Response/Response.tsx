/* eslint-disable prettier/prettier */
import { javascript } from "@codemirror/lang-javascript";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";
import CodeMirror from "@uiw/react-codemirror";

import { jsonString } from "@/types";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";

export const Response = () => {
  const { theme } = useTheme();
  const Theme2 = theme === "dark" ? githubDark : githubLight;
  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    const updateMaxHeight = () => {
      setMaxHeight(window.innerHeight - 630);
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
      <p>Status: 200 </p> <p>Time: 22ms </p> <p>Size: 2Kb </p>
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
                  extensions={[javascript({ jsx: true })]}
                  theme={Theme2}
                  value={jsonString}
                />
              </div>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="headers" title="Headers">
          <Card>
            <CardBody>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </>
  );
};
