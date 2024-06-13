/* eslint-disable prettier/prettier */
// services.ts
import axios, { AxiosRequestConfig } from 'axios';

import { AuthData, HeaderRow, ParamRow } from '@/types';
export const makeHttpRequest = async (
    url: string,
    method: string,
    paramsData: ParamRow[] | null,
    headersData: HeaderRow[] | null,
    jsonData: string | null,
    authData: AuthData | null,
  ) => {
    // Configurar opciones por defecto
    const axiosConfig: AxiosRequestConfig = {
      method: method.toUpperCase(),
      url: url,
    };
  
    // Agregar parámetros si están definidos
    if (paramsData) {
      const params = new URLSearchParams();

      paramsData.forEach(param => {
        params.append(param.key, param.value);
      });
      axiosConfig.params = params;
    }
  
    // Agregar headers si están definidos
    if (headersData) {
      const headers: Record<string, string> = {};

      headersData.forEach(header => {
        headers[header.key] = header.value;
      });
      axiosConfig.headers = headers;
    }
  
    // Agregar datos JSON si están definidos
    if (jsonData) {
      axiosConfig.data = jsonData;
    }
  
    // Agregar autenticación si está definida
    if (authData) {
      if (authData.authType === 'bearer' && authData.token) {
        axiosConfig.headers = {
          ...axiosConfig.headers,
          Authorization: `Bearer ${authData.token}`,
        };
      } else if (authData.authType === 'basic' && authData.username && authData.password) {
        axiosConfig.auth = {
          username: authData.username,
          password: authData.password,
        };
      }
    }
  
    try {
      // Realizar la solicitud HTTP usando axios
      const response = await axios(axiosConfig);

      return response;
    } catch (error:any) {
      // Manejo de errores
      console.error('Error making HTTP request:', error);

      error.response.data = error.message

      return error.response;
    }
  };