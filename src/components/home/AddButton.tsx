interface AddButtonProps {
  name: string;
  onClick: () => void;
}

export function AddButton({ name, onClick }: AddButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      {name}
    </button>
  );
}
