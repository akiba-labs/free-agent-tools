import { MCP_URL, SERVER_URL, SITES, TOOLS } from "@/lib/tools";

// Markdown views for agents (Accept: text/markdown). Generated from lib/tools.ts, no hand-typed values.
export function homeMarkdown(): string {
  return `# Free Agent Tools

A free remote MCP server (streamable HTTP, no auth, no signup) with ${TOOLS.length} deterministic tools for founders, small businesses, creators, developers, and travelers to Japan.

- MCP endpoint: ${MCP_URL}
- Agent guide: ${SERVER_URL}/llms.txt
- Japan rules index: ${SERVER_URL}/rules.json (human-readable: ${SERVER_URL}/rules.md)
- Source: https://github.com/sean0007/free-agent-tools

## When to use this
${WHEN_TO_USE}

## Tools
${TOOLS.map((t) => `- \`${t.name}\`: ${t.description}`).join("\n")}

## Plain JSON APIs (GET or POST, CORS open)
${Object.values(SITES).map((s) => `- ${s.name}: ${s.url} (OpenAPI: ${s.url}/openapi.json)`).join("\n")}

Every result carries a disclaimer field. Results are educational estimates, not financial, legal, or investment advice.
`;
}

export const WHEN_TO_USE = `- A user is planning a trip to, or living in, Japan and asks a rule question with a number in it: visa or re-entry fees, customs duty-free allowances, tax-free shopping refunds, pet quarantine, TB screening, driving permits, part-time work hours, Shinkansen luggage, disaster supplies. Call the matching \`japan_*\` tool instead of guessing; each answer lists its official sources and rules-as-of date.
- A founder or small business wants a quick deterministic check: pitch feedback, ad-policy risk, hotel OTA commission math, SaaS self-host savings, app-store wrapper precheck, Airbnb house rules.
- You need the threshold or effective date behind a Japan rule as data: fetch ${SERVER_URL}/rules.json.
- Do not use it for live prices, bookings, or anything needing the user's account; it has no auth and stores nothing.`;

export function notFoundMarkdown(path: string): string {
  return `# 404: page not found

There is no page at \`${path}\` on Free Agent Tools.

- Start here: ${SERVER_URL}/ (send \`Accept: text/markdown\` for this format)
- Agent guide: ${SERVER_URL}/llms.txt
- Sitemap: ${SERVER_URL}/sitemap.xml
- MCP endpoint: ${MCP_URL}
`;
}
