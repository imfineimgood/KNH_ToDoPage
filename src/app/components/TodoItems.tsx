import { useState } from "react";
import { Todo } from "../types";
import { useBoardActions } from "@/hooks/useBoardActions";
import { useTodoDrag } from "@/hooks/useTodoDrag";
import { TodoEditInput } from "./TodoEditInput";
import { TodoContent } from "./TodoContent";

interface TodoItemProps {
  todo: Todo;
  index: number;
  boardId: string;
}

export default function TodoItem({ todo, index, boardId }: TodoItemProps) {
  const { updateTodo, moveTodo } = useBoardActions();
  const [isEditing, setIsEditing] = useState(false);

  const { ref, isDragging, TodoDragDropRef } = useTodoDrag(
    boardId,
    index,
    moveTodo
  );

  if (ref.current) {
    TodoDragDropRef(ref.current);
  }

  const handleUpdateTodo = (newContent: string) => {
    updateTodo(boardId, todo.id, newContent);
  };

  return (
    <li
      ref={ref}
      className={`p-3 bg-gray-50 rounded cursor-move ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      {isEditing ? (
        <TodoEditInput
          initialContent={todo.content}
          onSave={handleUpdateTodo}
          onBlur={() => setIsEditing(false)}
        />
      ) : (
        <TodoContent
          content={todo.content}
          boardId={boardId}
          todoId={todo.id}
          onEdit={() => setIsEditing(true)}
        />
      )}
    </li>
  );
}
