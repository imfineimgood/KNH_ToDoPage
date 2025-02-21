import { useState } from "react";
import { UpdateInput } from "../common/UpdateInput";

interface EditableTitleProps {
  title: string;
  onSave: (newTitle: string) => void;
}

export function BoardEditTitle({ title, onSave }: EditableTitleProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);

  const handleSave = () => {
    onSave(editTitle);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <UpdateInput
        value={editTitle}
        onChange={setEditTitle}
        onSave={handleSave}
        className="border rounded px-2 py-1 text-xl"
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
