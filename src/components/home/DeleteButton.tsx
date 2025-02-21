interface DeleteButtonProps {
  onClick: () => void;
}

export function DeleteButton({ onClick }: DeleteButtonProps) {
  return (
    <button
      onClick={onClick}
      className="text-red-500 text-xl hover:text-red-600 ml-2 absolute right-0 top-0"
    >
      ×
    </button>
  );
}
