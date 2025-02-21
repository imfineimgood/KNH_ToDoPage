import { Todo } from "@/type/types";
import TodoItem from "./TodoItems";

interface TodoListProps {
  todos: Todo[];
  boardId: string;
}

export function TodoList({ todos, boardId }: TodoListProps) {
  return (
    <ol className="space-y-2">
      {todos.map((todo, todoIndex) => (
        <TodoItem
          key={`${boardId}-${todo?.id}`}
          todo={todo}
          index={todoIndex}
          boardId={boardId}
        />
      ))}
    </ol>
  );
}
