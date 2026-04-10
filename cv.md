# Kottala Samuel

**Hyderabad, Telangana, India** | +91-9652308330  
kottala.samuel@gmail.com | linkedin.com/in/kottala-samuel | github.com/Sam-096 | kottalasamuel.netlify.app

---

## Profile Summary

Full Stack Developer with 2+ years of experience building production-ready SaaS applications. Primary expertise in frontend and full stack development using Angular, React, Node.js, SQL, and REST APIs. Delivered admin dashboards, role-based systems, reporting views, and workflow-driven applications across job portals, matrimonial platforms, e-commerce, and accounting SaaS. Hands-on data analysis and reporting experience using SQL, Python, Tableau, and Power BI across warehouse operations, finance, and education domains. Actively integrates AI tools and LLMs into production systems.

---

## Technical Skills

**Languages:** JavaScript, TypeScript, Python, SQL  
**Frontend:** React, Angular 16+, Material UI, PrimeNG, Tailwind CSS, SCSS, HTML5, CSS3  
**Backend & APIs:** Node.js, Express.js, Flask, Spring Boot (basics), RESTful APIs  
**Databases:** PostgreSQL 16, MySQL, MongoDB, IBM DB2, Supabase, Cloud SQL  
**BI & Analytics:** Tableau, Power BI (Dashboards & Reports), Excel, Google Sheets, Recharts  
**ML & NLP:** Python (Pandas, NumPy, NLTK), TF-IDF, DistilBERT, Sentence Transformers (MiniLM), Cosine Similarity  
**Data Engineering:** ETL pipelines, CSV/SQL dump processing, Redis caching, CRON automation, aggregation queries  
**AI & LLM:** LLM prompt engineering, PromptContextService (live data injection into LLM prompts), IBM Watson, Groq, Sarvam AI, Ollama  
**Cloud & Deployment:** Azure, GCP, IBM Cloud, Render, Netlify, Hugging Face Spaces  
**Tools:** Git, GitHub, Swagger, cPanel, Figma collaboration, RxJS, Observables, NgRx, state management  
**Practices:** Agile, responsive UI, lazy loading, role-based access, modular component architecture  

---

## Professional Experience

### Full Stack Developer [React / Node.js / AI]
**ALX Solutions** | Nov 2024 – Present | Remote

- Led frontend development for **ALX Books**, a GST-compliant accounting SaaS — built dashboards, reports, invoice flows, ledger summaries, GSTR/ITR compliance status, and audit logs backed by SQL views.
- Designed a **normalized PostgreSQL 16 schema** for Godown AI (warehouse management system) covering inward/outward tracking, bay-level inventory, gate pass automation, bonds management with expiry alerts, and multi-role workflows.
- Built **PromptContextService** — a live data injection pipeline that executed real-time SQL aggregation queries on warehouse data and injected structured metrics (pending GRNs, stock below threshold) into LLM prompts, eliminating AI hallucinations by grounding responses in live operational data.
- Automated daily executive reporting: inward registers, bay-level stock positions, and summary reports exportable to PDF and Excel.
- Architected a **normalized MySQL database** for EAMCET student admissions managing thousands of student records, call logs, and staff assignments with optimized indexing (idx_hall_ticket) for fast querying.
- Calculated live business KPIs — Student Conversion Rate, Completion Rate, Faculty Performance — through complex SQL JOINs and aggregations delivered into a React admin dashboard.
- Managed extraction and loading of large raw datasets (CSV files, SQL dumps over 1.2 MB), resolving MySQL version compatibility and utf8mb4 collation issues during migration.
- Implemented **Redis caching** for high-frequency read data, significantly reducing dashboard load times in real-time warehouse analytics.
- Deployed data APIs to Render Cloud with secure environment variable management; configured CRON jobs for automated keep-alive scripts and scheduled notifications.
- Currently developing a modular AI-powered assistant for Warehouse Management Systems using Java (Spring Boot), Angular, Sarvam AI, and Ollama — focused on workflow automation and domain-specific model fine-tuning.

### Application Developer [Angular / Frontend]
**JOJO Techland** | Nov 2023 – Nov 2024 | Hyderabad, Telangana

