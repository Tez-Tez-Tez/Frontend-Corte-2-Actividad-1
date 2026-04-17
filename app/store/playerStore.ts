import { create } from "zustand";
import { worldMap } from "../data/map";

type Direction = "norte" | "sur" | "este" | "oeste";

interface PlayerState {
  playerName: string;
  currentLocationId: string;
  setPlayerName: (name: string) => void;
  move: (direction: Direction) => void;
  reset: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  playerName: "",
  currentLocationId: "entrada",

  setPlayerName: (name: string) => set({ playerName: name }),

  move: (direction: Direction) => {
    const { currentLocationId } = get();
    const currentRoom = worldMap.find((room) => room.id === currentLocationId);
    if (currentRoom && currentRoom.direcciones[direction]) {
      set({ currentLocationId: currentRoom.direcciones[direction] as string });
    }
  },

  reset: () => set({ playerName: "", currentLocationId: "entrada" }),
}));
