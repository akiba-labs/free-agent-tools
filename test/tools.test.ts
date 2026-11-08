import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { SITES, TOOLS, callToolApi } from "../lib/tools";

test("tool names are unique and valid MCP names", () => {
  const names = TOOLS.map((t) => t.name);
  assert.equal(new Set(names).size, names.length);
  for (const n of names) assert.match(n, /^[a-z0-9_]{1,64}$/);
});

for (const tool of TOOLS) {
  test(`${tool.name}: example input satisfies its schema`, () => {
    const r = tool.inputSchema.safeParse(tool.example);
    assert.ok(r.success, JSON.stringify(r.error?.issues));
    assert.ok(SITES[tool.site], "site exists");
  });
}

test("callToolApi POSTs JSON to the tool's public API", async () => {
  let seen: { url: string; init?: RequestInit } | undefined;
  const fake = (async (url: string, init?: RequestInit) => {
    seen = { url, init };
    return new Response(JSON.stringify({ ok: 1, disclaimer: "d" }), { status: 200 });
  }) as unknown as typeof fetch;
  const tool = TOOLS.find((t) => t.name === "thirty_day_cash_check")!;
  const r = await callToolApi(tool, tool.example, fake);
  assert.equal(seen?.url, "https://fund-fix-flee.vercel.app/api/cash");
  assert.equal(seen?.init?.method, "POST");
  assert.deepEqual(JSON.parse(String(seen?.init?.body)), tool.example);
  assert.equal(r.ok, true);
  assert.equal(r.data.disclaimer, "d");
});

test("japan_customs_allowance_check on the customs site", async () => {
  const t = TOOLS.find((x) => x.name === "japan_customs_allowance_check");
  assert.ok(t);
  assert.equal(SITES[t.site].url, "https://japan-customs-allowance.vercel.app");
  assert.equal(t.path, "/api/check");
});

test("japan_tb_screening_check on the JPETS site", async () => {
  const t = TOOLS.find((x) => x.name === "japan_tb_screening_check");
  assert.ok(t);
  assert.equal(SITES[t.site].url, "https://japan-tb-screening.vercel.app");
  assert.equal(t.path, "/api/check");
  assert.equal(t.inputSchema.safeParse(t.example).success, true);
});

test("japan_dual_pricing_check on the dual pricing site", async () => {
  const t = TOOLS.find((x) => x.name === "japan_dual_pricing_check");
  assert.ok(t);
  assert.equal(SITES[t.site].url, "https://japan-dual-pricing.vercel.app");
  assert.equal(t.path, "/api/check");
  assert.equal(t.inputSchema.safeParse(t.example).success, true);
});

test("japan_emergency_alert_decode on the alert decoder site", async () => {
  const t = TOOLS.find((x) => x.name === "japan_emergency_alert_decode");
  assert.ok(t);
  assert.equal(SITES[t.site].url, "https://japan-alert-decoder.vercel.app");
  assert.equal(t.path, "/api/decode");
  assert.equal(t.inputSchema.safeParse(t.example).success, true);
  assert.equal(t.inputSchema.safeParse({ alert: "l4-landslide", lang: "vi" }).success, true);
  assert.equal(t.inputSchema.safeParse({ text: "x", situation: "moon" }).success, false);
});

test("japan_permanent_residency_check on the PR check site", async () => {
  const t = TOOLS.find((x) => x.name === "japan_permanent_residency_check");
  assert.ok(t);
  assert.equal(SITES[t.site].url, "https://japan-pr-check.vercel.app");
  assert.equal(t.path, "/api/check");
  assert.equal(t.inputSchema.safeParse(t.example).success, true);
  assert.equal(t.inputSchema.safeParse({ route: "general", trips: [{ depart: "2020-01-10", return: "2020-07-10" }], japaneseB1: true }).success, true);
  assert.equal(t.inputSchema.safeParse({ applicationDate: "2027-01-01" }).success, false);
});

