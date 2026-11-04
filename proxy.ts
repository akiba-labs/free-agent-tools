import { NextResponse, type NextRequest } from "next/server";
import { homeMarkdown, notFoundMarkdown } from "@/lib/agent-md";

const PAGES = new Set(["/", "/pro", "/checklist"]);
const PREFIXES = ["/pro/yes/", "/checklist/download"];

// Markdown negotiation for agents: Accept: text/markdown gets Markdown on "/" and a Markdown 404 on unknown paths.
export function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const wantsMd = (req.headers.get("accept") || "").includes("text/markdown");
  const known = PAGES.has(path) || PREFIXES.some((p) => path.startsWith(p));
  const md = { "Content-Type": "text/markdown; charset=utf-8", Vary: "Accept", "Access-Control-Allow-Origin": "*" };
  if (wantsMd && path === "/") return new NextResponse(homeMarkdown(), { status: 200, headers: md });
  if (wantsMd && !known) return new NextResponse(notFoundMarkdown(path), { status: 404, headers: md });
  const res = NextResponse.next();
  if (path === "/") res.headers.set("Vary", "Accept");
  return res;
}

export const config = { matcher: ["/((?!_next|mcp|api|\\.well-known|.*\\..*).*)"] };
