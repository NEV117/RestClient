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

import { ParamRow } from "@/types";
type ParamsProps = {
  data: ParamRow[]; // Prop para recibir los datos de los parámetros
  onParamsChange: (params: ParamRow[]) => void;
};

export const Params: React.FC<ParamsProps> = ({ data, onParamsChange }) => {
  const [rows, setRows] = useState(data); // Inicializar el estado con los datos recibidos

  useEffect(() => {
    onParamsChange(rows);
  }, [rows, onParamsChange]);

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

  return (
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
                  className="h-[56px]"
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
    </>
  );
};