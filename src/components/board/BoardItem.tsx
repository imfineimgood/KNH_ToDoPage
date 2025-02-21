import { useBoardItem } from "@/hooks/useBoardItem";
import { TodoList } from "../todo/TodoList";
import { TodoAddForm } from "../todo/TodoAddForm";
import { BoardHeader } from "./BoardHeader";
import { Board } from "@/type/types";

type BoardProps = {
  board: Board;
  index: number;
};
export default function BoardItem({ board, index }: BoardProps) {
  const {
    ref,
    isDragging,
    dragDropRef,
    handleUpdateBoard,
    handleDeleteBoard,
    handleAddTodo,
  } = useBoardItem({
    board,
    index,
  });

  return (
    <li
      ref={dragDropRef(ref)}
      className={`text-black bg-white rounded-lg shadow p-4 h-fit w-[350px] flex-shrink-0 ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <BoardHeader
        title={board.title}
        onUpdateTitle={handleUpdateBoard}
        onDelete={handleDeleteBoard}
      />
      <TodoList todos={board.todos} boardId={board.id} />
      <TodoAddForm onSubmit={handleAddTodo} />
    </li>
  );
}
