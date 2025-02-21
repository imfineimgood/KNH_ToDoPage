import { Board } from "@/type/types";
import { useBoardActions } from "./useBoardActions";
import { useBoardDrag } from "./useBoardDrag";
import { useTodoActions } from "./useTodoActions";

interface UseBoardItemProps {
  board: Board;
  index: number;
}

export function useBoardItem({ board, index }: UseBoardItemProps) {
  const { moveBoard, updateBoard, deleteBoard } = useBoardActions();
  const { moveTodo, addTodo } = useTodoActions();

  const handleTodoDrop = (fromBoardId: string) => {
    const validTodos = board.todos.filter(
      (todo) => todo && todo.id && todo.content
    );
    moveTodo(fromBoardId, board.id, validTodos.length - 1, validTodos.length);
  };

  const handleUpdateBoard = (newTitle: string) => {
    updateBoard(board.id, newTitle);
  };

  const handleDeleteBoard = () => {
    deleteBoard(board.id);
  };

  const handleAddTodo = (content: string) => {
    addTodo(board.id, content);
  };

  const { ref, isDragging, dragDropRef } = useBoardDrag(
    index,
    moveBoard,
    handleTodoDrop
  );

  return {
    ref,
    isDragging,
    dragDropRef,
    handleUpdateBoard,
    handleDeleteBoard,
    handleAddTodo,
  };
}
