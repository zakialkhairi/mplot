---
title: PRD — MPLOT

---

# PRD — MPLOT

### MPL ID S17 Playoff Probability Simulator & Standings Calculator

---

# 1. Product Overview

## Product Name

**MPLOT**

## Product Type

Web-based esports standings simulator and playoff probability calculator.

## Platform

Web Application

## Tech Stack

* Frontend Framework: [Next.js](https://nextjs.org?utm_source=chatgpt.com)
* UI Framework: [Tailwind CSS](https://tailwindcss.com?utm_source=chatgpt.com)
* Frontend Library: [React](https://react.dev?utm_source=chatgpt.com)
* State Management: React Context / Zustand
* Deployment Recommendation: [Vercel](https://vercel.com?utm_source=chatgpt.com)

## Font

Custom local font:
`fonnts.com-Eixample_Villa_Bold`

## Purpose

MPLOT memungkinkan user:

* Menginput hasil pertandingan MPL ID Season 17
* Melihat perubahan klasemen secara real-time
* Mengkalkulasi peluang lolos playoffs
* Mengkalkulasi peluang upper bracket
* Mengkalkulasi kemungkinan eliminasi
* Melakukan simulasi berbagai skenario pertandingan

---

# 2. Background

Ekosistem kompetitif Mobile Legends berkembang sangat besar di Indonesia. MPL ID menjadi liga tertinggi yang memiliki banyak penggemar dan skenario klasemen yang kompleks.

Banyak penonton:

* menghitung peluang playoffs secara manual
* membuat simulasi di spreadsheet
* menghitung tiebreak secara sulit

MPLOT hadir sebagai simulator interaktif yang:

* realtime
* visual
* mudah digunakan
* cepat melakukan simulasi skenario

---

# 3. Goals

## Primary Goals

* Membuat simulator klasemen MPL ID Season 17
* Mempermudah user melakukan simulasi hasil pertandingan
* Menampilkan status playoffs secara otomatis
* Menampilkan status upper bracket secara otomatis

## Secondary Goals

* Menjadi website utility komunitas MPL
* Menjadi tools diskusi klasemen
* Menjadi media share simulasi playoffs

---

# 4. Target Users

## Primary Users

* Penonton MPL ID
* Fans esports Mobile Legends
* Analis MPL
* Content creator esports
* Statistik enthusiast

## User Characteristics

* Familiar dengan format MPL
* Aktif mengikuti klasemen mingguan
* Sering membuat simulasi playoffs

---

# 5. Tournament Rules System

## Total Teams

9 tim:

* ONIC
* DEWA
* EVOS
* TLID
* AE
* BTR
* NAVI
* GEEK
* RRQ

---

## Match Format

Format pertandingan:

* Best of 3 (BO3)

Kemungkinan skor:

* 2-0
* 2-1
* 1-2
* 0-2

---

## Match Win Rules

Jika sebuah tim:

* menang 2-0 → match win +1
* menang 2-1 → match win +1

Jika kalah:

* match loss +1

---

## Playoff Qualification

* Top 6 lolos playoffs
* Bottom 3 eliminasi

---

## Upper Bracket Qualification

* Top 2 otomatis upper bracket
* Rank 3–6 masuk play-ins/lower bracket awal

---

# 6. Standings Table System

## Table Columns

| Column       | Description                   |
| ------------ | ----------------------------- |
| No           | Ranking tim                   |
| Team         | Nama dan logo tim             |
| Match Point  | Total kemenangan pertandingan |
| Match W-L    | Total match menang-kalah      |
| Net Game Win | Selisih game win-loss         |
| Game W-L     | Total game win-loss           |

---

# 7. Detailed Scoring Logic

---

## Match Point

### Formula

```txt
Match Point = jumlah kemenangan series
```

### Example

| Result | Match Point |
| ------ | ----------- |
| 2-0    | +1          |
| 2-1    | +1          |
| 1-2    | +0          |
| 0-2    | +0          |

---

## Match W-L

### Formula

```txt
Match W-L = total match menang - total match kalah
```

### Example

Jika tim:

* menang 5 match
* kalah 3 match

Maka:

```txt
5-3
```

---

## Game W-L

### Formula

```txt
Game W-L = total game menang - total game kalah
```

### Example

Jika hasil:

* 2-0
* 2-1
* 1-2

Maka:

```txt
Win = 2 + 2 + 1 = 5
Loss = 0 + 1 + 2 = 3

Result = 5-3
```

---

## Net Game Win

### Formula

```txt
Net Game Win = total game win - total game loss
```

### Example

```txt
5-3 = +2
```

---

# 8. Ranking Rules

Urutan ranking ditentukan berdasarkan:

1. Match Point
2. Net Game Win
3. Head-to-head (future extension)
4. Additional tiebreaker (future extension)

---

# 9. Qualification Detection Logic

## Upper Bracket (Top 2)

Jika tim:

* secara matematis dipastikan finish top 2

Maka:

* row table berubah hijau

---

## Playoffs Qualified (Top 6)

Jika tim:

* secara matematis dipastikan top 6

Maka:

* row table berubah kuning

---

## Eliminated

Jika tim:

* secara matematis tidak mungkin finish top 6

Maka:

* row table berubah merah

---

# 10. Mathematical Simulation Engine

## Purpose

Menghitung:

* kemungkinan lolos playoffs
* kemungkinan upper bracket
* kemungkinan eliminasi

---

## Simulation Inputs

* Semua hasil pertandingan yang sudah diinput user
* Semua pertandingan yang belum dimainkan

---

## Simulation Process

Untuk pertandingan yang belum dimainkan:

* generate seluruh kombinasi hasil:

  * 2-0
  * 2-1
  * 1-2
  * 0-2

---

## Probability Output

Untuk setiap tim:

* % Upper Bracket
* % Playoffs
* % Eliminated

---

## Suggested Algorithm

### Phase 1 — Current Standings

Hitung klasemen berdasarkan input user.

### Phase 2 — Remaining Matches

Ambil seluruh pertandingan yang belum dimainkan.

### Phase 3 — Scenario Generator

Generate seluruh kemungkinan hasil pertandingan.

### Phase 4 — Ranking Resolver

Urutkan klasemen tiap simulasi.

### Phase 5 — Statistical Summary

Hitung:

* berapa kali top 2
* berapa kali top 6
* berapa kali bottom 3

---

## Optimization Notes

Karena kemungkinan kombinasi sangat besar:

```txt
4^jumlah_match_tersisa
```

Maka gunakan:

* Monte Carlo Simulation
* Randomized sampling
* Web Worker
* Incremental calculation

---

# 11. Main UI Layout

---

# 12. Page Structure

```txt
Navbar
Hero Section
Standings Table
Probability Cards
Week Sections
Footer
```

---

# 13. Navbar

## Contents

* MPLOT Logo
* MPL ID S17
* Reset Button
* Theme Toggle (optional)

---

# 14. Hero Section

## Contents

* Website title
* Description
* Current simulation status

Example:

```txt
"MPL ID Season 17 Playoff Simulator"
"Calculate every playoff possibility instantly."
```

---

# 15. Standings Table

## Desktop Layout

| No | Team | Match Point | Match W-L | Net Game Win | Game W-L |
| -- | ---- | ----------- | --------- | ------------ | -------- |

---

## Team Row Contents

### Team Column

* Team logo
* Team name

Logo source:

```txt
/public/images/team-name.png
```

---

## Dynamic Row Colors

| Status               | Color   |
| -------------------- | ------- |
| Upper Bracket Locked | Green   |
| Playoffs Locked      | Yellow  |
| Eliminated           | Red     |
| Normal               | Neutral |

---

# 16. Probability Cards

Di bawah tabel standings.

## Each Team Card Shows

| Data                 | Example |
| -------------------- | ------- |
| Upper Bracket Chance | 62%     |
| Playoff Chance       | 84%     |
| Elimination Chance   | 16%     |

---

# 17. Week Sections

## Structure

```txt
Week 1
 ├── Match Card
 ├── Match Card
 ├── Match Card
 └── ...
```

---

## Total Sections

* Week 1
* Week 2
* Week 3
* Week 4
* Week 5
* Week 6
* Week 7
* Week 8
* Week 9

---

# 18. Match Card Design

## Match Card Contents

```txt
Team A Logo
Team A Name

VS

Team B Logo
Team B Name

Score Selector
```

---

## Score Selector Options

| Option | Meaning       |
| ------ | ------------- |
| 2-0    | Team A menang |
| 2-1    | Team A menang |
| 1-2    | Team B menang |
| 0-2    | Team B menang |

---

## Interaction

Ketika score berubah:

* standings update realtime
* probabilities update realtime
* qualification status update realtime

---

# 19. Match Schedule Data

## Week 1

* BTR vs AE
* NAVI vs BTR
* EVOS vs GEEK
* AE vs ONIC
* TLID vs NAVI
* DEWA vs BTR
* EVOS vs TLID
* RRQ vs ONIC

---

## Week 2

* ONIC vs GEEK
* DEWA vs NAVI
* GEEK vs BTR
* AE vs EVOS
* TLID vs DEWA
* NAVI vs AE
* RRQ vs TLID
* BTR vs EVOS

---

## Week 3

* ONIC vs DEWA
* NAVI vs EVOS
* TLID vs GEEK
* ONIC vs BTR
* RRQ vs AE
* BTR vs NAVI
* GEEK vs RRQ
* AE vs DEWA

---

## Week 4

* NAVI vs ONIC
* EVOS vs DEWA
* TLID vs BTR
* RRQ vs EVOS
* GEEK vs AE
* ONIC vs TLID
* BTR vs RRQ
* DEWA vs GEEK

---

## Week 5

* GEEK vs NAVI
* EVOS vs ONIC
* DEWA vs RRQ
* AE vs TLID
* EVOS vs BTR
* AE vs NAVI
* GEEK vs ONIC
* DEWA vs TLID

---

## Week 6

* NAVI vs DEWA
* AE vs GEEK
* EVOS vs AE
* TLID vs ONIC
* RRQ vs BTR
* NAVI vs TLID
* ONIC vs RRQ
* GEEK vs EVOS

---

## Week 7

* GEEK vs DEWA
* BTR vs TLID
* DEWA vs AE
* EVOS vs RRQ
* ONIC vs NAVI
* RRQ vs GEEK
* NAVI vs BTR
* TLID vs EVOS

---

## Week 8

* BTR vs GEEK
* DEWA vs ONIC
* EVOS vs NAVI
* TLID vs RRQ
* ONIC vs AE
* DEWA vs EVOS
* AE vs BTR
* RRQ vs NAVI

---

## Week 9

* BTR vs DEWA
* TLID vs AE
* GEEK vs TLID
* AE vs RRQ
* BTR vs ONIC
* RRQ vs DEWA
* ONIC vs EVOS
* NAVI vs GEEK

---

# 20. File Structure Recommendation

```txt
/app
/components
    standings-table
    probability-card
    week-section
    match-card
    navbar
    hero
/lib
    simulation
    standings
    probability
/data
    matches.ts
    teams.ts
/public
    /images
/styles
```

---

# 21. State Management

## Global States

* match results
* standings
* simulation results
* qualification states

---

# 22. Recommended Data Structure

## Team Type

```ts
type Team = {
    id: string
    name: string
    logo: string
}
```

---

## Match Type

```ts
type Match = {
    id: string
    week: number
    team_a: string
    team_b: string
    result: "2-0" | "2-1" | "1-2" | "0-2" | null
}
```

---

# 23. Core Functional Requirements

| ID    | Requirement                                   |
| ----- | --------------------------------------------- |
| FR-01 | User dapat menginput skor match               |
| FR-02 | Tabel standings update realtime               |
| FR-03 | Probability simulator berjalan realtime       |
| FR-04 | Qualification status otomatis berubah         |
| FR-05 | User dapat reset seluruh simulasi             |
| FR-06 | Website responsive                            |
| FR-07 | Semua data tersimpan sementara di local state |
| FR-08 | Match cards dapat di-collapse per week        |

---

# 24. Non-Functional Requirements

| Category        | Requirement                    |
| --------------- | ------------------------------ |
| Performance     | Update < 200ms                 |
| Scalability     | Support future MPL seasons     |
| Responsive      | Desktop-first + mobile support |
| Accessibility   | Keyboard navigation            |
| SEO             | Metadata optimized             |
| Maintainability | Modular components             |

---

# 25. Responsive Design

## Desktop

* 3-column probability cards
* full standings table

## Tablet

* compact standings

## Mobile

* horizontal table scroll
* stacked match cards

---

# 26. Visual Style

## Theme

* Dark esports aesthetic
* Clean statistics dashboard
* Neon accents

---

## Color Palette

| Usage         | Color   |
| ------------- | ------- |
| Background    | #0B0F1A |
| Primary       | #FFD447 |
| Upper Bracket | Green   |
| Playoffs      | Yellow  |
| Eliminated    | Red     |
| Text          | White   |

---

# 27. Animations

## Suggested Animations

* standings row transition
* number counter animation
* hover glow
* realtime update fade

---

# 28. Future Features

## Phase 2 Ideas

* Share simulation URL
* Save simulation locally
* Head-to-head tiebreak engine
* Match prediction AI
* Historical MPL data
* Team power ranking
* Live MPL API integration

---

# 29. Deployment Plan

## Hosting

Recommended:

* [Vercel](https://vercel.com?utm_source=chatgpt.com)

## Domain Suggestions

* mplot.gg
* mplot.id
* mplot.live

---

# 30. Success Metrics

## KPI

* Daily active users
* Simulation count
* Average session duration
* Social media shares
* Return visitors

---

# 31. Final Product Vision

MPLOT diharapkan menjadi:

* simulator klasemen MPL ID paling lengkap
* utility utama komunitas MPL Indonesia
* tools analisis playoffs yang cepat dan interaktif
* dashboard esports statistik modern khusus Mobile Legends
