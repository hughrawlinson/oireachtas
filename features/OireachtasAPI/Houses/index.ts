import { HOST, ResultHead } from "..";

interface GetHousesParams {}

export interface House {
  dateRange: {
    start: string;
    end?: string;
  };
  seats: number;
  houseNo: string;
  chamberType: string;
  chamberCode: string;
  houseType: string;
  uri: string;
  showAs: string;
}

interface GetHousesResult {
  head: ResultHead<"mul", { housesCount: number }>;
  results: { house: House }[];
}

export async function getHouses(params?: GetHousesParams) {
  const url = `${HOST}/houses?${new URLSearchParams(
    // @ts-ignore
    params || {}
  ).toString()}`;
  const response = await fetch(url);
  return (await response.json()) as unknown as GetHousesResult;
}
