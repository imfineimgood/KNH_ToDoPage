import { useState } from "react";

interface EditableTitleProps {
  title: string;
  onSave: (newTitle: string) => void;
}

export function BoardEditTitle({ title, onSave }: EditableTitleProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);

  const handleBlur = () => {
    onSave(editTitle);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <input
        type="text"
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
        onBlur={handleBlur}
        className="border rounded px-2 py-1"
        autoFocus
      />
    );
  }

  return (
    <h2
      onClick={() => setIsEditing(true)}
      className="text-xl font-semibold cursor-pointer"
    >
      {title}
    </h2>
  );
}
