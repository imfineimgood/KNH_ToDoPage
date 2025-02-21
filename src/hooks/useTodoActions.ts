import { useBoardStore } from "@/store/useBoardStore";

export const useTodoActions = () => {
  const { boards, setBoards } = useBoardStore();

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

  const moveTodo = (
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
  };

  return {
    addTodo,
    updateTodo,
    deleteTodo,
    moveTodo,
  };
};
