import type { TeamId } from "./teams";

export type Score = "2-0" | "2-1" | "1-2" | "0-2";

export type Match = {
  id: string;
  week: number;
  teamA: TeamId;
  teamB: TeamId;
};

export const scoreOptions: Score[] = ["2-0", "2-1", "1-2", "0-2"];
