import { getLegislation } from "../OireachtasAPI";
import { PaginationControls } from "./PaginationControls";
import { Legislation } from ".";
import { LegislationIndexFilterForm } from "./LegislationIndexFilterForm";

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
  console.log(legislation.results.map((result) => result.bill.shortTitleEn));

  return (
    <div>
      <h1>Legislation</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          gap: "36px",
        }}
      >
        <div style={{ minWidth: "270px", flex: "1" }}>
          <LegislationIndexFilterForm limit={limit} skip={skip} />
        </div>
        <div style={{ flex: "5" }}>
          <PaginationControls
            limit={limit}
            skip={skip}
            pageDetails={legislation.head}
          />
          {legislation.results
            //.filter((legislation) => legislation.bill.act)
            .map((legislation) => (
              <Legislation
                key={legislation.bill.shortTitleEn}
                {...legislation}
              />
            ))}
          <PaginationControls
            limit={limit}
            skip={skip}
            pageDetails={legislation.head}
          />
        </div>
      </div>
    </div>
  );
}
