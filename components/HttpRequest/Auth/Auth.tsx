/* eslint-disable prettier/prettier */
import { Select, SelectItem } from "@nextui-org/react";
import React from "react";

import { authTypes } from "@/types";
export const Auth = () => {
  return (
    <>
      <Select className="max-w-[150px]" label="Auth type">
        {authTypes.map((authType) => (
          <SelectItem key={authType.key}>{authType.label}</SelectItem>
        ))}
      </Select>
    </>
  );
};
