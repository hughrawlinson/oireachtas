import { GetServerSideProps } from "next";
import { getLegislation } from "../../features/OireachtasAPI";
import LegislationBrowser from "../../features/LegislationBrowser";
import { LegislationIndexProps } from "../../features/LegislationBrowser/LegislationIndex";

export default LegislationBrowser;

export const getServerSideProps: GetServerSideProps<
  LegislationIndexProps
> = async (req) => {
  const chamberId = req.query?.["chamber_id"];
  const billSource = req.query?.["bill_source"];
  const skip = req.query?.["skip"];
  const limit = req.query?.["limit"];

  const options: Parameters<typeof getLegislation>[0] = {};

  if (Array.isArray(chamberId)) {
    options.chamber_id = chamberId.map(decodeURIComponent);
  } else if (chamberId) {
    options.chamber_id = [decodeURIComponent(chamberId)];
  }

  if (Array.isArray(billSource)) {
    options.bill_source = billSource.map(decodeURIComponent);
  } else if (billSource) {
    options.bill_source = [decodeURIComponent(billSource)];
  }

  try {
    if (skip && typeof skip === "string") {
      options.skip = parseInt(skip);
    }
  } catch {}

  try {
    if (limit && typeof limit === "string") {
      options.limit = parseInt(limit);
    }
  } catch {}

  const legislation = await getLegislation(options);

  return {
    props: { legislation, limit: options.limit || 20, skip: options.skip || 0 },
  };
};
