import { useState } from "react";
import { Board } from "../types";
import TodoItem from "./TodoItems";
import { useBoardActions } from "@/hooks/useBoardActions";
import { useBoardDrag } from "@/hooks/useBoardDrag";

type BoardProps = {
  board: Board;
  index: number;
};
export default function BoardItem({ board, index }: BoardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(board.title);
  const [newTodo, setNewTodo] = useState("");
  const { updateBoard, deleteBoard, moveBoard, moveTodo, addTodo } =
    useBoardActions();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo(board.id, newTodo.trim());
      setNewTodo("");
    }
  };

  return (
    <li
      ref={dragDropRef(ref)}
      className={`text-black bg-white rounded-lg shadow p-4 h-fit w-[350px] flex-shrink-0 ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div>
        <div className="flex justify-between items-center mb-4">
          {isEditing ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => {
                updateBoard(board.id, title);
                setIsEditing(false);
              }}
              className="border rounded px-2 py-1"
              autoFocus
            />
          ) : (
            <h2
              onClick={() => setIsEditing(true)}
              className="text-xl font-semibold cursor-pointer"
            >
              {board.title}
            </h2>
          )}
          <button
            onClick={() => deleteBoard(board.id)}
            className="text-red-500 hover:text-red-600"
          >
            삭제
          </button>
        </div>
        <ol className="space-y-2 min-h-[10px]">
          {board.todos.map((todo, todoIndex) => (
            <TodoItem
              key={`${board.id}-${todo?.id}`}
              todo={todo}
              index={todoIndex}
              boardId={board.id}
            />
          ))}
        </ol>
      </div>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="새 할 일 추가"
          className="w-full border rounded px-3 py-2"
        />
      </form>
    </li>
  );
}