test("japan_international_postage_check on the postage site", async () => {
  const t = TOOLS.find((x) => x.name === "japan_international_postage_check");
  assert.ok(t);
  assert.equal(SITES[t.site].url, "https://japan-intl-postage.vercel.app");
  assert.equal(t.path, "/api/check");
  assert.equal(t.inputSchema.safeParse(t.example).success, true);
  assert.equal(t.inputSchema.safeParse({ zone: 3, weightKg: 1.2, service: "ems", shipDate: "2027-02-10" }).success, true);
  assert.equal(t.inputSchema.safeParse({ destination: "US", weightGrams: 40000 }).success, false);
  assert.equal(t.inputSchema.safeParse({ destination: "US", service: "rocket" }).success, false);
});

test("japan_reentry_deadline_check on the re-entry site", async () => {
  const t = TOOLS.find((x) => x.name === "japan_reentry_deadline_check");
  assert.ok(t);
  assert.equal(SITES[t.site].url, "https://japan-reentry-check.vercel.app");
  assert.equal(t.path, "/api/check");
  assert.equal(t.inputSchema.safeParse(t.example).success, true);
  assert.equal(t.inputSchema.safeParse({ status: "permanent", departureDate: "2026-12-25" }).success, true);
  assert.equal(t.inputSchema.safeParse({ status: "alien", departureDate: "2026-12-25" }).success, false);
  assert.equal(t.inputSchema.safeParse({ status: "mid_long" }).success, false);
});

test("japan_overseas_dependents_check on the dependents site", async () => {
  const t = TOOLS.find((x) => x.name === "japan_overseas_dependents_check");
  assert.ok(t);
  assert.equal(SITES[t.site].url, "https://japan-overseas-dependents.vercel.app");
  assert.equal(t.path, "/api/check");
  assert.equal(t.inputSchema.safeParse(t.example).success, true);
  assert.equal(t.inputSchema.safeParse({ relationship: "child", age: 20, method: "credit_card" }).success, true);
  assert.equal(t.inputSchema.safeParse({ relationship: "cousin", age: 40 }).success, false);
  assert.equal(t.inputSchema.safeParse({ age: 40 }).success, false);
});

test("japan_parttime_work_check on the parttime site", async () => {
  const t = TOOLS.find((x) => x.name === "japan_parttime_work_check");
  assert.ok(t);
  assert.equal(SITES[t.site].url, "https://japan-parttime-check.vercel.app");
  assert.equal(t.path, "/api/check");
  assert.equal(t.inputSchema.safeParse(t.example).success, true);
  assert.equal(t.inputSchema.safeParse({ status: "student", job: "convenience_store", dailyHours: "8v,8v,4" }).success, true);
  assert.equal(t.inputSchema.safeParse({ status: "alien", job: "restaurant" }).success, false);
  assert.equal(t.inputSchema.safeParse({ status: "student" }).success, false);
});

test("japan_driving_check on the driving site", async () => {
  const t = TOOLS.find((x) => x.name === "japan_driving_check");
  assert.ok(t);
  assert.equal(SITES[t.site].url, "https://japan-driving-check.vercel.app");
  assert.equal(t.path, "/api/check");
  assert.equal(t.inputSchema.safeParse(t.example).success, true);
  assert.equal(t.inputSchema.safeParse({ country: "AU", residency: "resident", entryDate: "2025-11-01", trips: "2026-06-01_2026-09-01", monthsInIssuingCountry: 24 }).success, true);
  assert.equal(t.inputSchema.safeParse({ country: "US", entryDate: "next week" }).success, false);
  assert.equal(t.inputSchema.safeParse({ document: "idp" }).success, false);
});

