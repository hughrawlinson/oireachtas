import { Sponsor } from "../OireachtasAPI";

export function Sponsor({ sponsor }: Sponsor) {
  const sponsorString = `Sponsored${
    sponsor.by.showAs ? ` by ${sponsor.by.showAs}` : ""
  }${sponsor.as.showAs ? ` as ${sponsor.as.showAs}` : ""}`;
  return (
    <div>
      {sponsor.isPrimary && <em>Primary Sponsor</em>}
      <p>{sponsorString}</p>
    </div>
  );
}
