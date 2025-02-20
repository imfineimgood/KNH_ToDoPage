import { useState } from "react";

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

  const handleBlur = () => {
    const trimmedContent = content.trim();
    if (trimmedContent) {
      onSave(trimmedContent);
    }
    onBlur();
  };

  return (
    <input
      type="text"
      value={content}
      onChange={(e) => setContent(e.target.value)}
      onBlur={handleBlur}
      className="w-full border rounded px-2 py-1"
      autoFocus
    />
  );
}
