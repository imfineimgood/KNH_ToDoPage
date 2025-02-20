import { useBoardActions } from "@/hooks/useBoardActions";

interface TodoContentProps {
  boardId: string;
  todoId: string;
  content: string;
  onEdit: () => void;
}

export function TodoContent({
  boardId,
  todoId,
  content,
  onEdit,
}: TodoContentProps) {
  const { deleteTodo } = useBoardActions();
  return (
    <div className="relative w-full">
      <div className="w-full break-all pr-8" onClick={onEdit}>
        {content}
      </div>
      <button
        onClick={() => deleteTodo(boardId, todoId)}
        className="text-red-500 text-xl hover:text-red-600 ml-2 absolute right-0 top-0"
      >
        ×
      </button>
    </div>
  );
}
