import { matches, scoreOptions, type Match, type Score } from "@/data/matches";
import { teams, type TeamId } from "@/data/teams";
import { calculateStandings, type ResultState } from "./standings";

export type TeamProbability = {
  teamId: TeamId;
  upper: number;
  playoffs: number;
  eliminated: number;
};

export type ProbabilitySummary = {
  mode: "exact" | "monte-carlo";
  scenarios: number;
  teams: TeamProbability[];
};

type Counter = Record<TeamId, { upper: number; playoffs: number; eliminated: number }>;

function createCounters(): Counter {
  return Object.fromEntries(
    teams.map((team) => [team.id, { upper: 0, playoffs: 0, eliminated: 0 }]),
  ) as Counter;
}

function recordScenario(results: ResultState, counters: Counter) {
  const standings = calculateStandings(results);

  standings.forEach((standing, index) => {
    if (index < 2) counters[standing.teamId].upper += 1;
    if (index < 6) counters[standing.teamId].playoffs += 1;
    if (index >= 6) counters[standing.teamId].eliminated += 1;
  });
}

function seedFromResults(results: ResultState) {
  const source = matches.map((match) => `${match.id}:${results[match.id] ?? "-"}`).join("|");
  let seed = 2166136261;

  for (let index = 0; index < source.length; index += 1) {
    seed ^= source.charCodeAt(index);
    seed = Math.imul(seed, 16777619);
  }

  return seed >>> 0;
}

function nextRandom(seed: number) {
  const next = (seed + 0x6d2b79f5) >>> 0;
  let mixed = Math.imul(next ^ (next >>> 15), next | 1);
  mixed ^= mixed + Math.imul(mixed ^ (mixed >>> 7), mixed | 61);

  return {
    seed: next,
    value: ((mixed ^ (mixed >>> 14)) >>> 0) / 4294967296,
  };
}

function finalize(counters: Counter, scenarios: number, mode: ProbabilitySummary["mode"]) {
  const divisor = Math.max(scenarios, 1);

  return {
    mode,
    scenarios: divisor,
    teams: teams.map((team) => ({
      teamId: team.id,
      upper: (counters[team.id].upper / divisor) * 100,
      playoffs: (counters[team.id].playoffs / divisor) * 100,
      eliminated: (counters[team.id].eliminated / divisor) * 100,
    })),
  };
}

function exactSimulation(baseResults: ResultState, remaining: Match[]) {
  const counters = createCounters();
  let scenarios = 0;

  function walk(index: number, draft: ResultState) {
    if (index === remaining.length) {
      scenarios += 1;
      recordScenario(draft, counters);
      return;
    }

    const match = remaining[index];
    for (const score of scoreOptions) {
      walk(index + 1, { ...draft, [match.id]: score });
    }
  }

  walk(0, { ...baseResults });
  return finalize(counters, scenarios, "exact");
}

function monteCarloSimulation(baseResults: ResultState, remaining: Match[]) {
  const counters = createCounters();
  const scenarioCount = Math.min(2600, Math.max(1400, remaining.length * 48));
  let seed = seedFromResults(baseResults);

  for (let scenario = 0; scenario < scenarioCount; scenario += 1) {
    const draft: ResultState = { ...baseResults };

    for (const match of remaining) {
      const random = nextRandom(seed);
      seed = random.seed;
      draft[match.id] = scoreOptions[Math.floor(random.value * scoreOptions.length)] as Score;
    }

    recordScenario(draft, counters);
  }

  return finalize(counters, scenarioCount, "monte-carlo");
}

export function calculateProbabilities(results: ResultState): ProbabilitySummary {
  const remaining = matches.filter((match) => !results[match.id]);

  if (remaining.length === 0) {
    const counters = createCounters();
    recordScenario(results, counters);
    return finalize(counters, 1, "exact");
  }

  if (remaining.length <= 7) {
    return exactSimulation(results, remaining);
  }

  return monteCarloSimulation(results, remaining);
}
