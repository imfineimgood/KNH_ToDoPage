import { useBoardActions } from "@/hooks/useBoardActions";
import { useState } from "react";

interface AddTodoFormProps {
  boardId: string;
}

export function AddTodoForm({ boardId }: AddTodoFormProps) {
  const [newTodo, setNewTodo] = useState("");
  const { addTodo } = useBoardActions();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo(boardId, newTodo.trim());
      setNewTodo("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="새 할 일 추가"
        className="w-full border rounded px-3 py-2"
      />
    </form>
  );
}
