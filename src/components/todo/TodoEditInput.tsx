import { useState } from "react";
import { UpdateInput } from "../home/UpdateInput";

interface TodoEditInputProps {
  initialContent: string;
  onSave: (content: string) => void;
  onBlur: () => void;
}

export function TodoEditInput({
  initialContent,
  onSave,
  onBlur,
}: TodoEditInputProps) {
  const [content, setContent] = useState(initialContent);
  const handleSave = () => {
    const trimmedContent = content.trim();
    if (trimmedContent) {
      onSave(trimmedContent);
    }
    onBlur();
  };

  return (
    <UpdateInput
      value={content}
      onChange={setContent}
      onSave={handleSave}
      className="w-full border rounded px-2 py-1"
    />
  );
}
