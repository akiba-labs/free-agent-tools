import { CLIENTS } from "@/lib/clients";
import { MCP_URL, SERVER_URL, SITES, TOOLS } from "@/lib/tools";

const how = (name: string) => CLIENTS.find((c) => c.name === name);
const cursor = how("Cursor");
const claudeApp = how("Claude (desktop and web)");
const claudeCode = how("Claude Code");
const chatgpt = how("ChatGPT");

const FAQ: { q: string; a: string }[] = [
  {
    q: "Is there a free MCP server with business calculators?",
    a: `Yes. Free Agent Tools is a free remote MCP server at ${MCP_URL} with ${TOOLS.length} deterministic tools: a startup pitch roast, a business idea (MOAT) score, price headroom, 30-day cash and email-list value checks, a hotel OTA commission calculator, SaaS-to-open-source savings, a Google / Meta ads notice risk card, an App Store 4.2 precheck, a faceless YouTube reality check, AI infrastructure bottlenecks, viral attention patterns, Japan trip planning, Japan tax-free refund checking, Japan visa / residence permit fees, a Japan luggage (Shinkansen suitcase rule + Yamato forwarding cost) check, a Kyushu travel discount (九州ふっこう応援割) calculator, a Japan customs duty-free allowance checker for arrivals, a Japan pre-entry TB screening (JPETS) checker, a Japan dual pricing (resident vs tourist price) checker, a Japan emergency alert decoder (Earthquake Early Warning, tsunami, Level 1-5 warnings, evacuation, J-ALERT), a Japan permanent residence guideline checker (2026-10-01 revision: filing-date rules, spouse 3+1 → 5+3 years, absence rule), a Japan international postage calculator (Japan Post EMS, parcel, small packet and letter prices now vs from 2027-02-01), a Japan re-entry deadline checker (when a foreign resident must be back: deemed re-entry, re-entry permit, pending renewal), and a Japan overseas dependents checker (claiming relatives abroad: age bands, ¥380,000 remittance rule, 2026 ¥620,000 limit, tax saving), a Japan part-time work check (資格外活動許可: which statuses may take which jobs, 28-hour rule, the 2026-10-01 pachinko change for dependents), a Japan driving checker (Geneva IDP vs translation vs no route by country, last driving day, 外免切替 after 2025-10-01), an Airbnb house rules checker (which rules and checkout tasks are likely not allowed for bookings from 2026-11-20, with rewrites and Japan 民泊 guest-register exceptions), a Japan My Number Card expiry checker (foreign residents' card ends with the period of stay: city-hall deadline, 2-month extension while a renewal is pending, 10th-birthday cap, e-certificate and マイナ保険証 grace), a Japan Highly Skilled Professional points calculator (高度人材ポイント: 70 vs 80 for the 1-year PR fast track, ¥3M salary floor, J-Skip), and a Japan pet quarantine checker (bringing a dog, cat or rabbit into or out of Japan: 180-day wait, 40-day notice, detention days, the 14-day export application mandatory from 2027-01-01), and a Japan leaving-tax checker (resident tax still owed when you leave Japan, tax agent / 納税管理人, final-salary lump sum, 準確定申告 and 転出届 deadlines).`,
  },
  {
    q: `What are the ${TOOLS.length} tools?`,
    a: TOOLS.map((t) => `${t.name} (${t.title})`).join("; ") + ".",
  },
  {
    q: "How do I add it to Claude?",
    a: `In Claude desktop or claude.ai: ${claudeApp?.how ?? ""} URL: ${MCP_URL}. In Claude Code, run: ${claudeCode?.code ?? ""}`,
  },
  {
    q: "How do I add it to Cursor?",
    a: `${cursor?.how ?? ""} ${cursor?.code.replace(/\s+/g, " ") ?? ""}`,
  },
  {
    q: "Can I use it in ChatGPT?",
    a: `Yes, as a custom connector. ${chatgpt?.how ?? ""} URL: ${MCP_URL}. It also works with the OpenAI Responses API as a remote MCP tool, and every tool has a plain JSON API with an OpenAPI spec you can use as a GPT Action.`,
  },
  {
    q: "Is it really free? Do I need an API key?",
    a: "Yes, it is free. There is no API key, no account, and no sign-in: choose No authentication in clients that ask. It speaks streamable HTTP; clients that only support stdio can bridge with mcp-remote.",
  },
  {
    q: "What happens to the data my agent sends?",
    a: "Each call's arguments are sent to the matching tool's public JSON API on vercel.app, which computes the result and returns it. The tools do not track tool inputs, and there are no accounts. Don't send passwords, keys, or personal data you would not paste into a public web form.",
  },
  {
    q: "Are the results financial, legal, or investment advice?",
    a: "No. The tools are deterministic rules of thumb and educational estimates. Every result carries a disclaimer field for the agent to pass on to the user, and links the free website where a person can check the math.",
  },
  {
    q: "Is it open source, and where is it listed?",
    a: `Yes, MIT-licensed at github.com/sean0007/free-agent-tools. It is published in the Official MCP Registry as io.github.sean0007/free-agent-tools, and server.json and llms.txt are at ${SERVER_URL}/server.json and ${SERVER_URL}/llms.txt.`,
  },
];

