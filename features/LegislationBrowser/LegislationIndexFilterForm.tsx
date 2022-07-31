import { useState } from "react";

export function LegislationIndexFilterForm({
  limit,
  skip,
}: {
  limit: number;
  skip: number;
}) {
  const PossibleSources = ["Government", "Private Member"];
  const [sources, setSources] =
    useState<typeof PossibleSources[number][]>(PossibleSources);

  const handleSourceChange = (source: typeof PossibleSources[number]) => {
    setSources((oldSources) =>
      oldSources.includes(source)
        ? oldSources.filter((s) => s != source)
        : [...oldSources, source].sort()
    );
  };

  return (
    <form style={{ position: "sticky" }}>
      <div>
        <h3>Sources</h3>
        {PossibleSources.map((source) => {
          const name = `${source} - checkbox`;
          return (
            <div key={source}>
              <label htmlFor={name}>
                <input
                  name={name}
                  type="checkbox"
                  checked={sources.includes(source)}
                  onChange={() => handleSourceChange(source)}
                ></input>{" "}
                {source}
              </label>
            </div>
          );
        })}
        {sources.map((source) => (
          <input key={source} type="hidden" name="bill_source" value={source} />
        ))}
        <input type="hidden" name="limit" value={limit} />
        <input type="hidden" name="skip" value={skip} />
      </div>
      <button type="submit">Filter</button>
    </form>
  );
}
