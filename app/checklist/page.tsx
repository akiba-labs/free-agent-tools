import type { Metadata } from "next";
import Link from "next/link";
import { SERVER_URL } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free Japan trip pre-arrival checklist (PDF, no signup)",
  description:
    "A free 2-page printable checklist for visiting Japan: TB screening, driving permits, pets, duty-free allowance, Shinkansen big-luggage rule, dual pricing, weather warning levels and the new tax-free refund method. Built from official sources, no email needed.",
  alternates: { canonical: `${SERVER_URL}/checklist` },
};

export default function Checklist() {
  return (
    <main>
      <p className="kicker">Free · PDF · no signup</p>
      <h1>Japan trip pre-arrival checklist</h1>
      <p className="lead">
        Two printable pages covering what visitors most often get wrong: TB screening, driving permits, bringing a pet, the duty-free
        allowance, big suitcases on the Shinkansen, visitor vs resident prices, weather warning levels, and the tax-free refund method
        that started on 2026-11-01.
      </p>
      <p>
        Every line is copied from the official-source rules behind our free Japan tools (see <a href="/rules.md">rules.md</a>), with a
        link to check your own case. No email, no account.
      </p>
      <p>
        <a href="/checklist/download" rel="nofollow"><strong>Download the PDF →</strong></a> ·{" "}
        <a href="/japan-trip-checklist.html">view as a web page</a>
      </p>
      <footer>
        <Link href="/" prefetch={false}>Back to Free Agent Tools</Link> · Educational summary, not legal, tax, or immigration advice.
        Rules change: check each linked tool before you travel.
      </footer>
    </main>
  );
}
