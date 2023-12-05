import { useRouter } from "next/router";
import Link from "next/link";
import { ReactNode } from "react";

const NavElements = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/legislation",
    label: "Legislation",
  },
  {
    href: "/houses",
    label: "Houses",
  },
  {
    href: "/members",
    label: "Members",
  },
  {
    href: "/parties",
    label: "Parties",
  },
];

function TopNav() {
  return (
    <nav
      aria-label="Site Navigation"
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "18px",
        padding: "9px",
      }}
    >
      {NavElements.map(({ href, label }) => (
        <Link key={href} passHref href={href} legacyBehavior>
          <a>{label}</a>
        </Link>
      ))}
    </nav>
  );
}

export default function SiteLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  switch (router.pathname) {
    case "/":
      return <>{children}</>;
      break;
    default:
      return (
        <>
          <TopNav />

          {children}
        </>
      );
      break;
  }
}
