import { useState } from "react";
import { Todo } from "../types";
import { useBoardActions } from "@/hooks/useBoardActions";
import { useTodoDrag } from "@/hooks/useTodoDrag";

interface TodoItemProps {
  todo: Todo;
  index: number;
  boardId: string;
}

export default function TodoItem({ todo, index, boardId }: TodoItemProps) {
  const { updateTodo, deleteTodo, moveTodo } = useBoardActions();
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(todo?.content);

  const { ref, isDragging, TodoDragDropRef } = useTodoDrag(
    boardId,
    index,
    moveTodo
  );

  const handleContentBlur = () => {
    const trimmedContent = content.trim();
    if (trimmedContent) {
      updateTodo(boardId, todo.id, trimmedContent);
    }
    setIsEditing(false);
  };

  if (ref.current) {
    TodoDragDropRef(ref.current);
  }

  return (
    <li
      ref={ref}
      className={`p-3 bg-gray-50 rounded cursor-move ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      {isEditing ? (
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onBlur={handleContentBlur}
          className="w-full border rounded px-2 py-1"
          autoFocus
        />
      ) : (
        <div className="relative w-full">
          <div
            className="w-full break-all pr-8"
            onClick={() => setIsEditing(true)}
          >
            {todo?.content}
          </div>
          <button
            onClick={() => deleteTodo(boardId, todo?.id)}
            className="text-red-500 text-xl hover:text-red-600 ml-2 absolute right-0 top-0"
          >
            ×
          </button>
        </div>
      )}
    </li>
  );
}
