import { useState } from "react";
import { UpdateInput } from "../common/UpdateInput";

interface TodoAddFormProps {
  onSubmit: (content: string) => void;
}

export function TodoAddForm({ onSubmit }: TodoAddFormProps) {
  const [newTodo, setNewTodo] = useState("");

  const handleSave = () => {
    if (newTodo.trim()) {
      onSubmit(newTodo.trim());
      setNewTodo("");
    }
  };

  return (
    <form onSubmit={handleSave} className="mt-4">
      <UpdateInput
        value={newTodo}
        onChange={setNewTodo}
        onSave={handleSave}
        className="w-full border rounded px-3 py-2"
        placeholder="새 할 일 추가"
      />
    </form>
  );
}
