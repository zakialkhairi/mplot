import type { TeamId } from "./teams";

export type Score = "2-0" | "2-1" | "1-2" | "0-2";

export type Match = {
  id: string;
  week: number;
  teamA: TeamId;
  teamB: TeamId;
};

const weeklyMatches: [TeamId, TeamId][][] = [
  [
    ["BTR", "AE"],
    ["NAVI", "RRQ"],
    ["EVOS", "GEEK"],
    ["AE", "ONIC"],
    ["TLID", "NAVI"],
    ["DEWA", "BTR"],
    ["EVOS", "TLID"],
    ["RRQ", "ONIC"],
  ],
  [
    ["ONIC", "GEEK"],
    ["DEWA", "NAVI"],
    ["GEEK", "BTR"],
    ["AE", "EVOS"],
    ["TLID", "DEWA"],
    ["NAVI", "AE"],
    ["RRQ", "TLID"],
    ["BTR", "EVOS"],
  ],
  [
    ["ONIC", "DEWA"],
    ["NAVI", "EVOS"],
    ["TLID", "GEEK"],
    ["ONIC", "BTR"],
    ["RRQ", "AE"],
    ["BTR", "NAVI"],
    ["GEEK", "RRQ"],
    ["AE", "DEWA"],
  ],
  [
    ["NAVI", "ONIC"],
    ["EVOS", "DEWA"],
    ["TLID", "BTR"],
    ["RRQ", "EVOS"],
    ["GEEK", "AE"],
    ["ONIC", "TLID"],
    ["BTR", "RRQ"],
    ["DEWA", "GEEK"],
  ],
  [
    ["GEEK", "NAVI"],
    ["EVOS", "ONIC"],
    ["DEWA", "RRQ"],
    ["AE", "TLID"],
    ["EVOS", "BTR"],
    ["AE", "NAVI"],
    ["GEEK", "ONIC"],
    ["DEWA", "TLID"],
  ],
  [
    ["NAVI", "DEWA"],
    ["AE", "GEEK"],
    ["EVOS", "AE"],
    ["TLID", "ONIC"],
    ["RRQ", "BTR"],
    ["NAVI", "TLID"],
    ["ONIC", "RRQ"],
    ["GEEK", "EVOS"],
  ],
  [
    ["GEEK", "DEWA"],
    ["BTR", "TLID"],
    ["DEWA", "AE"],
    ["EVOS", "RRQ"],
    ["ONIC", "NAVI"],
    ["RRQ", "GEEK"],
    ["NAVI", "BTR"],
    ["TLID", "EVOS"],
  ],
  [
    ["BTR", "GEEK"],
    ["DEWA", "ONIC"],
    ["EVOS", "NAVI"],
    ["TLID", "RRQ"],
    ["ONIC", "AE"],
    ["DEWA", "EVOS"],
    ["AE", "BTR"],
    ["RRQ", "NAVI"],
  ],
  [
    ["BTR", "DEWA"],
    ["TLID", "AE"],
    ["GEEK", "TLID"],
    ["AE", "RRQ"],
    ["BTR", "ONIC"],
    ["RRQ", "DEWA"],
    ["ONIC", "EVOS"],
    ["NAVI", "GEEK"],
  ],
];

export const matches: Match[] = weeklyMatches.flatMap((week, weekIndex) =>
  week.map(([teamA, teamB], matchIndex) => ({
    id: `w${weekIndex + 1}-m${matchIndex + 1}`,
    week: weekIndex + 1,
    teamA,
    teamB,
  })),
);

export const scoreOptions: Score[] = ["2-0", "2-1", "1-2", "0-2"];
