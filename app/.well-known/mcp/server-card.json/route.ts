import { z } from "zod";
import { MCP_URL, SERVER_URL, TOOLS } from "@/lib/tools";

export const dynamic = "force-static";

export function GET() {
  const card = {
    $schema: "https://static.modelcontextprotocol.io/schemas/mcp-server-card/v1.json",
    version: "1.0",
    protocolVersion: "2025-06-18",
    serverInfo: { name: "free-agent-tools", title: "Free Agent Tools", version: "1.21.0" },
    description: "Free, no-auth remote MCP server with deterministic tools for founders, small businesses, creators, developers, and travelers.",
    websiteUrl: SERVER_URL,
    documentationUrl: SERVER_URL,
    transport: { type: "streamable-http", url: MCP_URL },
    authentication: { required: false },
    capabilities: { tools: { listChanged: false } },
    tools: TOOLS.map((t) => ({
      name: t.name,
      title: t.title,
      description: t.description,
      inputSchema: z.toJSONSchema(t.inputSchema),
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    })),
  };
  return new Response(JSON.stringify(card, null, 2), {
    headers: { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*", "Cache-Control": "public, max-age=3600" },
  });
}
