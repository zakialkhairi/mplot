import type { Match } from "./matches";
import type { Team, TeamId } from "./teams";

export type RegionCode = "id" | "ph" | "my";

export type RegionConfig = {
  code: RegionCode;
  label: string;
  leagueName: string;
  seasonName: string;
  flag: string;
  accent: string;
  startDate: string;
  teams: Team[];
  matches: Match[];
};

const regionCodes: RegionCode[] = ["id", "ph", "my"];

const idWeeklyMatches: [TeamId, TeamId][][] = [
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

const phWeeklyMatches: [TeamId, TeamId][][] = [
  [
    ["TLPH", "RORA"],
    ["TWIS", "ONIC"],
    ["APBR", "OMG"],
    ["RORA", "TNC"],
    ["TWIS", "TLPH"],
    ["TNC", "APBR"],
    ["ONIC", "FCON"],
  ],
  [
    ["TWIS", "OMG"],
    ["ONIC", "TNC"],
    ["FCON", "TLPH"],
    ["OMG", "TNC"],
    ["TWIS", "RORA"],
    ["APBR", "TLPH"],
    ["RORA", "FCON"],
  ],
  [
    ["ONIC", "APBR"],
    ["TLPH", "OMG"],
    ["APBR", "TWIS"],
    ["OMG", "FCON"],
    ["TNC", "TLPH"],
    ["FCON", "TWIS"],
    ["ONIC", "RORA"],
  ],
  [
    ["TNC", "FCON"],
    ["OMG", "ONIC"],
    ["TNC", "TWIS"],
    ["FCON", "APBR"],
    ["RORA", "OMG"],
    ["TLPH", "ONIC"],
    ["APBR", "RORA"],
  ],
  [
    ["RORA", "TLPH"],
    ["ONIC", "TWIS"],
    ["OMG", "APBR"],
    ["TNC", "RORA"],
    ["TLPH", "TWIS"],
    ["APBR", "TNC"],
    ["FCON", "ONIC"],
  ],
  [
    ["OMG", "TWIS"],
    ["TNC", "ONIC"],
    ["TLPH", "FCON"],
    ["TNC", "OMG"],
    ["RORA", "TWIS"],
    ["TLPH", "APBR"],
    ["FCON", "RORA"],
  ],
  [
    ["APBR", "ONIC"],
    ["OMG", "TLPH"],
    ["TWIS", "APBR"],
    ["FCON", "OMG"],
    ["TLPH", "TNC"],
    ["TWIS", "FCON"],
    ["RORA", "ONIC"],
  ],
  [
    ["FCON", "TNC"],
    ["ONIC", "OMG"],
    ["TWIS", "TNC"],
    ["APBR", "FCON"],
    ["OMG", "RORA"],
    ["ONIC", "TLPH"],
    ["RORA", "APBR"],
  ],
];

const myWeeklyMatches: [TeamId, TeamId][][] = [
  [
    ["SRG", "VMS"],
    ["RRQ", "TR"],
    ["iG", "BTRM"],
    ["AC", "FL"],
    ["TR", "SRG"],
    ["AC", "BTRM"],
    ["RRQ", "FL"],
  ],
  [
    ["iG", "RRQ"],
    ["SRG", "BTRM"],
    ["TR", "FL"],
    ["iG", "VMS"],
    ["RRQ", "AC"],
    ["SRG", "FL"],
    ["AC", "VMS"],
  ],
  [
    ["FL", "BTRM"],
    ["VMS", "RRQ"],
    ["BTRM", "TR"],
    ["AC", "iG"],
    ["RRQ", "SRG"],
    ["TR", "iG"],
    ["FL", "VMS"],
  ],
  [
    ["BTRM", "VMS"],
    ["SRG", "AC"],
    ["iG", "SRG"],
    ["VMS", "TR"],
    ["BTRM", "RRQ"],
    ["TR", "AC"],
    ["FL", "iG"],
  ],
  [
    ["FL", "AC"],
    ["VMS", "iG"],
    ["VMS", "BTRM"],
    ["FL", "TR"],
    ["SRG", "RRQ"],
    ["AC", "TR"],
    ["SRG", "iG"],
  ],
  [
    ["TR", "VMS"],
    ["RRQ", "BTRM"],
    ["iG", "FL"],
    ["RRQ", "VMS"],
    ["AC", "SRG"],
    ["iG", "AC"],
    ["BTRM", "SRG"],
  ],
  [
    ["FL", "SRG"],
    ["BTRM", "AC"],
    ["iG", "TR"],
    ["FL", "RRQ"],
    ["VMS", "SRG"],
    ["TR", "BTRM"],
    ["RRQ", "iG"],
  ],
  [
    ["BTRM", "FL"],
    ["TR", "RRQ"],
    ["VMS", "AC"],
    ["SRG", "TR"],
    ["BTRM", "iG"],
    ["VMS", "FL"],
    ["AC", "RRQ"],
  ],
];

const idTeams: Team[] = [
  { id: "ONIC", name: "ONIC Esports", logo: "/teams-id/ONIC.png" },
  { id: "DEWA", name: "DEWA United", logo: "/teams-id/DEWA.png" },
  { id: "EVOS", name: "EVOS Esports", logo: "/teams-id/EVOS.png" },
  { id: "TLID", name: "Team Liquid ID", logo: "/teams-id/TLID.png" },
  { id: "AE", name: "Alter Ego Esports", logo: "/teams-id/AE.png" },
  { id: "BTR", name: "Bigetron by Vitality", logo: "/teams-id/BTR.png" },
  { id: "NAVI", name: "NAVI", logo: "/teams-id/NAVI.png" },
  { id: "GEEK", name: "Geek Fam", logo: "/teams-id/GEEK.png" },
  { id: "RRQ", name: "RRQ Hoshi", logo: "/teams-id/RRQ.png" },
];

const phTeams: Team[] = [
  { id: "APBR", name: "AP.Bren", logo: "/teams-ph/APBR.png" },
  { id: "FCON", name: "Team Falcons", logo: "/teams-ph/FCON.png" },
  { id: "OMG", name: "Omega Esports", logo: "/teams-ph/OMG.png" },
  { id: "ONIC", name: "ONIC Philippines", logo: "/teams-ph/ONIC.png" },
  { id: "RORA", name: "Aurora Gaming PH", logo: "/teams-ph/RORA.png" },
  { id: "TLPH", name: "Team Liquid PH", logo: "/teams-ph/TLPH.png" },
  { id: "TNC", name: "TNC Pro Team", logo: "/teams-ph/TNC.png" },
  { id: "TWIS", name: "Twisted Minds", logo: "/teams-ph/TWIS.png" },
];

const myTeams: Team[] = [
  { id: "AC", name: "AC Esports", logo: "/teams-my/AC.png" },
  { id: "BTRM", name: "Bigetron MY by VIT", logo: "/teams-my/BTRM.png" },
  { id: "FL", name: "Team Flash", logo: "/teams-my/FL.png" },
  { id: "iG", name: "Invictus Gaming", logo: "/teams-my/iG.png?v=20260518" },
  { id: "RRQ", name: "RRQ Tora", logo: "/teams-my/RRQ.png" },
  { id: "SRG", name: "Selangor Red Giants", logo: "/teams-my/SRG.png" },
  { id: "TR", name: "Team Rey", logo: "/teams-my/TR.png" },
  { id: "VMS", name: "Tean Vamos", logo: "/teams-my/VMS.png" },
];

function createMatchesFromWeekly(region: RegionCode, weeklyMatches: [TeamId, TeamId][][]) {
  return weeklyMatches.flatMap((week, weekIndex) =>
    week.map(([teamA, teamB], matchIndex) => ({
      id: `${region}-w${weekIndex + 1}-m${matchIndex + 1}`,
      week: weekIndex + 1,
      teamA,
      teamB,
    })),
  );
}

export const regions: RegionConfig[] = [
  {
    code: "id",
    label: "MPL ID",
    leagueName: "MPL ID",
    seasonName: "Season 17",
    flag: "/teams-id/IDFLAG.png",
    accent: "#7f0016",
    startDate: "2026-03-27",
    teams: idTeams,
    matches: createMatchesFromWeekly("id", idWeeklyMatches),
  },
  {
    code: "ph",
    label: "MPL PH",
    leagueName: "MPL PH",
    seasonName: "Season 17",
    flag: "/teams-ph/PHFLAG.png",
    accent: "#0038a8",
    startDate: "2026-03-20",
    teams: phTeams,
    matches: createMatchesFromWeekly("ph", phWeeklyMatches),
  },
  {
    code: "my",
    label: "MPL MY",
    leagueName: "MPL MY",
    seasonName: "Season 17",
    flag: "/teams-my/MYFLAG.png",
    accent: "#cc0001",
    startDate: "2026-04-03",
    teams: myTeams,
    matches: createMatchesFromWeekly("my", myWeeklyMatches),
  },
];

export const regionCodesForRoutes = regionCodes.map((region) => ({ region }));

export function getRegion(regionCode: string) {
  return regions.find((region) => region.code === regionCode);
}
