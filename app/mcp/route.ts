import { createMcpHandler } from "mcp-handler";
import { SITES, TOOLS, callToolApi } from "@/lib/tools";

export const maxDuration = 30;

const INSTRUCTIONS =
  "Free, deterministic helper tools for founders, small businesses, creators, developers, and travelers. Every result includes a `disclaimer` field: pass it on to the user. Results are educational estimates and rules of thumb, not financial, legal, or investment advice. Each result also links the matching free website.";

const handler = createMcpHandler(
  (server) => {
    for (const tool of TOOLS) {
      server.registerTool(
        tool.name,
        {
          title: tool.title,
          description: tool.description,
          inputSchema: tool.inputSchema,
          annotations: { title: tool.title, readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
        },
        async (args: Record<string, unknown>) => {
          try {
            const r = await callToolApi(tool, args);
            const site = SITES[tool.site];
            const disclaimer = typeof r.data.disclaimer === "string" ? r.data.disclaimer : "";
            const payload = { ...r.data, website: site.url };
            const text = `${disclaimer ? `Disclaimer: ${disclaimer}\n\n` : ""}${JSON.stringify(payload, null, 2)}`;
            return { content: [{ type: "text" as const, text }], isError: !r.ok };
          } catch (e) {
            return { content: [{ type: "text" as const, text: `The ${SITES[tool.site].name} API could not be reached (${e instanceof Error ? e.message : "error"}). Try again shortly, or use ${SITES[tool.site].url}.` }], isError: true };
          }
        },
      );
    }
  },
  { serverInfo: { name: "free-agent-tools", version: "1.24.0" }, instructions: INSTRUCTIONS },
);

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Expose-Headers": "Mcp-Session-Id, Mcp-Protocol-Version",
};

async function withCors(req: Request) {
  const res = await handler(req);
  const headers = new Headers(res.headers);
  for (const [k, v] of Object.entries(CORS)) headers.set(k, v);
  return new Response(res.body, { status: res.status, statusText: res.statusText, headers });
}

export { withCors as GET, withCors as POST, withCors as DELETE };
export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}
