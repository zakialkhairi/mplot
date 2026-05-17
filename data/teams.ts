export type TeamId =
  | "ONIC"
  | "DEWA"
  | "EVOS"
  | "TLID"
  | "AE"
  | "BTR"
  | "NAVI"
  | "GEEK"
  | "RRQ";

export type Team = {
  id: TeamId;
  name: string;
  logo: string;
};

export const teams: Team[] = [
  { id: "ONIC", name: "ONIC", logo: "/teams/ONIC.png" },
  { id: "DEWA", name: "DEWA United", logo: "/teams/DEWA.png" },
  { id: "EVOS", name: "EVOS", logo: "/teams/EVOS.png" },
  { id: "TLID", name: "Team Liquid ID", logo: "/teams/TLID.png" },
  { id: "AE", name: "Alter Ego", logo: "/teams/AE.png" },
  { id: "BTR", name: "Bigetron", logo: "/teams/BTR.png" },
  { id: "NAVI", name: "NAVI", logo: "/teams/NAVI.png" },
  { id: "GEEK", name: "Geek Fam", logo: "/teams/GEEK.png" },
  { id: "RRQ", name: "RRQ", logo: "/teams/RRQ.png" },
];

export const teamById = new Map(teams.map((team) => [team.id, team]));
