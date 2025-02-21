import { DeleteButton } from "../common/DeleteButton";

interface TodoContentProps {
  content: string;
  onEdit: () => void;
  onDelete: () => void;
}

export function TodoContent({ content, onEdit, onDelete }: TodoContentProps) {
  return (
    <div className="relative w-full">
      <div className="w-full break-all pr-8" onClick={onEdit}>
        {content}
      </div>
      <DeleteButton onClick={onDelete} />
    </div>
  );
}
