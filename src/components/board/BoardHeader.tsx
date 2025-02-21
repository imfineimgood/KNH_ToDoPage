import { BoardEditTitle } from "./BoardEditTitle";

interface BoardHeaderProps {
  title: string;
  onUpdateTitle: (newTitle: string) => void;
  onDelete: () => void;
}

export function BoardHeader({
  title,
  onUpdateTitle,
  onDelete,
}: BoardHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <BoardEditTitle title={title} onSave={onUpdateTitle} />
      <button onClick={onDelete} className="text-red-500 hover:text-red-600">
        삭제
      </button>
    </div>
  );
}
