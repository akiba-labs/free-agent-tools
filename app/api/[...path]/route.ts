import { MCP_URL, SERVER_URL } from "@/lib/tools";

// Unknown /api/* paths answer with RFC 9457 problem JSON so agents can parse the error.
function problem(req: Request) {
  const path = new URL(req.url).pathname;
  return Response.json(
    {
      type: `${SERVER_URL}/llms.txt`,
      title: "Not Found",
      status: 404,
      code: "not_found",
      detail: `No API endpoint at ${path}.`,
      resolution: `Use the MCP endpoint ${MCP_URL} or a tool site's /api route listed in ${SERVER_URL}/llms.txt.`,
    },
    { status: 404, headers: { "Content-Type": "application/problem+json", "Access-Control-Allow-Origin": "*" } },
  );
}
export const GET = problem;
export const POST = problem;