test("airbnb_house_rules_check on the houserules site", async () => {
  const t = TOOLS.find((x) => x.name === "airbnb_house_rules_check");
  assert.ok(t);
  assert.equal(SITES[t.site].url, "https://house-rules-check.vercel.app");
  assert.equal(t.path, "/api/check");
  assert.equal(t.inputSchema.safeParse(t.example).success, true);
  assert.equal(t.inputSchema.safeParse({ text: "ゴミは集積所に出してください。", lodging: "minpaku", bookingDate: "2026-11-25" }).success, true);
  assert.equal(t.inputSchema.safeParse({ text: "No pets", bookingDate: "next week" }).success, false);
  assert.equal(t.inputSchema.safeParse({ jurisdiction: "JP" }).success, false);
});

test("japan_my_number_card_expiry_check on the mynumber site", async () => {
  const t = TOOLS.find((x) => x.name === "japan_my_number_card_expiry_check");
  assert.ok(t);
  assert.equal(SITES[t.site].url, "https://japan-mynumber-card-check.vercel.app");
  assert.equal(t.path, "/api/check");
  assert.equal(t.inputSchema.safeParse(t.example).success, true);
  assert.equal(t.inputSchema.safeParse({ holder: "japanese", birthDate: "1985-01-20", cardIssueDate: "2017-02-01" }).success, true);
  assert.equal(t.inputSchema.safeParse({ holder: "mid_long", birthDate: "1992-04-10", cardIssueDate: "2024-03-01", residenceExpiry: "2026-12-15", renewal: "granted", newResidenceExpiry: "2031-12-15", specificCard: false }).success, true);
  assert.equal(t.inputSchema.safeParse({ holder: "tourist", birthDate: "1992-04-10", cardIssueDate: "2024-03-01" }).success, false);
  assert.equal(t.inputSchema.safeParse({ holder: "japanese", birthDate: "April 1992", cardIssueDate: "2024-03-01" }).success, false);
});

test("japan_hsp_points_check on the hsp site", async () => {
  const t = TOOLS.find((x) => x.name === "japan_hsp_points_check");
  assert.ok(t);
  assert.equal(SITES[t.site].url, "https://japan-hsp-points.vercel.app");
  assert.equal(t.path, "/api/check");
  assert.equal(t.inputSchema.safeParse(t.example).success, true);
  assert.equal(t.inputSchema.safeParse({ category: "management", education: "mba", experienceYears: 10, annualSalaryMan: 1500, position: "representative" }).success, true);
  assert.equal(t.inputSchema.safeParse({ category: "academic", age: 36, education: "doctor", experienceYears: 7, annualSalary: 6500000, researchItems: 2, japaneseDegree: true }).success, true);
  assert.equal(t.inputSchema.safeParse({ category: "engineer", education: "master" }).success, false);
  assert.equal(t.inputSchema.safeParse({ category: "specialized", education: "phd" }).success, false);
  assert.equal(t.inputSchema.safeParse({ category: "specialized", education: "master", birthDate: "1990/01/01" }).success, false);
});

test("japan_pet_quarantine_check on the pet site", async () => {
  const t = TOOLS.find((x) => x.name === "japan_pet_quarantine_check");
  assert.ok(t);
  assert.equal(SITES[t.site].url, "https://japan-pet-quarantine.vercel.app");
  assert.equal(t.path, "/api/check");
  assert.equal(t.inputSchema.safeParse(t.example).success, true);
  assert.equal(t.inputSchema.safeParse({ direction: "export", species: "dog", departureDate: "2027-01-10" }).success, true);
  assert.equal(t.inputSchema.safeParse({ direction: "import", species: "cat", country: "Hawaii", residentSinceBirth: true, arrivalDate: "2027-01-15" }).success, true);
  assert.equal(t.inputSchema.safeParse({ direction: "fly", species: "dog" }).success, false);
  assert.equal(t.inputSchema.safeParse({ direction: "import", species: "hamster" }).success, false);
  assert.equal(t.inputSchema.safeParse({ direction: "import", species: "dog", arrivalDate: "15/06/2027" }).success, false);
});

