import { useCallback } from "react";
import { useBoardStore } from "../store/useBoardStore";
import { Board } from "@/app/types";

export const useBoardActions = () => {
  const { boards, setBoards } = useBoardStore();

  const addBoard = useCallback(() => {
    const newBoard: Board = {
      id: crypto.randomUUID(),
      title: "새 보드",
      todos: [],
    };
    setBoards([...boards, newBoard]);
  }, [boards, setBoards]);

  const updateBoard = (boardId: string, title: string) => {
    setBoards(
      boards.map((board) =>
        board.id === boardId ? { ...board, title } : board
      )
    );
  };

  const deleteBoard = useCallback(
    (boardId: string) => {
      setBoards(boards.filter((board) => board.id !== boardId));
    },
    [boards, setBoards]
  );

  const moveBoard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const newBoards = [...boards];
      const [draggedBoard] = newBoards.splice(dragIndex, 1);
      newBoards.splice(hoverIndex, 0, draggedBoard);
      setBoards(newBoards);
    },
    [boards, setBoards]
  );

  return {
    boards,
    addBoard,
    updateBoard,
    deleteBoard,
    moveBoard,
  };
};
