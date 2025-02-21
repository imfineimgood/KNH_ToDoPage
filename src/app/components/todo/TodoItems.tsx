import { Todo } from "../../types";
import { useTodoItem } from "@/hooks/useTodoItem";
import { TodoEditInput } from "./TodoEditInput";
import { TodoContent } from "./TodoContent";

interface TodoItemProps {
  todo: Todo;
  index: number;
  boardId: string;
}

export default function TodoItem({ todo, index, boardId }: TodoItemProps) {
  const {
    isEditing,
    setIsEditing,
    ref,
    isDragging,
    handleUpdateTodo,
    handleDeleteTodo,
  } = useTodoItem({
    todo,
    index,
    boardId,
  });
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
          onEdit={() => setIsEditing(true)}
          onDelete={handleDeleteTodo}
        />
      )}
    </li>
  );
}
