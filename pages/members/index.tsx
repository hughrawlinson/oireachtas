import { GetServerSideProps } from "next";
import {
  getMembers,
  GetMembersParams,
  Member,
  Membership,
} from "../../features/OireachtasAPI";

function Membership({ membership }: { membership: Membership }) {
  return (
    <>
      <section>
        <p>{membership.house.showAs}</p>
        <p>
          {new Date(membership.dateRange.start).toLocaleDateString()}
          {membership.dateRange.end &&
            ` - ${new Date(membership.dateRange.end).toLocaleDateString()}`}
        </p>
        {membership.offices.length > 0 && (
          <>
            Offices:
            <ul>
              {membership.offices.map(({ office }) => (
                <ul
                  key={`${membership.house.showAs}${office.officeName.showAs}`}
                >
                  {office.officeName.showAs}
                </ul>
              ))}
            </ul>
          </>
        )}
        {membership.parties.length > 0 && (
          <>
            <ul>
              {membership.parties.map(({ party }) => (
                <ul key={`${membership.house.showAs}${party.showAs}`}>
                  {party.showAs}{" "}
                  {new Date(party.dateRange.start).toLocaleDateString()}{" "}
                  {party.dateRange.end &&
                    " - " + new Date(party.dateRange.end).toLocaleDateString()}
                </ul>
              ))}
            </ul>
          </>
        )}
      </section>
    </>
  );
}

function Member({ member }: { member: Member }) {
  return (
    <article>
      <h2>{member.fullName}</h2>
      <span>{member.wikiTitle}</span>
      {member.memberships.map((membership, i) => (
        <Membership
          key={`${i}${membership.membership.uri}`}
          membership={membership.membership}
        />
      ))}
    </article>
  );
}

interface MembersIndexProps {
  members: Awaited<ReturnType<typeof getMembers>>;
}

export default function MembersIndex(props: MembersIndexProps) {
  return (
    <main>
      <h1>Members</h1>
      {props.members.results.map((member) => (
        <Member key={member.member.uri} member={member.member} />
      ))}
    </main>
  );
}

export const getServerSideProps: GetServerSideProps<MembersIndexProps> = async (
  req
) => {
  const chamberId = req.query?.["chamber_id"];

  const options: GetMembersParams = {};

  if (Array.isArray(chamberId)) {
    options.chamber_id = chamberId.map(decodeURIComponent);
  } else if (chamberId) {
    options.chamber_id = [decodeURIComponent(chamberId)];
  }

  const members = await getMembers({ chamber: "dail", ...options });
  return { props: { members } };
};
