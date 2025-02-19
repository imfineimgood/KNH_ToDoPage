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
  onDeleteTodo: (boardId: string, todoId: string) => void;
};

export default function TodoItem({
  todo,
  index,
  boardId,
  onMoveTodo,
  onDeleteTodo,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(todo.content);

  const ref = useRef<HTMLLIElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: "TODO",
    item: () => ({ boardId, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      if (!monitor.didDrop()) {
        return;
      }
    },
  });
  const [, drop] = useDrop({
    accept: "TODO",
    hover: (item: { boardId: string; index: number }) => {
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
    <li
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
        <div className="relative w-full">
          <div
            className="w-full break-all pr-8"
            onClick={() => setIsEditing(true)}
          >
            {todo.content}
          </div>
          <button
            onClick={() => onDeleteTodo(boardId, todo.id)}
            className="text-red-500 text-xl hover:text-red-600 ml-2 absolute right-0 top-0 "
          >
            ×
          </button>
        </div>
      )}
    </li>
  );
}
