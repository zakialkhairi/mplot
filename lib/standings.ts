import { matches, type Match, type Score } from "@/data/matches";
import { teams, type TeamId } from "@/data/teams";

export type ResultState = Partial<Record<string, Score>>;

export type Standing = {
  teamId: TeamId;
  matchPoint: number;
  matchWins: number;
  matchLosses: number;
  gameWins: number;
  gameLosses: number;
  netGameWin: number;
  played: number;
};

export type QualificationStatus =
  | "upper"
  | "playoffs"
  | "eliminated"
  | "normal";

type MutableStanding = Omit<Standing, "netGameWin">;

const teamIds = teams.map((team) => team.id);

function createEmptyTable(): Record<TeamId, MutableStanding> {
  return Object.fromEntries(
    teamIds.map((teamId) => [
      teamId,
      {
        teamId,
        matchPoint: 0,
        matchWins: 0,
        matchLosses: 0,
        gameWins: 0,
        gameLosses: 0,
        played: 0,
      },
    ]),
  ) as Record<TeamId, MutableStanding>;
}

export function scoreToGames(score: Score) {
  const [a, b] = score.split("-").map(Number);
  return { teamAGames: a, teamBGames: b };
}

function applyMatch(table: Record<TeamId, MutableStanding>, match: Match, score: Score) {
  const { teamAGames, teamBGames } = scoreToGames(score);
  const teamA = table[match.teamA];
  const teamB = table[match.teamB];
  const teamAWon = teamAGames > teamBGames;

  teamA.played += 1;
  teamB.played += 1;
  teamA.gameWins += teamAGames;
  teamA.gameLosses += teamBGames;
  teamB.gameWins += teamBGames;
  teamB.gameLosses += teamAGames;

  if (teamAWon) {
    teamA.matchPoint += 1;
    teamA.matchWins += 1;
    teamB.matchLosses += 1;
  } else {
    teamB.matchPoint += 1;
    teamB.matchWins += 1;
    teamA.matchLosses += 1;
  }
}

export function compareStanding(a: Standing, b: Standing) {
  if (a.matchPoint !== b.matchPoint) return b.matchPoint - a.matchPoint;
  if (a.netGameWin !== b.netGameWin) return b.netGameWin - a.netGameWin;
  if (a.gameWins !== b.gameWins) return b.gameWins - a.gameWins;
  return a.teamId.localeCompare(b.teamId);
}

export function ranksHigher(a: Standing, b: Standing) {
  if (a.matchPoint !== b.matchPoint) return a.matchPoint > b.matchPoint;
  if (a.netGameWin !== b.netGameWin) return a.netGameWin > b.netGameWin;
  if (a.gameWins !== b.gameWins) return a.gameWins > b.gameWins;
  return false;
}

export function calculateStandings(results: ResultState, matchList: Match[] = matches) {
  const table = createEmptyTable();

  for (const match of matchList) {
    const score = results[match.id];
    if (score) applyMatch(table, match, score);
  }

  return Object.values(table)
    .map((standing) => ({
      ...standing,
      netGameWin: standing.gameWins - standing.gameLosses,
    }))
    .sort(compareStanding);
}

function projectedStandingFor(teamId: TeamId, results: ResultState, mode: "max" | "min") {
  const projectedResults: ResultState = { ...results };

  for (const match of matches) {
    if (projectedResults[match.id]) continue;
    if (match.teamA !== teamId && match.teamB !== teamId) continue;

    const teamIsA = match.teamA === teamId;
    if (mode === "max") {
      projectedResults[match.id] = teamIsA ? "2-0" : "0-2";
    } else {
      projectedResults[match.id] = teamIsA ? "0-2" : "2-0";
    }
  }

  return calculateStandings(projectedResults).find((row) => row.teamId === teamId);
}

export function calculateQualificationStatuses(results: ResultState) {
  const standings = calculateStandings(results);

  return Object.fromEntries(
    standings.map((standing) => {
      const teamMin = projectedStandingFor(standing.teamId, results, "min") ?? standing;
      const teamMax = projectedStandingFor(standing.teamId, results, "max") ?? standing;

      const teamsThatCanPassMin = teamIds.filter((teamId) => {
        if (teamId === standing.teamId) return false;
        const rivalMax = projectedStandingFor(teamId, results, "max");
        return rivalMax ? ranksHigher(rivalMax, teamMin) : false;
      }).length;

      const teamsGuaranteedAboveMax = teamIds.filter((teamId) => {
        if (teamId === standing.teamId) return false;
        const rivalMin = projectedStandingFor(teamId, results, "min");
        return rivalMin ? ranksHigher(rivalMin, teamMax) : false;
      }).length;

      let status: QualificationStatus = "normal";
      if (teamsThatCanPassMin < 2) status = "upper";
      else if (teamsThatCanPassMin < 6) status = "playoffs";
      else if (teamsGuaranteedAboveMax >= 6) status = "eliminated";

      return [standing.teamId, status];
    }),
  ) as Record<TeamId, QualificationStatus>;
}

export function countCompletedMatches(results: ResultState) {
  return matches.filter((match) => Boolean(results[match.id])).length;
}
