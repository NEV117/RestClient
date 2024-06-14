/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Input,
  Textarea,
} from "@nextui-org/react";

import { HeaderRow } from "@/types";

type HeadersProps = {
  data: HeaderRow[]; // Prop para recibir los datos de los parámetros
  onHeadersChange: (params: HeaderRow[]) => void;
};


export const Headers: React.FC<HeadersProps> = ({ data, onHeadersChange }) => {
  const [rows, setRows] = useState(data); // Inicializar el estado con los datos recibidos

  useEffect(() => {
    onHeadersChange(rows);
  }, [rows, onHeadersChange]);

    
    const addRow = () => {
      const newRow = {
        id: (parseInt(rows[rows.length - 1].id) + 1).toString(),
        key: "",
        value: "",
        description: "",
      };
  
      setRows([...rows, newRow]);
    };
  
    const deleteLastRow = () => {
      if (rows.length > 1) {
        const updatedRows = [...rows];

        updatedRows.pop(); // Remove the last row
        setRows(updatedRows);
      }
    };
  
    const handleInputChange = (name: string, value: string, id: string) => {
      const updatedRows = rows.map((row) => {
        if (row.id === id) {
          return { ...row, [name]: value };
        }

        return row;
      });

      setRows(updatedRows);
    };
  
    /* const handleAccept = () => {
      console.log("Input values:", rows);
    };
   */
    return  (
      <>
      <div className="flex flex-row items-center gap-2">
        <Button
          className="max-w-[140px]"
          color="primary"
          size="sm"
          onClick={addRow}
        >
          Add
        </Button>
        <Button
          className="max-w-[140px]"
          color="danger"
          disabled={rows.length === 1}
          size="sm"
          onClick={deleteLastRow}
        >
          Delete last row
        </Button>
      </div>
      <br />
      <div className="hidden sm:block">
        <Table aria-label="Dynamic table with user-added rows" className="min-w-[500px]">
          <TableHeader>
            <TableColumn>Key</TableColumn>
            <TableColumn>Value</TableColumn>
            <TableColumn>Description</TableColumn>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Input
                    label="Key"
                    size="sm"
                    type="text"
                    value={row.key}
                    variant="bordered"
                    onChange={(e) =>
                      handleInputChange("key", e.target.value, row.id)
                    }
                  />
                </TableCell>
                <TableCell>
                  <Input
                    label="Value"
                    size="sm"
                    type="text"
                    value={row.value}
                    variant="bordered"
                    onChange={(e) =>
                      handleInputChange("value", e.target.value, row.id)
                    }
                  />
                </TableCell>
                <TableCell>
                  <Textarea
                    disableAnimation
                    disableAutosize
                    classNames={{
                      base: "max-w-xs",
                      input: "resize-y min-h-[56px]",
                    }}
                    placeholder="Description"
                    size="sm"
                    value={row.description}
                    variant="bordered"
                    onChange={(e) =>
                      handleInputChange("description", e.target.value, row.id)
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="block sm:hidden">
        {rows.map((row) => (
          <div key={row.id} className="flex flex-col space-y-2 mb-4">
            <div className="flex flex-col">
              <Input
                placeholder="key"
                size="sm"
                type="text"
                value={row.key}
                variant="bordered"
                onChange={(e) =>
                  handleInputChange("key", e.target.value, row.id)
                }
              />
            </div>
            <div className="flex flex-col">
              <Input
                placeholder="value"
                size="sm"
                type="text"
                value={row.value}
                variant="bordered"
                onChange={(e) =>
                  handleInputChange("value", e.target.value, row.id)
                }
              />
            </div>
            <div className="flex flex-col">
              <Textarea
                disableAnimation
                disableAutosize
                classNames={{
                  input: "resize-y min-h-[56px]",
                }}
                placeholder="Description"
                size="sm"
                value={row.description}
                variant="bordered"
                onChange={(e) =>
                  handleInputChange("description", e.target.value, row.id)
                }
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
  };