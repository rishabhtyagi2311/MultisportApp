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
  