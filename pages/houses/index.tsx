import { GetStaticProps } from "next";
import Link from "next/link";
import { getHouses, House } from "../../features/OireachtasAPI";

interface MembersIndexProps {
  houses: Awaited<ReturnType<typeof getHouses>>;
}

function House({ house }: { house: House }) {
  return (
    <article>
      <h2>{house.showAs}</h2>
      <p>
        <i>From {new Date(house.dateRange.start).toLocaleDateString()}</i>
        {house.dateRange.end && (
          <i> To {new Date(house.dateRange.end).toLocaleDateString()}</i>
        )}
      </p>
      <p>
        <i>Seats: {house.seats}</i>
      </p>
      <ul>
        <li>
          <Link
            passHref
            href={`/legislation?${new URLSearchParams({
              chamber_id: new URL(house.uri).pathname,
            }).toString()}`}
          >
            <a>Legislation</a>
          </Link>
        </li>
        <li>
          <Link
            passHref
            href={`/members?${new URLSearchParams({
              chamber_id: new URL(house.uri).pathname,
            }).toString()}`}
          >
            <a>Members</a>
          </Link>
        </li>
      </ul>
    </article>
  );
}

export default function MembersIndex(props: MembersIndexProps) {
  return (
    <main>
      <h1>Houses</h1>
      {props.houses.results.map((house, i) => (
        <House key={`${house.house.showAs},${i}`} house={house.house} />
      ))}
    </main>
  );
}

export const getServerSideProps: GetStaticProps<MembersIndexProps> = async (
  query
) => {
  const houses = await getHouses();
  return { props: { houses } };
};
