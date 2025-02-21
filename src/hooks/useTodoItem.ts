import { Todo } from "@/app/types";
import { useTodoDrag } from "@/hooks/useTodoDrag";
import { useState } from "react";
import { useTodoActions } from "./useTodoActions";

interface UseTodoItemProps {
  todo: Todo;
  index: number;
  boardId: string;
}

export function useTodoItem({ todo, index, boardId }: UseTodoItemProps) {
  const { updateTodo, deleteTodo, moveTodo } = useTodoActions();
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

  const handleDeleteTodo = () => {
    deleteTodo(boardId, todo.id);
  };

  return {
    isEditing,
    setIsEditing,
    ref,
    isDragging,
    handleUpdateTodo,
    handleDeleteTodo,
  };
}
