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

  const addTodo = (boardId: string, content: string) => {
    setBoards(
      boards.map((board) => {
        if (board.id !== boardId) return board;

        return {
          ...board,
          todos: [...board.todos, { id: crypto.randomUUID(), content }],
        };
      })
    );
  };

  const updateTodo = (boardId: string, todoId: string, content: string) => {
    setBoards(
      boards.map((board) => {
        if (board.id !== boardId) return board;

        return {
          ...board,
          todos: board.todos.map((todo) =>
            todo.id === todoId ? { ...todo, content } : todo
          ),
        };
      })
    );
  };

  const deleteTodo = (boardId: string, todoId: string) => {
    setBoards(
      boards.map((board) => {
        if (board.id === boardId) {
          return {
            ...board,
            todos: board.todos.filter((todo) => todo?.id !== todoId),
          };
        }
        return board;
      })
    );
  };

  const moveTodo = useCallback(
    (
      fromBoardId: string,
      toBoardId: string,
      dragIndex: number,
      hoverIndex: number
    ) => {
      const newBoards = [...boards];
      const fromBoard = newBoards.find((b) => b.id === fromBoardId);
      const toBoard = newBoards.find((b) => b.id === toBoardId);

      if (!fromBoard || !toBoard) return;

      const [draggedTodo] = fromBoard.todos.splice(dragIndex, 1);
      toBoard.todos.splice(hoverIndex, 0, draggedTodo);

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
    addTodo,
    updateTodo,
    deleteTodo,
    moveTodo,
  };
};
