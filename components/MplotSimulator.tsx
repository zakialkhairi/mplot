"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { matches, scoreOptions, type Score } from "@/data/matches";
import { teamById, type TeamId } from "@/data/teams";
import { calculateProbabilities } from "@/lib/probability";
import {
  calculateQualificationStatuses,
  calculateStandings,
  countCompletedMatches,
  type QualificationStatus,
  type ResultState,
} from "@/lib/standings";

const statusLabels: Record<QualificationStatus, string> = {
  upper: "Upper locked",
  playoffs: "Playoffs locked",
  eliminated: "Eliminated",
  normal: "On watch",
};

const statusStyles: Record<QualificationStatus, string> = {
  upper: "border-emerald-200 bg-emerald-50 text-emerald-800",
  playoffs: "border-amber-200 bg-amber-50 text-amber-800",
  eliminated: "border-red-200 bg-red-50 text-red-800",
  normal: "border-zinc-200 bg-white text-zinc-700",
};

const weekNumbers = Array.from({ length: 9 }, (_, index) => index + 1);
const matchTimes = [
  ["15:15", "18:15"],
  ["14:15", "17:15", "20:15"],
  ["14:15", "17:15", "20:15"],
];
const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const monthNames = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

function formatPercent(value: number) {
  if (value === 0 || value === 100) return `${Math.round(value)}%`;
  return `${value.toFixed(1)}%`;
}

