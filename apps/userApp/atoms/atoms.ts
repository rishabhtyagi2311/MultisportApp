import { atom } from "recoil";

export const authState  = atom({
    key:"authState",
    default : false
})
export interface TeamFormState {
    name: string;
    location: string;
    customCity?: string;
    maxPlayers?: number;
    playerIds: number[];
  }
export interface footballTeamWithRelations {
  id: number;
  name: string;
  location: string;
  maxPlayers: number;
  createdBy: {
    id: number;
    nickname: string;
  };
  members: {
    footballProfile: {
      id: number;
      nickname: string;
    };
  }[];
}

  
export const footballteamAtom = atom<TeamFormState>({
  key: 'teamFormAtom',
  default: {
    name: '',
    location: '',
    customCity: '',
    maxPlayers: undefined,
    playerIds: [],
  },
});

export const createdTeamsAtom = atom<footballTeamWithRelations[] | null>({
  key: 'createdTeamsAtom',
  default: null,
});

export const joinedTeamsAtom = atom<footballTeamWithRelations[] | null>({
  key: 'joinedTeamsAtom',
  default: null,
});