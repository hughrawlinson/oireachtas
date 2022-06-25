export type Chamber = "dail" | "seanad";

export const HOST = "https://api.oireachtas.ie/v1";

export interface ResultHead<Lang, Counts> {
  counts: Counts & {
    resultCount: number;
  };
  dateRange: {
    start: string;
    end: string;
  };
  lang: Lang;
}

export * from "./Legislation";
export * from "./Members";
export * from "./Houses";
export * from "./Parties";
