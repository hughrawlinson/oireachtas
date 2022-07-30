import { Legislation } from "../OireachtasAPI";
import { RelatedDoc } from "./RelatedDoc";
import { Sponsor } from ".";

export function Legislation(legislation: Legislation) {
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
