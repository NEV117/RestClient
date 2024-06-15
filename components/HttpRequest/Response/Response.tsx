/* eslint-disable prettier/prettier */
import { javascript } from "@codemirror/lang-javascript";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";
import CodeMirror from "@uiw/react-codemirror";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";

type ResponseProps = {
  loading: boolean | undefined;
  data: any | undefined;
  status: number | undefined;
  time: number | undefined;
  size: number | undefined;
  headers: Record<string, string> | undefined;
};

export const Response = ({ loading, data, status, time, size, headers }: ResponseProps) => {
  const { theme } = useTheme();
  const Theme2 = theme === "dark" ? githubDark : githubLight;
  const [maxHeight, setMaxHeight] = useState(0);
  const [dots, setDots] = useState('');

  useEffect(() => {
    const updateMaxHeight = () => {
      setMaxHeight(window.innerHeight - 714);
    };

    updateMaxHeight();
    window.addEventListener("resize", updateMaxHeight);

    return () => {
      window.removeEventListener("resize", updateMaxHeight);
    };
  }, []);


  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setDots((prevDots) => (prevDots.length === 3 ? '' : prevDots + '.'));
      }, 300); 

      return () => clearInterval(interval); 
    } else {
      setDots(''); 
    }
  }, [loading]);

  return (
    <>
      <div className="flex flex-row gap-4 text-sm pb-2">
        <p>Status: {status}</p> 
        <p>Time: {time} ms</p> 
        <p>Size: {size?.toFixed(2)} Kb</p>
      </div>
      <Tabs aria-label="Options">
        <Tab key="body" title="Body">
          <Card>
            <CardBody>
              <div
                className="block sm:hidden"
                style={{
                  borderRadius: "10px",
                  overflow: "auto",
                  maxHeight: `238px`,
                }}
              >
                <CodeMirror
                  readOnly
                  extensions={[javascript({ jsx: true })]}
                  height="238px"
                  theme={Theme2}
                  value={loading ?  `Sending Request${dots}` : JSON.stringify(data, null, 2)}
                />
              </div>
              
              <div
                className="hidden sm:block"
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
                  value={loading ?  `Sending Request${dots}` : JSON.stringify(data, null, 2)}
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
                  value={loading ?  `Sending Request${dots}` : JSON.stringify(headers, null, 2)}
                />
              </div>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </>
  );
};
