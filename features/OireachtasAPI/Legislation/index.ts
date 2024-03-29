import { HOST, ResultHead } from "..";

export const BillSource = ["Government", "Private Member"] as const;
export type BillSource = typeof BillSource[number];

export function isBillSource(
  possibleBillSource: string
): possibleBillSource is BillSource {
  return BillSource.includes(possibleBillSource as BillSource);
}

interface GetLegislationParams {
  bill_status?: string[];
  bill_source?: BillSource[];
  date_start?: string;
  date_end?: string;
  skip?: number;
  limit?: number;
  member_id?: string;
  bill_id?: string;
  bill_no?: string;
  bill_year?: string;
  chamber_id?: string[];
  act_year?: string;
  act_no?: string;
  lang?: string;
}

type Amendment = unknown;

type Debate = unknown;

type Stage = unknown;

export type Sponsor = {
  sponsor: {
    as: {
      showAs?: string;
      url?: string;
    };
    by: {
      showAs?: string;
      url?: string;
    };
    isPrimary: boolean;
  };
};

type Version = unknown;

export interface RelatedDoc {
  date: string;
  docType: string;
  formats: {
    pdf: {
      uri: string;
    } | null;
    xml: {
      url: string;
    } | null;
  };
  lang: string;
  showAs: string;
  uri: string;
}

interface Act {
  actNo: string;
  actYear: string;
  dateSigned: string;
  longTitleEn: string;
  longTitleGa: string;
  shortTitleEn: string;
  shortTitleGa: string;
  statutebookURI: string;
  uri: string;
}

interface Bill {
  act?: Act;
  amendmentList: Amendment[];
  billNo: string;
  billType: string;
  billTypeURI: string;
  billYear: string;
  debates: Debate[];
  events: Event[];
  lastUpdated: string;
  longTitleEn: string;
  longTitleGa: string;
  method: string;
  methodURI: string;
  mostRecentStage: Stage;
  originHouse: {
    showAs: string;
    uri: string;
  };
  relatedDocs: { relatedDoc: RelatedDoc }[];
  shortTitleEn: string;
  shortTitleGa: string;
  source: string;
  sourceURI: string;
  sponsors: Sponsor[];
  stages: Stage[];
  status: string;
  statusURI: string;
  uri: string;
  versions: Version[];
}

interface BillSort {
  actNoSort: null;
  actShortTitleEnSort: null;
  actShortTitleGaSort: null;
  actYearSort: null;
  billNoSort: 62;
  billShortTitleEnSort: string;
  billShortTitleGaSort: string;
  billYearSort: string;
}

export interface Legislation {
  bill: Bill;
  billSort: BillSort;
  contextDate: string;
}

interface GetLegislationResult {
  head: ResultHead<"en" | "ga", { billCount: number }>;
  results: Legislation[];
}

export async function getLegislation(params?: GetLegislationParams) {
  const url = `${HOST}/legislation?${new URLSearchParams(
    // @ts-ignore
    {
      limit: 20,
      ...params,
    }
  ).toString()}`;
  const response = await fetch(url);
  return (await response.json()) as unknown as GetLegislationResult;
}