test("japan_leaving_tax_check on the leaving site", async () => {
  const t = TOOLS.find((x) => x.name === "japan_leaving_tax_check");
  assert.ok(t);
  assert.equal(SITES[t.site].url, "https://japan-leaving-tax.vercel.app");
  assert.equal(t.path, "/api/check");
  assert.equal(t.inputSchema.safeParse(t.example).success, true);
  assert.equal(t.inputSchema.safeParse({ departureDate: "2027-01-15", employment: "self_employed", hasTaxAgent: true, pensionMonths: 30 }).success, true);
  assert.equal(t.inputSchema.safeParse({ departureDate: "2027-02-01", plan: "short" }).success, true);
  assert.equal(t.inputSchema.safeParse({}).success, false);
  assert.equal(t.inputSchema.safeParse({ departureDate: "20/03/2027" }).success, false);
  assert.equal(t.inputSchema.safeParse({ departureDate: "2027-03-20", payMethod: "cash" }).success, false);
});

test("japan_disaster_prep_check on the disaster site", async () => {
  const t = TOOLS.find((x) => x.name === "japan_disaster_prep_check");
  assert.ok(t);
  assert.equal(SITES[t.site].url, "https://japan-disaster-prep.vercel.app");
  assert.equal(t.path, "/api/check");
  assert.equal(t.inputSchema.safeParse(t.example).success, true);
  assert.equal(t.inputSchema.safeParse({}).success, true);
  assert.equal(t.inputSchema.safeParse({ adults: 1, builtYear: "昭和54", tenure: "rent", haveWaterLiters: 6, cats: 1 }).success, true);
  assert.equal(t.inputSchema.safeParse({ adults: 1.5 }).success, false);
  assert.equal(t.inputSchema.safeParse({ days: 0 }).success, false);
  assert.equal(t.inputSchema.safeParse({ buildingType: "castle" }).success, false);
  assert.equal(t.inputSchema.safeParse({ permitDate: "1981/06/01" }).success, false);
});

test("japan_lost_item_check on the lost site", async () => {
  const t = TOOLS.find((x) => x.name === "japan_lost_item_check");
  assert.ok(t);
  assert.equal(SITES[t.site].url, "https://japan-lost-item.vercel.app");
  assert.equal(t.path, "/api/check");
  assert.equal(t.inputSchema.safeParse(t.example).success, true);
  assert.equal(t.inputSchema.safeParse({}).success, true);
  assert.equal(t.inputSchema.safeParse({ items: "財布,スマホ", place: "taxi", visitor: true, valueJPY: 30000 }).success, true);
  assert.equal(t.inputSchema.safeParse({ place: "moon" }).success, false);
  assert.equal(t.inputSchema.safeParse({ lostDate: "01/11/2026" }).success, false);
  assert.equal(t.inputSchema.safeParse({ valueJPY: -1 }).success, false);
});

test("japan_job_loss_check on the jobloss site", async () => {
  const t = TOOLS.find((x) => x.name === "japan_job_loss_check");
  assert.ok(t);
  assert.equal(SITES[t.site].url, "https://japan-job-loss.vercel.app");
});

test("41 tools, v1.25.0, japan_visa_renewal_check on the renewal site", async () => {
  assert.equal(TOOLS.length, 41);
  for (const f of ["package.json", "server.json", "public/server.json"]) assert.equal(JSON.parse(readFileSync(f, "utf8")).version, "1.25.0", f);
  const t = TOOLS.find((x) => x.name === "japan_visa_renewal_check");
  assert.ok(t);
  assert.equal(SITES[t.site].url, "https://japan-visa-renewal.vercel.app");
  assert.equal(t.path, "/api/check");
  assert.equal(t.inputSchema.safeParse(t.example).success, true);
  assert.equal(t.inputSchema.safeParse({ expiryDate: "2027-01-20", holder: "permanent", birthDate: "1985-06-02" }).success, true);
  assert.equal(t.inputSchema.safeParse({}).success, false);
  assert.equal(t.inputSchema.safeParse({ expiryDate: "2027-01-20", holder: "tourist" }).success, false);
});
