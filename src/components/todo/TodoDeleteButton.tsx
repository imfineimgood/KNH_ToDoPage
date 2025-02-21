interface TodoDeleteButtonProps {
  onClick: () => void;
}

export function TodoDeleteButton({ onClick }: TodoDeleteButtonProps) {
  return (
    <button
      onClick={onClick}
      className="text-red-500 text-xl hover:text-red-600 ml-2 absolute right-0 top-0"
    >
      ×
    </button>
  );
}
