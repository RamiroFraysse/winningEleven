export interface ITeam {
    id: string;
    name: string;
    winner:boolean;
}

export interface ITournamentProps {
    teams: ITeam[];
    tournamentName: string;
}

export interface ISeed {
    id: string;
    teams: ITeam[];
    winner: ITeam;
}

export interface IRound {
    id: string;
    title: string;
    seeds: ISeed[];
}
