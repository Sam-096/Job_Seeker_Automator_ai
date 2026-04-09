# Mode: keywords — Keyword Intelligence Report

Reads all JDs from `data/` and `output/` folders, extracts every skill and requirement mentioned, cross-references against `cv.md`, and outputs a gap intelligence report.

## Workflow

```
1. COLLECT  → Find all JD files in data/ and output/
2. EXTRACT  → Parse every skill, tool, and requirement from each JD
3. COUNT    → Tally frequency of each keyword across all JDs
4. GROUP    → Map each keyword to the relevant archetype track
5. COMPARE  → Check each keyword against cv.md (strong / weak / missing)
6. REPORT   → Write output/keyword-intelligence.md
7. SUMMARY  → Print top 10 Critical Gaps in terminal
```

## Step 1 — Collect JD sources

Search for JD text in:
- `data/pipeline.md` — pending URLs (fetch JD text if URL is live)
- `data/applications.md` — all evaluated offers (use stored summaries)
- `jds/*.md` — manually saved JDs
- `reports/*.md` — all report files (extract JD section from each)
- `output/*.md` — any output files containing JD text

Read `cv.md` for cross-referencing.
Read `config/profile.yml` for the candidate's archetypes.

## Step 2 — Extract keywords

For each JD, extract:
- Programming languages (Python, JavaScript, TypeScript, SQL, etc.)
- Frameworks and libraries (React, Angular, Node.js, Express, FastAPI, etc.)
- Tools and platforms (Power BI, Tableau, PostgreSQL, MongoDB, Docker, Git, etc.)
- AI/ML keywords (LLM, OpenAI API, Claude API, RAG, LangChain, prompt engineering, etc.)
- Soft skills demanded explicitly (stakeholder communication, data storytelling, etc.)
- Certifications mentioned (AWS, Azure, GCP, etc.)
- Role requirements (years of experience, degree requirements, etc.)

## Step 3 — Count and rank

For each keyword:
- Count how many JDs mention it
- Calculate frequency percentage = count / total JDs * 100
- Sort by frequency descending

## Step 4 — Group by archetype track

Map each keyword to one or more of Samuel's archetypes:
- `data-analyst`: SQL, Python, Excel, Power BI, Tableau, data cleaning, KPI, dashboards
- `bi-analyst`: Power BI, DAX, Tableau, data modeling, business storytelling, SQL
- `fullstack-react-node`: React, Node.js, Express, REST APIs, PostgreSQL, MongoDB, TypeScript, Git
- `angular-developer`: Angular, TypeScript, RxJS, Angular Material, NgRx, unit testing
- `ai-integration-engineer`: LLM APIs, Claude API, OpenAI API, prompt engineering, RAG, Playwright, Telegram bots
- `llm-chatbot-developer`: chatbot, LangChain, Telegram Bot API, webhook, intent detection, conversation flows

## Step 5 — Compare against cv.md

For each keyword, classify:
- **STRONG**: present in cv.md with specific project proof (KMEC LMS, Godown AI, etc.)
- **WEAK**: mentioned in cv.md but without measurable proof or context
- **MISSING**: not in cv.md at all

## Step 6 — Write output/keyword-intelligence.md

```markdown
# Keyword Intelligence Report
Generated: {date} | JDs analysed: {N}

---

## Critical Gaps
Skills in high demand that are MISSING from your CV.
These are your highest-ROI learning targets.

| Rank | Keyword | Frequency | Archetype Track | Gap |
|------|---------|-----------|-----------------|-----|
| 1    | ...     | N JDs (X%)| ...             | MISSING |

---

## Weak Areas
Present in your CV but needs more evidence or metrics.

| Rank | Keyword | Frequency | Archetype Track | Status |
|------|---------|-----------|-----------------|--------|
| 1    | ...     | N JDs (X%)| ...             | WEAK |

---

## Strengths
You have strong evidence AND the market wants it.

| Rank | Keyword | Frequency | Archetype Track | Status |
|------|---------|-----------|-----------------|--------|
| 1    | ...     | N JDs (X%)| ...             | STRONG |

---

## Learning Priority Recommendations

Ranked by (frequency × salary impact):

1. **{top gap skill}** — appears in X% of JDs, salary uplift: HIGH
   Action: [specific learning resource or project to build]

2. ...

---

## Per-Archetype Summary

### data-analyst
- Strengths: ...
- Gaps: ...

### fullstack-react-node
- Strengths: ...
- Gaps: ...

[... repeat for each archetype ...]
```

## Step 7 — Terminal summary

After writing the file, print:

```
Keyword Intelligence — Top 10 Critical Gaps
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
JDs analysed: N

  #1  {skill}        — N JDs (X%) | MISSING | Track: {archetype}
  #2  {skill}        — N JDs (X%) | MISSING | Track: {archetype}
  ...

Full report: output/keyword-intelligence.md
→ Study the top gap skill this weekend.
```

## Notes

- If fewer than 3 JDs are available, warn: "Too few JDs for reliable analysis. Run /career-ops scan first."
- Deduplicate keyword variants (e.g. "Node JS", "Node.js", "NodeJS" → "Node.js")
- Case-insensitive matching throughout
- Do NOT modify cv.md or any source files
