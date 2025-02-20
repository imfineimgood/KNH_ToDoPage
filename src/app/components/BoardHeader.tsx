import { useBoardActions } from "@/hooks/useBoardActions";
import { useState } from "react";

interface BoardHeaderProps {
  title: string;
  boardId: string;
}

export function BoardHeader({ title, boardId }: BoardHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const { updateBoard, deleteBoard } = useBoardActions();

  const handleUpdateBoard = (newTitle: string) => {
    updateBoard(boardId, newTitle);
  };

  const handleDeleteBoard = () => {
    deleteBoard(boardId);
  };

  const handleBlur = () => {
    handleUpdateBoard(editTitle);
    setIsEditing(false);
  };

  return (
    <div className="flex justify-between items-center mb-4">
      {isEditing ? (
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onBlur={handleBlur}
          className="border rounded px-2 py-1"
          autoFocus
        />
      ) : (
        <h2
          onClick={() => setIsEditing(true)}
          className="text-xl font-semibold cursor-pointer"
        >
          {title}
        </h2>
      )}
      <button
        onClick={handleDeleteBoard}
        className="text-red-500 hover:text-red-600"
      >
        삭제
      </button>
    </div>
  );
}
