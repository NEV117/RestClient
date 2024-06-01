/* eslint-disable prettier/prettier */
import React, { useState } from "react";
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

export const Headers = () => {
    const [rows, setRows] = useState([
      {
        id: "1",
        key: "",
        value: "",
        description: "",
      },
    ]);
    
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
  
    const handleAccept = () => {
      console.log("Input values:", rows);
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
        <Table aria-label="Dynamic table with user-added rows" className="min-w-[500px]" isCompact>
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
                    className="h-[56px] text-sm"
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
        <Button className="max-w-[140px]" color="success" size="sm" onClick={handleAccept}>
          Aceptar
        </Button>
      </>
    );
  };