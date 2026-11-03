import type { Metadata } from "next";

export const metadata: Metadata = { title: "Downloading the Japan trip checklist", robots: { index: false, follow: false } };

export default function Download() {
  return (
    <main>
      <meta httpEquiv="refresh" content="2;url=/japan-trip-checklist.pdf" />
      <p className="kicker">Download starting</p>
      <h1>Your checklist is on its way</h1>
      <p className="lead">
        If it doesn&apos;t open in a moment, <a href="/japan-trip-checklist.pdf">tap here for the PDF</a>.
      </p>
      <p className="small">Nothing about you is stored. <a href="/checklist">Back to the checklist page</a></p>
    </main>
  );
}
