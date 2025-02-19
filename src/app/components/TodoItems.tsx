import { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Todo } from "../types";

type TodoItemProps = {
  todo: Todo;
  index: number;
  boardId: string;
  onMoveTodo: (
    fromBoardId: string,
    toBoardId: string,
    dragIndex: number,
    hoverIndex: number
  ) => void;
};

export default function TodoItem({
  todo,
  index,
  boardId,
  onMoveTodo,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(todo.content);

  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: "TODO",
    item: { boardId, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "TODO",
    hover: (item: { boardId: string; index: number }, monitor) => {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex && item.boardId === boardId) return;

      onMoveTodo(item.boardId, boardId, dragIndex, hoverIndex);
      item.index = hoverIndex;
      item.boardId = boardId;
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`p-3 bg-gray-50 rounded cursor-move ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      {isEditing ? (
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onBlur={() => {
            todo.content = content;
            setIsEditing(false);
          }}
          className="w-full border rounded px-2 py-1"
          autoFocus
        />
      ) : (
        <div onClick={() => setIsEditing(true)}>{todo.content}</div>
      )}
    </div>
  );
}
