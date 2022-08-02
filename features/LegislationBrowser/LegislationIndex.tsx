import { getLegislation } from "../OireachtasAPI";
import { PaginationControls } from "./PaginationControls";
import { Legislation } from ".";
import { LegislationIndexFilterForm } from "./LegislationIndexFilterForm";
import { useState } from "react";

export interface LegislationIndexProps {
  legislation: Awaited<ReturnType<typeof getLegislation>>;
  limit: number;
  skip: number;
}

export default function LegislationIndex({
  limit,
  skip,
  legislation,
}: LegislationIndexProps) {
  const [highlightBill, setHighlightBill] = useState<string | null>();

  return (
    <div style={{ position: "relative" }}>
      <h1>Legislation</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          gap: "36px",
        }}
      >
        <div style={{ minWidth: `${288 - 36}px`, flex: "1" }}>
          <LegislationIndexFilterForm limit={limit} skip={skip} />
        </div>
        <div style={{ flex: "5", position: "relative" }}>
          <PaginationControls
            limit={limit}
            skip={skip}
            pageDetails={legislation.head}
          />
          {legislation.results
            //.filter((legislation) => legislation.bill.act)
            .map((legislation) => (
              <div key={legislation.bill.uri}>
                <h3 onClick={() => setHighlightBill(legislation.bill.uri)}>
                  {legislation.bill.shortTitleEn}
                </h3>
                <ul
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    padding: "0",
                    margin: "0",
                    gap: "18px",
                  }}
                >
                  <li style={{ listStyle: "none", margin: "9px" }}>
                    {legislation.bill.act ? "Act" : "Bill"}
                  </li>
                  <li style={{ listStyle: "none", margin: "9px" }}>
                    Source: {legislation.bill.source}
                  </li>
                </ul>
              </div>
            ))}
          <PaginationControls
            limit={limit}
            skip={skip}
            pageDetails={legislation.head}
          />
          {highlightBill && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                backdropFilter: "blur(3px)",
                width: "100%",
                height: "100%",
                padding: "36px 144px",
              }}
            >
              <div
                style={{
                  background: "#999E",
                  padding: "18px",
                  borderRadius: "3px",
                  position: "sticky",
                  top: "1px",
                }}
              >
                <button type="button" onClick={() => setHighlightBill(null)}>
                  Close
                </button>
                <Legislation
                  {...legislation.results.find(
                    ({ bill }) => bill.uri === highlightBill
                  )!}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
