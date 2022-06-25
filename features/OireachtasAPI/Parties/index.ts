import { Chamber, HOST } from "..";

interface GetPartiesParams {
  chamber_id?: string;
  chamber?: Chamber;
  house_no?: number;
  skip?: number;
  limit?: number;
}

interface GetPartiesResult {}

export async function getParties(
  params?: GetPartiesParams
): Promise<GetPartiesResult> {
  const url = `${HOST}/parties?${new URLSearchParams(
    // @ts-ignore
    params || {}
  ).toString()}`;
  const response = await fetch(url);
  return (await response.json()) as unknown as GetPartiesResult;
}