const JSON_LD = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Free Agent Tools",
    url: `${SERVER_URL}/`,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any (remote MCP server, streamable HTTP)",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    license: "https://opensource.org/licenses/MIT",
    codeRepository: "https://github.com/sean0007/free-agent-tools",
    description: `A free, no-auth remote MCP server (${MCP_URL}) with ${TOOLS.length} deterministic tools for founders, small businesses, creators, developers, and travelers.`,
    featureList: TOOLS.map((t) => t.title),
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  },
];

export default function Home() {
  const sites = Object.values(SITES);
  return (
    <main>
      <p className="kicker">Remote MCP server · free · no auth</p>
      <h1>Free Agent Tools</h1>
      <p className="lead">
        Twenty-four small, deterministic tools your AI agent can call: roast a startup pitch, score a business idea, check price headroom,
        work out hotel OTA commission, find open-source swaps for SaaS bills, read a Google or Meta ads notice,
        precheck an iOS app for App Store 4.2, reality-check an AI YouTube plan, explain AI infrastructure
        bottlenecks, plan a Japan trip by city and month, check a Japan tax-free shopping refund, look up Japan visa renewal fees, check whether a suitcase fits on the Shinkansen or what forwarding it costs, work out the Kyushu recovery travel discount, check what you can bring into Japan duty-free, see whether you need the Japan pre-entry TB clearance certificate, and see where tourists pay more than residents in Japan.
      </p>
      <p>Add this URL to any MCP client that supports streamable HTTP:</p>
      <pre className="url">{MCP_URL}</pre>
      <p className="muted small">
        No API key, no account, no tracking of tool inputs. Results are rules of thumb and educational estimates,
        not financial, legal, or investment advice; every result carries a disclaimer for the user.
      </p>

      <h2>Add it to your client</h2>
      {CLIENTS.map((c) => (
        <div className="card" key={c.name}>
          <h3>{c.name}</h3>
          <p className="muted small" style={{ margin: 0 }}>{c.how}</p>
          <pre>{c.code}</pre>
        </div>
      ))}

      <h2>Tools</h2>
      <div className="grid">
        {TOOLS.map((t) => (
          <div className="tool" key={t.name}>
            <code>{t.name}</code>
            <p className="small" style={{ margin: "6px 0 0" }}>{t.title}</p>
            <p className="muted small" style={{ margin: "4px 0 0" }}>
              From <a href={SITES[t.site].url}>{SITES[t.site].name}</a>
            </p>
          </div>
        ))}
      </div>

      <h2>Prefer plain HTTP?</h2>
      <p className="muted">Each tool also has a free JSON API (GET or POST, CORS open) with an OpenAPI spec, usable as a GPT Action or function tool.</p>
      {sites.map((s) => (
        <div className="card" key={s.id}>
          <h3><a href={s.url}>{s.name}</a></h3>
          <p className="muted small" style={{ margin: 0 }}>{s.blurb}</p>
          <p className="small" style={{ margin: "6px 0 0" }}>
            <a href={`${s.url}/openapi.json`}>openapi.json</a> · <a href={`${s.url}/llms.txt`}>llms.txt</a> ·{" "}
            <a href={`${s.url}/.well-known/ai-plugin.json`}>ai-plugin.json</a>
          </p>
        </div>
      ))}

      <h2>Questions</h2>
      {FAQ.map((f, i) => (
        <details key={f.q} open={i < 3}>
          <summary>{f.q}</summary>
          {i === 1 ? (
            <ul className="small">
              {TOOLS.map((t) => (
                <li key={t.name}>
                  <code>{t.name}</code>: {t.title}
                </li>
              ))}
            </ul>
          ) : (
            <p className="small">{f.a}</p>
          )}
        </details>
      ))}

      <p className="small">Using the Japan tools at work? <a href="/pro">Tell us which paid add-on you&apos;d use</a> (planned, nothing for sale, no signup).</p>

      <h2>Test it</h2>
      <pre>{`npx @modelcontextprotocol/inspector --cli ${MCP_URL} --transport http --method tools/list`}</pre>

      <footer>
        Source: <a href="https://github.com/sean0007/free-agent-tools">github.com/sean0007/free-agent-tools</a> (MIT) ·{" "}
        <a href="/llms.txt">llms.txt</a> · <a href="/server.json">server.json</a> · <a href="/pro">Pro (planned)</a>
        <br />
        Not affiliated with Anthropic, OpenAI, Google, Meta, Apple, or any company named in tool results.
      </footer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD).replace(/</g, "\\u003c") }} />
    </main>
  );
}
