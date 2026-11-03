#!/usr/bin/env python3
"""Build the Japan trip pre-arrival checklist (HTML + PDF) from public/rules.json.
Every fact is copied from a tool's live rules (no hand-typed numbers). Usage: python3 scripts/build-checklist.py"""
import json, html, subprocess, datetime as dt, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
d = json.load(open(root / 'public/rules.json'))
T = {t['id']: t for t in d['tools']}
def R(i): return T[i]['rules']
yen = lambda n: f"¥{n:,}"
c = R('japan-customs-allowance'); a = c['allowancePerAdult']
items = [
 ('Before you fly', 'japan-tb-screening', 'TB screening: who needs it', [R('japan-tb-screening')['whoIsCovered']]),
 ('Before you fly', 'japan-driving-check', 'Driving in Japan', [R('japan-driving-check')['shortTerm']['routes']['idp'], R('japan-driving-check')['shortTerm']['routes']['translation'], R('japan-driving-check')['shortTerm']['period']]),
 ('Before you fly', 'japan-pet-quarantine', 'Bringing a pet', ['Dogs and cats need a microchip, rabies shots, an antibody test and advance notice; from most countries the process takes months. Check your route on the tool before booking.']),
 ('At arrival', 'japan-customs-allowance', 'Duty-free allowance per adult', [
   f"Alcohol: {a['alcohol']['bottles']} bottles of about {a['alcohol']['mlPerBottle']} ml.",
   f"Cigarettes: {a['tobacco']['cigarettes']}; cigars: {a['tobacco']['cigars']}; heat-not-burn: {a['tobacco']['heatNotBurnPackages']} packages.",
   f"Perfume: {a['perfume']['ounces']} oz (about {a['perfume']['approxMl']} ml). {a['perfume']['note']}",
   f"Other goods: {yen(a['otherGoods']['totalOverseasValueJPY'])} total overseas value. {a['otherGoods']['smallItemRule']}",
   f"Cash and other means of payment over {yen(c['cash']['thresholdJPY'])}: declare on the \"{c['cash']['form']}\"."]),
 ('Getting around', 'japan-luggage', 'Big suitcases on the Shinkansen', [R('japan-luggage')['shinkansen']['reservationRule']]),
 ('Getting around', 'japan-dual-pricing', 'Visitor vs resident prices', R('japan-dual-pricing')['keyFacts'][:2]),
 ('Safety', 'japan-alert-decoder', 'Weather warning levels', [R('japan-alert-decoder')['summary']]),
 ('Shopping and leaving', 'japan-tax-free-refund', 'Tax-free shopping (refund method)', [R('japan-tax-free-refund')['summary']] + R('japan-tax-free-refund')['checklist']),
]
sec, out = None, []
for s, tid, title, lines in items:
    if s != sec: out.append(f'<h2>{html.escape(s)}</h2>'); sec = s
    t = T[tid]; asof = t.get('rulesAsOf') or t['rules'].get('dataAsOf') or 'see tool'
    hosts = list(dict.fromkeys(u.split('/')[2] for u in t['officialSources']))[:3]
    src = ' · '.join(f'<a href="https://{h}">{h}</a>' for h in hosts)
    out.append(f'<div class="item"><h3>☐ {html.escape(title)}</h3><ul>' + ''.join(f'<li>{html.escape(l)}</li>' for l in lines) +
               f'</ul><p class="src">Check yours: <a href="{t["site"]}">{t["site"].split("//")[1]}</a> · rules as of {asof} · official: {src}</p></div>')
gen = dt.date.today().isoformat()
page = f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Japan trip pre-arrival checklist</title>
<style>body{{font:11pt/1.45 -apple-system,Segoe UI,Helvetica,Arial,sans-serif;max-width:760px;margin:24px auto;color:#111}}h1{{font-size:20pt;margin:0}}h2{{font-size:13pt;border-bottom:2px solid #c2185b;margin:18px 0 6px}}h3{{font-size:11pt;margin:8px 0 2px}}ul{{margin:2px 0 2px 18px;padding:0}}.src{{font-size:8.5pt;color:#555;margin:2px 0 6px}}.item{{break-inside:avoid}}.note{{font-size:9pt;color:#444}}a{{color:#1a5fb4}}</style></head><body>
<h1>Japan trip pre-arrival checklist</h1><p class="note">Free, no signup. Generated {gen} from the official-source rules behind the free Japan tools at free-agent-tools.vercel.app. Rules change: tap each "Check yours" link before you travel.</p>
{''.join(out)}
<p class="note">{html.escape(d.get('disclaimer') or 'Educational summary, not legal, tax, or immigration advice.')}</p></body></html>'''
(root / 'public/japan-trip-checklist.html').write_text(page)
subprocess.run(['google-chrome', '--headless=new', '--no-sandbox', '--disable-gpu', '--no-pdf-header-footer',
    f'--print-to-pdf={root / "public/japan-trip-checklist.pdf"}', f'file://{root / "public/japan-trip-checklist.html"}'], check=True, capture_output=True)
print('ok', len(items), 'items')
