import { type Match, type Score } from "@/data/matches";
import { type Team, type TeamId } from "@/data/teams";

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

function createEmptyTable(teams: Team[]): Record<TeamId, MutableStanding> {
  return Object.fromEntries(
    teams.map((team) => [
      team.id,
      {
        teamId: team.id,
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

export function calculateStandings(results: ResultState, teams: Team[], matchList: Match[]) {
  const table = createEmptyTable(teams);

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

function projectedStandingFor(
  teamId: TeamId,
  results: ResultState,
  teams: Team[],
  matchList: Match[],
  mode: "max" | "min",
) {
  const projectedResults: ResultState = { ...results };

  for (const match of matchList) {
    if (projectedResults[match.id]) continue;
    if (match.teamA !== teamId && match.teamB !== teamId) continue;

    const teamIsA = match.teamA === teamId;
    if (mode === "max") {
      projectedResults[match.id] = teamIsA ? "2-0" : "0-2";
    } else {
      projectedResults[match.id] = teamIsA ? "0-2" : "2-0";
    }
  }

  return calculateStandings(projectedResults, teams, matchList).find(
    (row) => row.teamId === teamId,
  );
}

export function calculateQualificationStatuses(
  results: ResultState,
  teams: Team[],
  matchList: Match[],
) {
  const standings = calculateStandings(results, teams, matchList);
  const teamIds = teams.map((team) => team.id);

  return Object.fromEntries(
    standings.map((standing) => {
      const teamMin =
        projectedStandingFor(standing.teamId, results, teams, matchList, "min") ?? standing;
      const teamMax =
        projectedStandingFor(standing.teamId, results, teams, matchList, "max") ?? standing;

      const teamsThatCanPassMin = teamIds.filter((teamId) => {
        if (teamId === standing.teamId) return false;
        const rivalMax = projectedStandingFor(teamId, results, teams, matchList, "max");
        return rivalMax ? ranksHigher(rivalMax, teamMin) : false;
      }).length;

      const teamsGuaranteedAboveMax = teamIds.filter((teamId) => {
        if (teamId === standing.teamId) return false;
        const rivalMin = projectedStandingFor(teamId, results, teams, matchList, "min");
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

export function countCompletedMatches(results: ResultState, matchList: Match[]) {
  return matchList.filter((match) => Boolean(results[match.id])).length;
}
