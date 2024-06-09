/* eslint-disable prettier/prettier */
import { Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

import { AuthData, authTypes } from "@/types";


type AuthProps = {
  data: AuthData; 
  onParamsChange: (authData: AuthData) => void;
};


export const Auth: React.FC<AuthProps> = ({ data, onParamsChange }) => {
  const [authData, setAuthData] = useState(data);

  useEffect(() => {
    onParamsChange(authData);
  }, [authData, onParamsChange]);


  const handleAuthTypeChange = (event: { target: { value: any; }; }) => {
    setAuthData({
      ...authData,
      authType: event.target.value,
    });
  };

  const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;

    setAuthData({
      ...authData,
      [name]: value,
    });
  };

  return (
      <div className="grid grid-cols-10 gap-4 w-full ">
        <div className="col-span-3">
          <Select
            className="max-full"
            label="Auth type"
            size="sm"
            value={authData.authType}
            onChange={handleAuthTypeChange}
          >
            {authTypes.map((authType) => (
              <SelectItem key={authType.key} value={authType.key}>
                {authType.label}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="col-span-7 flex flex-col space-y-4">
          <form action="post">
            {authData.authType === "basic_auth" && (
              <div className="flex flex-col gap-3">
                <Input
                  autoComplete="false"
                  label="username"
                  name="username"
                  size="sm"
                  type="text"
                  value={authData.username}
                  onChange={handleInputChange}
                />
                <Input
                  autoComplete="false"
                  label="password"
                  name="password"
                  size="sm"
                  type="password"
                  value={authData.password}
                  onChange={handleInputChange}
                />
              </div>
            )}
            {authData.authType === "bearer_token" && (
              <Textarea
                className="h-[90px]"
                name="token"
                placeholder="Bearer token"
                value={authData.token}
                onChange={handleInputChange}
              />
            )}
          </form>
        </div>
      </div>
  );
};
