import {create} from "zustand"; 


export type PlayerType = {
    title: string; 
    src: string; 
    banner?: string; 
}
interface PlayerStateProps {
    track?: PlayerType;
    addTrack: (track: PlayerType) => void; 
    clearPlayer: () => void; 
}


export const usePlayerState = create<PlayerStateProps>((set, get) => ({
    track: undefined, 
    clearPlayer: () => {
        set({track: undefined})
    }, 
    addTrack: (track: PlayerType) => {
        set({track})
    }
}))