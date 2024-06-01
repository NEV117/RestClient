import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export const httpMethods = [
  { key: "GET", label: "GET" },
  { key: "POST", label: "POST" },
  { key: "PUT", label: "PUT" },
  { key: "PATCH", label: "PATCH" },
  { key: "DELETE", label: "DELETE" },
  { key: "HEAD", label: "HEAD" },
  { key: "OPTIONS", label: "OPTIONS" },
];
export const authTypes = [
  { key: "no_auth", label: "No Auth" },
  { key: "basic_auth", label: "Basic Auth" },
  { key: "bearer_token", label: "Bearer Token" },
];
export const jsonObject = {
  date: "2024-04-10",
  hour: "09:00 AM",
  serviceId: 1,
  barberId: 1,
  barberShopNit: "Mario's",
};

export const jsonString = JSON.stringify(jsonObject, null, 2);

export type SelectItemColor =
  | "success"
  | "warning"
  | "danger"
  | "default"
  | "primary"
  | "secondary";
export type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "HEAD"
  | "OPTIONS";

// Mapeo de métodos HTTP a colores

export const httpMethodColors: Record<HttpMethod, SelectItemColor> = {
  GET: "success",
  POST: "warning",
  PUT: "primary",
  PATCH: "secondary",
  DELETE: "danger",
  HEAD: "primary",
  OPTIONS: "secondary",
};
