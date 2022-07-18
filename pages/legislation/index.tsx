import { GetServerSideProps } from "next";
import Link from "next/link";
import {
  getLegislation,
  Legislation,
  RelatedDoc,
  Sponsor,
} from "../../features/OireachtasAPI";

interface LegislationIndexProps {
  legislation: Awaited<ReturnType<typeof getLegislation>>;
}

function RelatedDoc(doc: RelatedDoc) {
  return (
    <div>
      <p>
        <Link href={doc.uri} passHref>
          <a rel="noopener noreferrer" target="_blank">
            <span>{new Date(doc.date).toLocaleDateString()}</span>
            {": "}
            {doc.showAs}
          </a>
        </Link>
      </p>
    </div>
  );
}

function Sponsor({ sponsor }: Sponsor) {
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

function Legislation(legislation: Legislation) {
  function printLegislation() {
    console.log(JSON.stringify(legislation, null, 2));
  }

  return (
    <article>
      <h2>{legislation.bill.shortTitleEn}</h2>
      <details>
        <summary>Long description</summary>
        {legislation.bill.longTitleEn}
      </details>
      <details>
        <summary>{legislation.bill.shortTitleGa}</summary>
        {legislation.bill.longTitleGa}
      </details>
      <p>
        Last Updated:{" "}
        {new Date(legislation.bill.lastUpdated).toLocaleDateString()}
      </p>
      <div>
        {legislation.bill.sponsors.map((s, i) => (
          <Sponsor
            key={`${i},${s.sponsor.as.showAs || s.sponsor.by.showAs}`}
            sponsor={s.sponsor}
          />
        ))}
      </div>
      <div>
        <h3>Related Documents</h3>
        {legislation.bill.relatedDocs.map(({ relatedDoc }) => (
          <RelatedDoc key={relatedDoc.uri} {...relatedDoc} />
        ))}
      </div>
      {/* <button onClick={printLegislation}>Print legislation to console</button> */}
      <hr></hr>
    </article>
  );
}

export default function LegislationIndex({
  legislation,
}: LegislationIndexProps) {
  return (
    <div>
      <h1>Legislation</h1>
      {legislation.results.map((legislation) => (
        <Legislation key={legislation.bill.shortTitleEn} {...legislation} />
      ))}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (req) => {
  const chamberId = req.query?.["chamber_id"];

  const options: Parameters<typeof getLegislation>[0] = {};

  if (Array.isArray(chamberId)) {
    options.chamber_id = chamberId.map(decodeURIComponent);
  } else if (chamberId) {
    options.chamber_id = [decodeURIComponent(chamberId)];
  }

  const legislation = await getLegislation(options);

  return { props: { legislation } };
};
