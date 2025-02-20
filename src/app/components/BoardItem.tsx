import { Board } from "../types";
import { useBoardActions } from "@/hooks/useBoardActions";
import { useBoardDrag } from "@/hooks/useBoardDrag";
import { AddTodoForm } from "./AddTodoForm";
import { TodoList } from "./TodoList";
import { BoardHeader } from "./BoardHeader";

type BoardProps = {
  board: Board;
  index: number;
};
export default function BoardItem({ board, index }: BoardProps) {
  const { moveBoard, moveTodo } = useBoardActions();

  const handleTodoDrop = (fromBoardId: string) => {
    const validTodos = board.todos.filter(
      (todo) => todo && todo.id && todo.content
    );
    moveTodo(fromBoardId, board.id, validTodos.length - 1, validTodos.length);
  };

  const { ref, isDragging, dragDropRef } = useBoardDrag(
    index,
    moveBoard,
    handleTodoDrop
  );

  return (
    <li
      ref={dragDropRef(ref)}
      className={`text-black bg-white rounded-lg shadow p-4 h-fit w-[350px] flex-shrink-0 ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <BoardHeader title={board.title} boardId={board.id} />
      <TodoList todos={board.todos} boardId={board.id} />
      <AddTodoForm boardId={board.id} />
    </li>
  );
}
