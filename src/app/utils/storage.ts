import { Board } from "../types";

export const saveBoards = (boards: Board[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("boards", JSON.stringify(boards));
  }
};

export const loadBoards = (): Board[] => {
  if (typeof window !== "undefined") {
    const boards = localStorage.getItem("boards");
    return boards ? JSON.parse(boards) : [];
  }
  return [];
};
