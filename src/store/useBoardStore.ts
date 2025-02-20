import { Board } from "@/app/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BoardState {
  boards: Board[];
  setBoards: (boards: Board[]) => void;
}

export const useBoardStore = create<BoardState>()(
  persist(
    (set) => ({
      boards: [],
      setBoards: (boards) => set({ boards }),
    }),
    {
      name: "board-storage",
    }
  )
);
