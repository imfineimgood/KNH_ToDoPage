import { useState, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Board, Todo } from "../types";
import TodoItem from "./TodoItems";

type BoardProps = {
  board: Board;
  index: number;
  onUpdateBoard: (boardId: string, title: string) => void;
  onDeleteBoard: (boardId: string) => void;
  onMoveBoard: (dragIndex: number, hoverIndex: number) => void;
  onMoveTodo: (
    fromBoardId: string,
    toBoardId: string,
    dragIndex: number,
    hoverIndex: number
  ) => void;
  onDeleteTodo: (boardId: string, todoId: string) => void;
};

export default function BoardItem({
  board,
  index,
  onUpdateBoard,
  onDeleteBoard,
  onMoveBoard,
  onMoveTodo,
  onDeleteTodo,
}: BoardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(board.title);
  const [newTodo, setNewTodo] = useState("");

  const ref = useRef<HTMLLIElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: "BOARD",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "BOARD",
    hover: (item: { index: number }) => {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      onMoveBoard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [, todoDrop] = useDrop({
    accept: "TODO",
    hover: (item: { boardId: string; index: number }, monitor) => {
      if (!monitor.isOver({ shallow: true })) return;
      if (item.boardId !== board.id) {
        onMoveTodo(item.boardId, board.id, item.index, board.todos.length);
        item.boardId = board.id;
        item.index = board.todos.length;
      }
    },
  });

  const combinedRef = (el: HTMLLIElement) => {
    ref.current = el;
    drag(drop(todoDrop(el)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      const todo: Todo = {
        id: crypto.randomUUID(),
        content: newTodo.trim(),
      };
      board.todos.push(todo);
      setNewTodo("");
    }
  };

  return (
    <li
      ref={combinedRef}
      className={`text-black bg-white rounded-lg shadow p-4 h-fit w-[350px] flex-shrink-0 ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div>
        <div className="flex justify-between items-center mb-4">
          {isEditing ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => {
                onUpdateBoard(board.id, title);
                setIsEditing(false);
              }}
              className="border rounded px-2 py-1"
              autoFocus
            />
          ) : (
            <h2
              onClick={() => setIsEditing(true)}
              className="text-xl font-semibold cursor-pointer"
            >
              {board.title}
            </h2>
          )}
          <button
            onClick={() => onDeleteBoard(board.id)}
            className="text-red-500 hover:text-red-600"
          >
            삭제
          </button>
        </div>
        <ol className="space-y-2 min-h-[10px]">
          {board.todos.map((todo, todoIndex) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              index={todoIndex}
              boardId={board.id}
              onMoveTodo={onMoveTodo}
              onDeleteTodo={onDeleteTodo}
            />
          ))}
        </ol>
      </div>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="새 할 일 추가"
          className="w-full border rounded px-3 py-2"
        />
      </form>
    </li>
  );
}