- Developed UI for **Job Portal, Matrimonial, and E-commerce SaaS platforms** using Angular 16+, PrimeNG.
- Built admin, super-admin, vendor, recruiter, and user modules with role-based access and protected routing.
- Implemented CRUD workflows, dashboards, interview scheduling, job posting, matchmaking, and seller management systems.
- Integrated complex REST APIs, handled JSON data, Swagger contracts, and environment configuration.
- Used RxJS, Observables, lifecycle hooks, state management patterns, and reusable shared services.
- Collaborated with Figma design teams, backend (Node.js), and mobile (Ionic) teams to ensure feature parity across web and mobile.

### Data Analyst Intern
**Smart Bridge** | Feb 2023 – Jul 2023 | Hyderabad, Telangana

- Analyzed business datasets using SQL and built interactive dashboards in Tableau and Google Sheets, translating raw operational data into KPIs, trends, and anomaly flags for stakeholders.
- Performed exploratory data analysis, cleaned datasets, documented business insights for project reviews.
- Developed a **cloud-based chatbot** using IBM Watson, Flask backend, and DB2 for data storage, deployed on IBM Cloud.
- Executed full-stack projects in IBM Cloud focusing on data-driven web apps and data exploration.

---

## Key Projects

### AI-Driven IT Service Desk Analytics — 47,837 Tickets Analyzed
**Stack:** Python, Pandas, NLTK, Scikit-learn, DistilBERT, TF-IDF, Sentence Transformers, Gradio  
**Live:** https://huggingface.co/spaces/SamuelKottala096/itticket-classifier

- Extracted and profiled 47,837 IT support tickets from CSV using Pandas, identifying class imbalances across 8 operational categories (Hardware, Access, HR Support, etc.).
- Built a comprehensive NLP preprocessing pipeline: HTML stripping, sensitive data masking, tokenization, stopword removal, lemmatization.
- Engineered TF-IDF sparse matrices and 768-dimensional DistilBERT contextual embeddings; benchmarked 5 classification models — **DistilBERT achieved 91% F1-score** vs. SVM at 82%.
- Implemented a semantic search engine using 384-dimensional Sentence Transformer (MiniLM) embeddings and Cosine Similarity to retrieve top 3 historically similar tickets for agent decision support.
- Deployed a real-time interactive analytics dashboard via Hugging Face Spaces using Gradio, enabling side-by-side model comparison with live confidence scores and F1 metrics.

### Godown AI — Warehouse Analytics & Management System
**Stack:** PostgreSQL 16, Spring Boot, Redis, SQL, REST APIs, LLMs (Groq/Sarvam AI), Angular  
**Live:** https://ingodam.com

- Architected a normalized PostgreSQL 16 database schema for complex warehouse operations: inward/outward tracking, bay-level inventory, gate passes, bond expiries.
- Developed complex SQL aggregations for live operational KPIs: pending GRNs, stock depletion alerts, daily vehicle turnaround times.
- Built PromptContextService — live data injection pipeline that grounded LLM responses in real warehouse data, **eliminating hallucinations completely**.
- Engineered data extraction modules for daily inventory summaries and inward registers exportable to PDF and Excel.
- Implemented Redis caching for high-frequency reads, significantly reducing analytics dashboard latency.

### EAMCET Admission Funnel Analytics — SVCN College of Engineering
**Stack:** MySQL, SQL Aggregations, Node.js (ETL), React Dashboards

- Extracted, cleaned, and migrated raw student exam datasets (CSV files and SQL dumps) into a structured MySQL database.
- Wrote advanced SQL JOINs and aggregations for live funnel metrics: Student Conversion Rates, drop-offs, counselor performance KPIs.
- Delivered processed metrics to an interactive admin dashboard with automated PDF report generation for college management.

### ALX Books — GST-Compliant Accounting SaaS
**Stack:** React, Node.js, SQL, REST APIs

- Built financial dashboards with SQL-backed views for invoice flows, ledger summaries, GSTR/ITR compliance status, and audit logs.
- Designed data-driven UI for financial analysis enabling real-time reporting and structured accounting workflows aligned with compliance standards.

### Portfolio Site
**Live:** https://kottalasamuel.netlify.app  
**Stack:** React, Netlify

---

## Education

**Bachelor of Engineering in Information Technology**  
MVSR Engineering College, Osmania University | 2019 – 2023 | GPA: 7.1
