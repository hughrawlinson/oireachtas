import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  getLegislation,
  Legislation,
  RelatedDoc,
  Sponsor,
} from "../../features/OireachtasAPI";

interface LegislationIndexProps {
  legislation: Awaited<ReturnType<typeof getLegislation>>;
  limit: number;
  skip: number;
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
      {legislation.bill.act ? (
        <p>
          (Act {legislation.bill.act.actNo} of {legislation.bill.act.actYear})
        </p>
      ) : null}
      <p>
        Bill {legislation.bill.billNo} of {legislation.bill.billYear}.
      </p>
      View on{" "}
      <a
        href={`https://www.oireachtas.ie/en/bills/bill/${legislation.bill.billYear}/${legislation.bill.billNo}/`}
      >
        Oireachtas.ie
      </a>
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
        <p>Source: {legislation.bill.source}</p>
        <p>Originating House: {legislation.bill.originHouse.showAs}</p>
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

interface PaginationControlsProps {
  limit: number;
  skip: number;
  pageDetails: LegislationIndexProps["legislation"]["head"];
}

function PaginationControls({
  limit,
  skip,
  pageDetails,
}: PaginationControlsProps) {
  const router = useRouter();

  const nextHref = `${router.pathname}?${new URLSearchParams({
    ...router.query,
    skip: (limit + skip).toString(),
  }).toString()}`;

  const NextElement = (
    <Link href={nextHref} passHref>
      <a aria-label="Next page">Next</a>
    </Link>
  );

  const prevHref = `${router.pathname}?${new URLSearchParams({
    ...router.query,
    skip: (limit - skip > 0 ? limit - skip : 0).toString(),
  }).toString()}`;

  const PrevElement =
    skip > 0 ? (
      <Link href={prevHref} passHref>
        <a aria-label="Previous page">Prev</a>
      </Link>
    ) : null;

  return (
    <div>
      {`Bills ${skip} to ${skip + limit} of ${pageDetails.counts.resultCount}`}
      <nav aria-label="Legislation Pagination">
        {PrevElement}
        {NextElement}
      </nav>
    </div>
  );
}

export default function LegislationIndex({
  limit,
  skip,
  legislation,
}: LegislationIndexProps) {
  console.log(legislation.results.map((result) => result.bill.shortTitleEn));

  return (
    <div>
      <h1>Legislation</h1>
      <PaginationControls
        limit={limit}
        skip={skip}
        pageDetails={legislation.head}
      />
      {legislation.results
        //.filter((legislation) => legislation.bill.act)
        .map((legislation) => (
          <Legislation key={legislation.bill.shortTitleEn} {...legislation} />
        ))}
      <PaginationControls
        limit={limit}
        skip={skip}
        pageDetails={legislation.head}
      />
    </div>
  );
}

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

  console.log(JSON.stringify(options, null, 2));

  const legislation = await getLegislation(options);

  console.log(legislation.results.map((result) => result.bill.shortTitleEn));

  return {
    props: { legislation, limit: options.limit || 20, skip: options.skip || 0 },
  };
};
