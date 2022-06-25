import { HOST, ResultHead } from "..";

export interface GetMembersParams {
  date_start?: string;
  chamber_id?: string[];
  chamber?: "dail" | "seanad";
  house_no?: number;
  member_id?: string;
  date_end?: string;
  skip?: number;
  limit?: number;
}

export interface Represent {
  representCode: string;
  showAs: string;
  uri: string;
  representType: string;
}

export interface Office {
  dateRange: {
    start: string;
    end?: string;
  };
  officeName: {
    showAs: string;
    uri?: string;
  };
}

export interface Party {
  dateRange: {
    start: string;
    end?: string;
  };
  partyCode: string;
  showAs: string;
  uri: string;
}

export interface Membership {
  represents: { represent: Represent }[];
  dateRange: { start: string; end: string };
  offices: { office: Office }[];
  parties: { party: Party }[];
  uri: string;
  house: {
    showAs: string;
    chamberType: string;
    houseCode: string;
    houseNo: string;
    uri: string;
  };
}

export interface Member {
  memberCode: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfDeath?: string;
  fullName: string;
  pId: string;
  wikiTitle?: string;
  uri: string;
  memberships: { membership: Membership }[];
}

interface MemberResult {
  member: Member;
}

interface GetMembersResult {
  head: ResultHead<"en" | "ga", { membersCount: number }>;
  results: MemberResult[];
}

export async function getMembers(params?: GetMembersParams) {
  const url = `${HOST}/members?${new URLSearchParams(
    // @ts-ignore
    params || {}
  ).toString()}`;
  const response = await fetch(url);
  return (await response.json()) as unknown as GetMembersResult;
}
