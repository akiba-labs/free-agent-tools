import { MCP_URL, SERVER_URL, SITES, TOOLS } from "@/lib/tools";
import { WHEN_TO_USE } from "@/lib/agent-md";

export const dynamic = "force-static";

export function GET() {
  const body = `# Free Agent Tools

> A free remote MCP server (streamable HTTP, no auth) with ${TOOLS.length} deterministic tools for founders, small businesses, creators, developers, and travelers.

MCP endpoint: ${MCP_URL}
Landing page with client setup: ${SERVER_URL}
Cost: free. No key, no signup.

## When to use this
${WHEN_TO_USE}

## Tools
${TOOLS.map((t) => `- ${t.name}: ${t.description}`).join("\n")}

## Plain JSON APIs (same tools, GET or POST, CORS open)
${Object.values(SITES).map((s) => `- ${s.name}: ${s.url} (OpenAPI: ${s.url}/openapi.json, llms.txt: ${s.url}/llms.txt)`).join("\n")}

## Japan rules index (machine-readable)
- ${SERVER_URL}/rules.json: thresholds, fees, effective dates and official sources behind every Japan rule tool, copied from each tool's /api/rules (human-readable: ${SERVER_URL}/rules.md)
- ${SERVER_URL}/checklist: free printable Japan trip pre-arrival checklist (PDF at ${SERVER_URL}/japan-trip-checklist.pdf), generated from rules.json

## Rules for agents
- Every result has a disclaimer field. Pass it on to the user.
- Results are rules of thumb and educational estimates, not financial, legal, or investment advice.
- Company names in AI bottleneck results are examples from public discussion, not investment picks.
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Access-Control-Allow-Origin": "*" } });
}
