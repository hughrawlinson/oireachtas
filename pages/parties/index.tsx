import { GetStaticProps } from "next";
import { getParties } from "../../features/OireachtasAPI";

export default function PartiesIndex() {}

export const getStaticProps: GetStaticProps = async () => {
  const parties = await getParties({ chamber: "dail" });
  console.log(JSON.stringify(parties, null, 2));
  return { props: { parties } };
};
