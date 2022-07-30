import Link from "next/link";
import { useRouter } from "next/router";
import { LegislationIndexProps } from "./LegislationIndex";

interface PaginationControlsProps {
  limit: number;
  skip: number;
  pageDetails: LegislationIndexProps["legislation"]["head"];
}
export function PaginationControls({
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
