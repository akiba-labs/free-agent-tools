import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = { title: "Thanks: vote counted", robots: { index: false, follow: false } };

const NAMES: Record<string, string> = {
  feed: "the Japan rule-change feed",
  commercial: "commercial use + uptime",
  custom: "a custom Japan check",
};

export function generateStaticParams() {
  return Object.keys(NAMES).map((pick) => ({ pick }));
}
export const dynamicParams = false;

export default async function Yes({ params }: { params: Promise<{ pick: string }> }) {
  const { pick } = await params;
  const name = NAMES[pick];
  if (!name) notFound();
  return (
    <main>
      <p className="kicker">Vote counted</p>
      <h1>Thanks</h1>
      <p className="lead">
        Your tap for {name} is counted. Nothing is for sale yet, and we didn&apos;t store anything about you. If enough people
        pick it, it gets built, and it will be announced on the home page and in the GitHub repo.
      </p>
      <p>
        <a href="/pro">Back to Pro options</a> · <Link href="/" prefetch={false}>Free Agent Tools</Link> ·{" "}
        <a href="https://github.com/akiba-labs/free-agent-tools">Watch the repo for news</a>
      </p>
    </main>
  );
}
