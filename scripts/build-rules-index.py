#!/usr/bin/env python3
"""Build public/rules.json + public/rules.md: one machine-readable index of the Japan rules
behind each free tool, pulled from each live site's own /api/rules (no hand-typed values)."""
import json, urllib.request, datetime as dt, sys
SITES = ["house-rules-check","japan-alert-decoder","japan-customs-allowance","japan-disaster-prep","japan-driving-check","japan-dual-pricing",
 "japan-hsp-points","japan-intl-postage","japan-leaving-tax","japan-lost-item","japan-luggage","japan-medical-cost-cap","japan-mynumber-card-check","japan-overseas-dependents",
 "japan-parttime-check","japan-pet-quarantine","japan-pr-check","japan-reentry-check","japan-tax-free-refund","japan-tb-screening",
 "japan-visa-fee","kyushu-travel-discount"]
def get(u):
    with urllib.request.urlopen(urllib.request.Request(u, headers={"User-Agent": "free-agent-tools-rules-index"}), timeout=20) as r:
        return json.loads(r.read())
def find(d, keys):
    if isinstance(d, dict):
        for k in keys:
            if k in d and isinstance(d[k], (str, int)): return d[k]
        for v in d.values():
            x = find(v, keys)
            if x: return x
    return None
def urls(d, acc):
    if isinstance(d, dict): [urls(v, acc) for v in d.values()]
    elif isinstance(d, list): [urls(v, acc) for v in d]
    elif isinstance(d, str) and d.startswith("http") and "vercel.app" not in d and d not in acc: acc.append(d)
    return acc
import re
NAMES = {m.group(2): m.group(1) for m in re.finditer(r"\[([^\]]+)\]\(https://([a-z0-9-]+)\.vercel\.app\)", open("README.md").read())}
tools, failed = [], []
for s in SITES:
    base = f"https://{s}.vercel.app"
    try: r = get(base + "/api/rules")
    except Exception as e: failed.append(f"{s}: {e}"); continue
    tools.append({"id": s, "name": NAMES.get(s, s), "site": base, "rulesEndpoint": base + "/api/rules",
        "checkEndpoint": base + "/openapi.json", "rulesAsOf": find(r, ["rulesAsOf", "asOf"]),
        "effective": find(r, ["effective", "effectiveDate", "policyStart"]), "officialSources": urls(r, []), "rules": r})
if failed: print("FAILED:", failed, file=sys.stderr)
idx = {"name": "Japan rules index (Free Agent Tools)", "version": 1,
  "generatedAt": dt.datetime.now(dt.timezone(dt.timedelta(hours=9))).isoformat(timespec="minutes"),
  "description": "Thresholds, fees, dates and official sources behind each free Japan rule-check tool, copied from each tool's own /api/rules. Each tool's rulesEndpoint is the live source of truth.",
  "license": "MIT (data facts from official Japanese government and company sources linked per tool)",
  "disclaimer": "Educational summaries, not legal, tax or immigration advice. Rules change; confirm with the official source linked for each rule before relying on it.",
  "mcp": "https://free-agent-tools.vercel.app/mcp", "tools": tools}
json.dump(idx, open("public/rules.json", "w"), ensure_ascii=False, indent=1)
md = ["# Japan rules index", "", f"Generated {idx['generatedAt']} from each tool's live `/api/rules`. Machine-readable: [/rules.json](https://free-agent-tools.vercel.app/rules.json).", "", idx["disclaimer"], "",
      "| Tool | Rules as of | Effective | Rules JSON | Official sources |", "|---|---|---|---|---|"]
for t in tools:
    md.append(f"| [{t['name']}]({t['site']}) | {t['rulesAsOf'] or '–'} | {t['effective'] or '–'} | [{t['id']}/api/rules]({t['rulesEndpoint']}) | {len(t['officialSources'])} |")
md += ["", "## Official sources by tool", ""]
for t in tools:
    md.append(f"### {t['name']}"); md += [f"- {u}" for u in t["officialSources"]]; md.append("")
open("public/rules.md", "w").write("\n".join(md))
print(len(tools), "tools,", sum(len(t["officialSources"]) for t in tools), "sources; failed", len(failed))
