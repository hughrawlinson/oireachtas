import Link from "next/link";
import { RelatedDoc } from "../OireachtasAPI";

export function RelatedDoc(doc: RelatedDoc) {
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
