# Free Agent Tools: free remote MCP server

<!-- mcp-name: io.github.sean0007/free-agent-tools -->

A free, no-auth **remote MCP server** (streamable HTTP) with 39 small, deterministic tools your AI agent can call:
startup pitch roasting, business idea scoring, price headroom, hotel OTA commission, open-source swaps for SaaS bills,
Google Ads / Meta Ads notice risk, App Store 4.2 / 4.3 precheck, faceless YouTube reality check,
AI infrastructure bottlenecks, viral attention patterns, Japan trip planning, Japan tax-free refund checking, Japan visa / residence permit fees, Japan luggage rules / forwarding cost, the Kyushu travel discount (九州ふっこう応援割), the Japan customs duty-free allowance on arrival, Japan pre-entry TB screening (JPETS), Japan dual pricing (resident vs non-resident prices), a Japan emergency alert decoder (緊急地震速報, tsunami, the level-named warnings since 2026-05-29, 避難指示, J-ALERT), a Japan permanent residence (永住) guideline check for the 2026-10-01 revision, a Japan international postage calculator (Japan Post prices now vs from 2027-02-01), a Japan re-entry deadline check (みなし再入国 / re-entry permit / pending renewal), and a Japan overseas dependents check (国外居住親族: age bands, ¥380,000 remittance rule, 2026 income limit), a Japan part-time work check (資格外活動許可: which statuses may take which jobs, 28-hour rule with rolling 7-day windows, the 2026-10-01 pachinko change for dependents), a Japan driving check (Geneva IDP vs translation vs no route by country, 1-year and 3-month rules, 外免切替 after 2025-10-01), an Airbnb house rules check (likely-not-allowed rules and checkout tasks for bookings from 2026-11-20, rewrites, Japan 民泊 guest-register exceptions), a Japan My Number Card expiry check (foreign residents' card ends with the period of stay: city-hall deadline, 2-month extension while a renewal is pending, 10th-birthday cap; e-certificate and マイナ保険証 grace), a Japan Highly Skilled Professional points calculator (高度人材ポイント: 70 vs 80 for the PR fast track, ¥3M floor, no-double-count rules, J-Skip), and a Japan pet quarantine check (dogs, cats, rabbits: 180-day wait, 40-day notice, detention days, the 2027-01-01 mandatory 14-day export application), and a Japan leaving-tax check (resident tax still owed under the January 1 rule, tax agent / 納税管理人, final-salary lump sum, 準確定申告 and 転出届 deadlines), and a Japan disaster prep check (the 防災庁 2026-11-02 emergency request as a household checklist: water, food and portable-toilet stockpile, 旧耐震 check, 5-point to-do).

**Endpoint:** `https://free-agent-tools.vercel.app/mcp`  
**Landing page with setup for every client:** https://free-agent-tools.vercel.app

No API key, no account, nothing to install. Results are rules of thumb and educational estimates, not financial,
legal, or investment advice, and every result carries a disclaimer for the user.

## Add it

**Claude Code**

```bash
claude mcp add --transport http free-agent-tools https://free-agent-tools.vercel.app/mcp
```

**Claude (desktop / web):** Settings → Connectors → Add custom connector → paste the URL.

**ChatGPT:** Settings → Apps & Connectors → Advanced → Developer mode → Create → paste the URL, no authentication.

**Cursor** (`~/.cursor/mcp.json`)

```json
{ "mcpServers": { "free-agent-tools": { "url": "https://free-agent-tools.vercel.app/mcp" } } }
```

**VS Code** (`.vscode/mcp.json`)

```json
{ "servers": { "free-agent-tools": { "type": "http", "url": "https://free-agent-tools.vercel.app/mcp" } } }
```

**Windsurf** (`~/.codeium/windsurf/mcp_config.json`)

```json
{ "mcpServers": { "free-agent-tools": { "serverUrl": "https://free-agent-tools.vercel.app/mcp" } } }
```

**Stdio-only clients**

```json
{ "mcpServers": { "free-agent-tools": { "command": "npx", "args": ["-y", "mcp-remote", "https://free-agent-tools.vercel.app/mcp"] } } }
```

## Tools

| Tool | What it does |
|---|---|
| `roast_pitch` | Roast a startup pitch (five judges, one verdict, one change) |
| `score_business_idea_moat` | Score a business idea (MOAT: fund, fix, or flee) |
| `price_headroom_check` | Price headroom from close rate |
| `thirty_day_cash_check` | Do customers fund growth? (30-day cash) |
| `email_list_reactivation_value` | What is an old email list worth? |
| `hotel_ota_commission_calculator` | Hotel OTA commission and direct-booking savings |
| `saas_self_host_savings` | Replace paid SaaS with open source: savings and payback |
| `list_open_source_saas_alternatives` | List open-source alternatives to paid SaaS |
| `ads_policy_notice_risk_check` | Google Ads / Meta Ads notice risk card |
| `app_store_wrapper_precheck` | App Store 4.2 / 4.3 / metadata rejection precheck |
| `faceless_youtube_reality_check` | Faceless / AI YouTube channel reality check |
| `ai_infrastructure_bottlenecks` | AI infrastructure bottlenecks explained |
| `ai_bottleneck_quiz` | Which AI bottleneck constrains your stack? (quiz) |
| `viral_attention_patterns` | How attention spreads online |
| `viral_attention_quiz` | Do you chase, invent, or read attention? (quiz) |
| `japan_trip_plan` | Japan trip plan by city and month |
| `japan_trip_options` | Japan Trip Brain: supported cities, months, travelers |
| `japan_tax_free_refund_check` | Japan tax-free shopping refund check (from 2026-11-01) |
| `japan_visa_fee_check` | Japan visa / residence permit fee (from 2026-10-01) |
| `japan_luggage_check` | Japan suitcase check: Shinkansen oversized-baggage rule + Yamato forwarding cost |
| `kyushu_travel_discount_check` | Kyushu travel discount (九州ふっこう応援割 2026): savings + date/channel eligibility |
| `japan_customs_allowance_check` | Japan customs duty-free allowance on arrival: within/over, duty estimate in yen, cash declaration |
| `japan_tb_screening_check` | Japan pre-entry TB screening (JPETS): TB Clearance Certificate needed? Indonesia from 2027-01-04, exemptions, Panel Clinics |
| `japan_dual_pricing_check` | Japan dual pricing (二重価格): resident vs non-resident prices at Himeji Castle, Nijo Castle (FY2027), Kyoto bus, Kagoshima, Kitakyushu… Full tracker table and checker: https://japan-dual-pricing.vercel.app |
| `japan_emergency_alert_decode` | Japanese emergency alert decoder: 緊急地震速報 EEW (and cancellations), tsunami, レベル4危険警報 and the 2026-05-29 renaming, 避難指示, Nankai Trough, J-ALERT; meaning, level, what to do, 14-language official names |
| `japan_permanent_residency_check` | Japan permanent residence (永住) guideline revised 2026-10-01: which version applies by filing date, spouse 3+1 → 5+3 years from 2027-04-01, 3-year visa transition, 6-month / 2.5-year absence rule, B1 |
| `japan_international_postage_check` | Japan Post international mail prices now vs from 2027-02-01: EMS (1 kg bands), air / surface parcels, small packets, International Air Packet, letters, postcards; any country, cheapest option |
| `japan_reentry_deadline_check` | When must a foreign resident be back in Japan: deemed re-entry (1 year or card expiry, SPR 2 years, not extendable abroad), regular re-entry permit, 2-month special period while a renewal is pending |
| `japan_overseas_dependents_check` | Claiming a relative living outside Japan as a dependent (国外居住親族): age 16-29 / 30-69 / 70+ rules, ¥380,000 remittance test, 2026 ¥620,000 income limit, deduction amount, tax saving, proof documents |
| `japan_parttime_work_check` | Can a foreign resident do this part-time job / side gig on their Japanese status (資格外活動許可): comprehensive 28-hour vs individual permission, rolling 7-day hours, students' 8 h/day vacation rule, banned 風俗営業 venues, 2026-10-01 pachinko/game-center change for Dependent holders |
| `japan_driving_check` | Can you drive in Japan on a foreign license: Geneva IDP vs Japanese translation vs no route by country (NPA list, May 2026), last driving day (1 year from landing, IDP validity, 3-month rule), 外免切替 eligibility, test exemptions (incl. US states), documents, fees |
| `airbnb_house_rules_check` | Which Airbnb house rules / checkout tasks are likely not allowed for reservations booked from 2026-11-20 (dishes, stripping beds, trash off-site, fines, fees, amenity limits, contracts, ID, off-platform, rules after booking), EN/JA rewrites, standard rules to set, Japan guest-register (宿泊者名簿・旅券の写し) exception |
| `japan_my_number_card_expiry_check` | When a Japan My Number Card (マイナンバーカード) expires and what to do: foreign residents' card ends with the period of stay and is not extended by a visa renewal (city-hall deadline, one-time 2-month extension while pending, 10th-birthday cap, 特定在留カード), Japanese / PR / SPR 10th / 5th birthday and renewal window, e-certificate expiry, マイナ保険証 grace |
| `japan_hsp_points_check` | Japan Highly Skilled Professional (高度専門職 1号イ/ロ/ハ) points from the ordinance and ISA table: age / salary-by-age / education / experience / research / qualifications / position plus bonuses with no-double-count rules, ¥3M floor, 70 vs 80 (PR after 3 years vs 1 year), HSP ii, J-Skip, what could add points |
| `japan_pet_quarantine_check` | Japan pet import / export / round-trip dates for dogs, cats and rabbits from MAFF AQS rules: microchip → 2 rabies shots → antibody test → 180-day wait, designated regions, 40-day notice, vet check within 10 days, detention days if early, short-stay return, 14-day export application mandatory for dogs and rabbits from 2027-01-01 |
| `japan_leaving_tax_check` | Leaving Japan: which 住民税 fiscal years are still owed (January 1 assessment date; leave by December 31 to skip next year), tax agent (納税管理人) needed?, final-salary lump sum (mandatory for jobs ending Jan 1 – Apr 30), year-end adjustment / 準確定申告 deadline, previous-year return, exit-tax flag, 転出届 window, pension lump-sum claim deadline. No yen amounts |
| `japan_disaster_prep_check` | Japan's 防災庁 emergency request (事前防災徹底のための緊急要請, 2026-11-02) as a household checklist: drinking water 3 L, 3 meals and 5 portable-toilet uses per person per day for 3 days or a week, gap against what you have, pets 5–7+ days, old quake standard (旧耐震, 建築確認 before 1981-06-01) and pre-2000 wooden-house check, status of the 5 points |
| `japan_lost_item_check` | Lost something in Japan (wallet, phone, passport, residence card, bag, umbrella; train, subway, Shinkansen, taxi, airport, shop, street): steps in order, operator lost-and-found contact, police search by prefecture, 遺失物法 periods (3-month hold, 2-week umbrellas / clothing, facility hand-over 1 / 2 weeks, ¥100,000 high-value line), 5–20% reward, residence card 14-day reissue deadline |
| `japan_high_cost_medical_check` | Japan 高額療養費: monthly cap for your age and income band, what you really pay, refund, 4th-month 多数回 rate, the new Aug–Jul yearly cap (from Aug 2026), the same bill under the Aug 2027 12-band schedule, 2-year claim deadline; optional months tracker |

All tools are read-only and idempotent.

## Plain HTTP APIs

Every tool is also a free JSON API (GET or POST, CORS open, OpenAPI 3.1, `/.well-known/ai-plugin.json`, `llms.txt`):

| Site | OpenAPI |
|---|---|
| [Founder Scorecard](https://fund-fix-flee.vercel.app) | https://fund-fix-flee.vercel.app/openapi.json |
| [Hotel OTA Commission Calculator](https://hotel-ota-calculator.vercel.app) | https://hotel-ota-calculator.vercel.app/openapi.json |
| [SaaS Bill Cutter](https://saas-bill-cutter.vercel.app) | https://saas-bill-cutter.vercel.app/openapi.json |
| [Ads Risk Check](https://ads-risk-check.vercel.app) | https://ads-risk-check.vercel.app/openapi.json |
| [AppGate Pack](https://appgate-pack.vercel.app) | https://appgate-pack.vercel.app/openapi.json |
| [Faceless YT Reality Check](https://faceless-yt-risk-check.vercel.app) | https://faceless-yt-risk-check.vercel.app/openapi.json |
| [AI Bottleneck Map](https://ai-bottleneck-map.vercel.app) | https://ai-bottleneck-map.vercel.app/openapi.json |
| [Viral Attention Map](https://viral-attention-map.vercel.app) | https://viral-attention-map.vercel.app/openapi.json |
| [Pitch Roast](https://pitch-roast.vercel.app) | https://pitch-roast.vercel.app/openapi.json |
| [Japan Trip Brain](https://japan-trip-brain.vercel.app) | https://japan-trip-brain.vercel.app/openapi.json |
| [Japan Tax-Free Refund Checker](https://japan-tax-free-refund.vercel.app) | https://japan-tax-free-refund.vercel.app/openapi.json |
| [Japan Visa Fee Calculator](https://japan-visa-fee.vercel.app) | https://japan-visa-fee.vercel.app/openapi.json |
| [Japan Luggage Check](https://japan-luggage.vercel.app) | https://japan-luggage.vercel.app/openapi.json |
| [Kyushu Travel Discount Calculator](https://kyushu-travel-discount.vercel.app) | https://kyushu-travel-discount.vercel.app/openapi.json |
| [Japan Customs Allowance Checker](https://japan-customs-allowance.vercel.app) | https://japan-customs-allowance.vercel.app/openapi.json |
| [Japan TB Screening Check (JPETS)](https://japan-tb-screening.vercel.app) | https://japan-tb-screening.vercel.app/openapi.json |
| [Japan Dual Pricing Check](https://japan-dual-pricing.vercel.app) | https://japan-dual-pricing.vercel.app/openapi.json |
| [Japan Alert Decoder](https://japan-alert-decoder.vercel.app) | https://japan-alert-decoder.vercel.app/openapi.json |
| [Japan PR Guideline Check](https://japan-pr-check.vercel.app) | https://japan-pr-check.vercel.app/openapi.json |
| [Japan International Postage 2027](https://japan-intl-postage.vercel.app) | https://japan-intl-postage.vercel.app/openapi.json |
| [Japan Re-entry Deadline Check](https://japan-reentry-check.vercel.app) | https://japan-reentry-check.vercel.app/openapi.json |
| [Japan Overseas Dependents Check](https://japan-overseas-dependents.vercel.app) | https://japan-overseas-dependents.vercel.app/openapi.json |
| [Japan Part-time Work Check](https://japan-parttime-check.vercel.app) | https://japan-parttime-check.vercel.app/openapi.json |
| [Japan Driving Check](https://japan-driving-check.vercel.app) | https://japan-driving-check.vercel.app/openapi.json |
| [House Rules Check](https://house-rules-check.vercel.app) | https://house-rules-check.vercel.app/openapi.json |
| [Japan My Number Card Check](https://japan-mynumber-card-check.vercel.app) | https://japan-mynumber-card-check.vercel.app/openapi.json |
| [Japan HSP Points Calculator](https://japan-hsp-points.vercel.app) | https://japan-hsp-points.vercel.app/openapi.json |
| [Japan Pet Quarantine Check](https://japan-pet-quarantine.vercel.app) | https://japan-pet-quarantine.vercel.app/openapi.json |
| [Japan Leaving Tax Check](https://japan-leaving-tax.vercel.app) | https://japan-leaving-tax.vercel.app/openapi.json |
| [Japan Disaster Prep Check](https://japan-disaster-prep.vercel.app) | https://japan-disaster-prep.vercel.app/openapi.json |
| [Japan Lost Item Check](https://japan-lost-item.vercel.app) | https://japan-lost-item.vercel.app/openapi.json |
| [Japan High-Cost Medical Expense Check](https://japan-medical-cost-cap.vercel.app) | https://japan-medical-cost-cap.vercel.app/openapi.json |
- [Japan Job Loss Check](https://japan-job-loss.vercel.app)
- [Japan Visa Renewal Window Check](https://japan-visa-renewal.vercel.app)
- [Japan JLPT Level Check](https://japan-jlpt-check.vercel.app)
- [Japan Graduate Visa Check](https://japan-graduate-visa.vercel.app)

## Japan rules index (machine-readable)

One file with the thresholds, fees, effective dates and official sources behind every Japan rule tool: [/rules.json](https://free-agent-tools.vercel.app/rules.json) (human-readable: [/rules.md](https://free-agent-tools.vercel.app/rules.md)). It is copied from each tool's own `/api/rules`, which stays the live source of truth; rebuild with `python3 scripts/build-rules-index.py`. Educational summaries, not legal, tax or immigration advice.

## Test it

```bash
npx @modelcontextprotocol/inspector --cli https://free-agent-tools.vercel.app/mcp --transport http --method tools/list
```

## Develop

```bash
npm install
npm run dev        # http://localhost:3000/mcp
npm test           # schema and wiring tests
npm run e2e        # real MCP client: list tools and call every tool (defaults to production)
```

Built with Next.js and [`mcp-handler`](https://www.npmjs.com/package/mcp-handler) (MCP SDK v2; serves the
2026-07-28 spec natively with stateless fallback for 2025-era Streamable HTTP clients). Deployed on Vercel.

## License

MIT
