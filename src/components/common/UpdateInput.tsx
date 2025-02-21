interface UpdateInputProps {
  value: string;
  onChange: (value: string) => void;
  onSave: () => void;
  className?: string;
  placeholder?: string;
}

export function UpdateInput({
  value,
  onChange,
  onSave,
  className = "border rounded px-2 py-1",
  placeholder,
}: UpdateInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSave();
    }
  };

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onSave}
      onKeyDown={handleKeyDown}
      className={className}
      placeholder={placeholder}
      autoFocus
    />
  );
}