function formatMatchDate(week: number, dayOffset: number) {
  const date = new Date(2026, 2, 27 + (week - 1) * 7 + dayOffset);

  return `${dayNames[date.getDay()]}, ${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}

function splitScore(score?: Score) {
  if (!score) return ["-", "-"];
  return score.split("-");
}

function TeamLogo({ teamId, size = 40 }: { teamId: TeamId; size?: number }) {
  const team = teamById.get(teamId);

  if (!team) return null;

  return (
    <Image
      src={team.logo}
      alt={`${team.name} logo`}
      width={size}
      height={size}
      className="shrink-0 object-contain"
      style={{ height: size, width: size }}
    />
  );
}

function ProbabilityBar({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "red" | "yellow" | "green";
}) {
  const toneClass = {
    red: "bg-red-600",
    yellow: "bg-amber-400",
    green: "bg-emerald-500",
  }[tone];

  return (
    <div className="space-y-0.5">
      <div className="flex items-center justify-between text-[9px] font-semibold text-zinc-600">
        <span>{label}</span>
        <span className="tabular-nums text-zinc-900">{formatPercent(value)}</span>
      </div>
      <div className="h-1 rounded-full bg-zinc-100">
        <div
          className={`h-1 rounded-full ${toneClass}`}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  );
}

export default function MplotSimulator() {
  const [results, setResults] = useState<ResultState>({});

  const standings = useMemo(() => calculateStandings(results), [results]);
  const statuses = useMemo(() => calculateQualificationStatuses(results), [results]);
  const probabilities = useMemo(() => calculateProbabilities(results), [results]);
  const completedMatches = countCompletedMatches(results);
  const remainingMatches = matches.length - completedMatches;
  const probabilityByTeam = new Map(probabilities.teams.map((team) => [team.teamId, team]));

  function updateScore(matchId: string, score: Score | "") {
    setResults((current) => {
      const next = { ...current };
      if (score) next[matchId] = score;
      else delete next[matchId];
      return next;
    });
  }

  function resetSimulation() {
    setResults({});
  }

  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <header className="sticky top-0 z-30 border-b border-[#5f0010] bg-[#7f0016] text-white shadow-sm">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden">
              <Image
                src="/logomplot.png"
                alt="MPLOT logo"
                width={120}
                height={120}
                priority
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <p className="text-lg font-black tracking-wide">MPLOT</p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-red-100">
                MPL ID S17 Simulator
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={resetSimulation}
            className="h-10 rounded-md border border-white/40 bg-white px-4 text-sm font-bold text-[#7f0016] transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-white"
          >
            Reset Simulasi
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl space-y-4 px-4 py-4 sm:px-6">
        <section className="space-y-4">
          <section className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
            <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-700">
                  Live standings calculator
                </p>
                <h1 className="mt-1 text-3xl font-black tracking-tight text-zinc-950">
                  MPL ID Season 17 Playoff Simulator
                </h1>
                <p className="mt-2 max-w-3xl text-sm leading-5 text-zinc-600">
                  Input skor BO3, lihat klasemen bergerak real-time, dan pantau
                  peluang upper bracket, playoffs, serta eliminasi untuk 9 tim.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-md border border-zinc-200 bg-zinc-50 px-3 py-1.5">
                  <p className="text-xl font-black text-zinc-950">{completedMatches}</p>
                  <p className="text-[11px] font-bold uppercase text-zinc-500">Selesai</p>
                </div>
                <div className="rounded-md border border-zinc-200 bg-zinc-50 px-3 py-1.5">
                  <p className="text-xl font-black text-zinc-950">{remainingMatches}</p>
                  <p className="text-[11px] font-bold uppercase text-zinc-500">Sisa</p>
                </div>
                <div className="rounded-md border border-zinc-200 bg-zinc-50 px-3 py-1.5">
                  <p className="text-xl font-black text-zinc-950">{probabilities.scenarios}</p>
                  <p className="text-[11px] font-bold uppercase text-zinc-500">
                    {probabilities.mode === "exact" ? "Exact" : "Samples"}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-zinc-200 bg-white p-3 shadow-sm">
            <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-lg font-black text-zinc-950">Probability Cards</h2>
                <p className="text-xs text-zinc-600">
                  Semua peluang tim ditampilkan sekaligus.
                </p>
              </div>
              <p className="text-xs font-black uppercase tracking-wide text-[#7f0016]">
                {probabilities.mode === "exact" ? "Exact" : "Monte Carlo"} ·{" "}
                {probabilities.scenarios} scenario
              </p>
            </div>

            <div className="grid gap-2 md:grid-cols-3">
              {standings.map((standing) => {
                const team = teamById.get(standing.teamId);
                const probability = probabilityByTeam.get(standing.teamId);
                const status = statuses[standing.teamId];

                return (
                  <article
                    key={standing.teamId}
                    className={`grid grid-cols-[132px_minmax(0,1fr)] items-center gap-2 rounded-md border p-2 shadow-sm ${statusStyles[status]}`}
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <TeamLogo teamId={standing.teamId} size={26} />
                      <div className="min-w-0">
                        <h3 className="truncate text-xs font-black text-zinc-950">
                          {team?.name}
                        </h3>
                        <p className="text-[8px] font-bold uppercase tracking-wide text-zinc-500">
                          {statusLabels[status]}
                        </p>
                      </div>
                    </div>
                    <div className="grid gap-1.5">
                      <ProbabilityBar
                        label="Upper Bracket"
                        value={probability?.upper ?? 0}
                        tone="green"
                      />
                      <ProbabilityBar
                        label="Playoffs"
                        value={probability?.playoffs ?? 0}
                        tone="yellow"
                      />
                      <ProbabilityBar
                        label="Eliminated"
                        value={probability?.eliminated ?? 0}
                        tone="red"
                      />
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
            <div className="border-b border-zinc-200 px-5 py-4">
              <h2 className="text-lg font-black text-zinc-950">Standings</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                <thead className="bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500">
                  <tr>
                    <th className="px-4 py-3">No</th>
                    <th className="px-4 py-3">Team</th>
                    <th className="px-4 py-3 text-center">Match Point</th>
                    <th className="px-4 py-3 text-center">Match W-L</th>
                    <th className="px-4 py-3 text-center">Net Game Win</th>
                    <th className="px-4 py-3 text-center">Game W-L</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {standings.map((row, index) => {
                    const team = teamById.get(row.teamId);
                    const status = statuses[row.teamId];

                    return (
                      <tr key={row.teamId} className={statusStyles[status]}>
                        <td className="px-4 py-3 font-black">{index + 1}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <TeamLogo teamId={row.teamId} />
                            <div>
                              <p className="font-black text-zinc-950">{team?.name}</p>
                              <p className="text-xs font-semibold text-zinc-500">
                                {row.played} match played
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center font-black tabular-nums">
                          {row.matchPoint}
                        </td>
                        <td className="px-4 py-3 text-center font-semibold tabular-nums">
                          {row.matchWins}-{row.matchLosses}
                        </td>
                        <td className="px-4 py-3 text-center font-semibold tabular-nums">
                          {row.netGameWin > 0 ? "+" : ""}
                          {row.netGameWin}
                        </td>
                        <td className="px-4 py-3 text-center font-semibold tabular-nums">
                          {row.gameWins}-{row.gameLosses}
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex rounded-full border border-current/20 px-2.5 py-1 text-xs font-black">
                            {statusLabels[status]}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

        </section>
      </div>

      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6">
        <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
          <div className="border-b border-zinc-200 px-5 py-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-lg font-black text-zinc-950">Match Input</h2>
                <p className="text-sm text-zinc-600">
                  Pilih Week 1-9 pada timeline. Hanya satu week yang tampil agar
                  jadwal lebih luas dan mudah dibaca.
                </p>
              </div>
              <p className="text-sm font-black text-[#7f0016]">
                {completedMatches} dari {matches.length} match terisi
              </p>
            </div>
          </div>

          <div className="week-tabs">
            {weekNumbers.map((week) => (
              <input
                key={`input-${week}`}
                id={`week-tab-${week}`}
                name="match-week"
                type="radio"
                defaultChecked={week === 1}
                className="sr-only"
              />
            ))}

            <div className="overflow-x-auto border-b border-zinc-200 px-4 py-5">
              <div className="min-w-[860px]">
                <div className="week-timeline grid grid-cols-9 items-start">
                  {weekNumbers.map((week) => (
                    <label
                      key={`label-${week}`}
                      htmlFor={`week-tab-${week}`}
                      className="week-tab-label grid cursor-pointer justify-items-center gap-2 text-sm font-black text-zinc-700 transition hover:text-[#7f0016]"
                    >
                      <span>Week {week}</span>
                      <span className="week-dot relative z-10 h-3.5 w-3.5 rounded-full bg-black" />
                    </label>
                  ))}
                </div>
                <div className="-mt-2.5 h-px border-t border-dashed border-zinc-300" />
              </div>
            </div>

            <div className="week-panels">
              {weekNumbers.map((week) => {
                const weekMatches = matches.filter((match) => match.week === week);
                const weekGroups = [
                  weekMatches.slice(0, 2),
                  weekMatches.slice(2, 5),
                  weekMatches.slice(5, 8),
                ];

                return (
                  <div
                    key={`panel-${week}`}
                    data-week-panel={week}
                    className="week-panel gap-4 p-4 lg:grid-cols-3"
                  >
                    {weekGroups.map((group, dayIndex) => (
                      <section
                        key={`${week}-${dayIndex}`}
                        className="overflow-hidden rounded-md border border-dashed border-zinc-300 bg-white"
                      >
                        <div className="border-b border-dashed border-zinc-300 px-4 py-3 text-center">
                          <h3 className="text-base font-black text-zinc-700">
                            {formatMatchDate(week, dayIndex)}
                          </h3>
                        </div>

                        <div className="divide-y divide-zinc-100">
                          {group.map((match, matchIndex) => {
                            const teamA = teamById.get(match.teamA);
                            const teamB = teamById.get(match.teamB);
                            const [scoreA, scoreB] = splitScore(results[match.id]);

                            return (
                              <article
                                key={match.id}
                                className="grid grid-cols-[58px_28px_minmax(90px,1fr)_28px_58px] items-center gap-2 px-3 py-4 sm:grid-cols-[64px_32px_minmax(96px,1fr)_32px_64px]"
                              >
                                <div className="grid justify-items-center gap-1 text-center">
                                  <TeamLogo teamId={match.teamA} size={36} />
                                  <span className="max-w-[58px] truncate text-xs font-black text-zinc-700 sm:max-w-[64px] sm:text-sm">
                                    {teamA?.id}
                                  </span>
                                </div>

                                <span className="text-center text-3xl font-black leading-none text-zinc-500 tabular-nums">
                                  {scoreA}
                                </span>

                                <div className="grid justify-items-center gap-2">
                                  <span className="text-xs font-black text-zinc-700">
                                    {matchTimes[dayIndex][matchIndex]}
                                  </span>
                                  <select
                                    value={results[match.id] ?? ""}
                                    onChange={(event) =>
                                      updateScore(match.id, event.target.value as Score | "")
                                    }
                                    aria-label={`${teamA?.name} vs ${teamB?.name} score`}
                                    className="h-8 w-full max-w-[104px] rounded bg-[#7f0016] px-2 text-center text-xs font-black text-white outline-none transition focus:ring-2 focus:ring-red-200"
                                  >
                                    <option value="">Score</option>
                                    {scoreOptions.map((score) => (
                                      <option key={score} value={score}>
                                        {score}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                <span className="text-center text-3xl font-black leading-none text-zinc-500 tabular-nums">
                                  {scoreB}
                                </span>

                                <div className="grid justify-items-center gap-1 text-center">
                                  <TeamLogo teamId={match.teamB} size={36} />
                                  <span className="max-w-[58px] truncate text-xs font-black text-zinc-700 sm:max-w-[64px] sm:text-sm">
                                    {teamB?.id}
                                  </span>
                                </div>
                              </article>
                            );
                          })}
                        </div>
                      </section>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-200 bg-zinc-50 px-4 py-6 text-center text-sm font-semibold text-zinc-500">
        MPLOT calculates BO3 standings with Match Point, Match W-L, Net Game Win,
        and Game W-L tiebreak priority.
      </footer>
    </main>
  );
}
