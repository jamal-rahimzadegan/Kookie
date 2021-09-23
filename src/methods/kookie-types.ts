type ComplexObject = { [key: string]: unknown };

interface KookieOptionsType {
  res?: any;
  expires?: number; // in days (default is 365)
  path?: string;
  secure?: boolean;
}

type MultiCookieType = {
  name: string;
  value: any;
  options?: KookieOptionsType;
}[];

export type { ComplexObject, KookieOptionsType, MultiCookieType };
