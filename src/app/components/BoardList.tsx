import { Board } from "../types";
import BoardItem from "./BoardItem";

type BoardListProps = {
  boards: Board[];
  onUpdateBoard: (boardId: string, title: string) => void;
  onDeleteBoard: (boardId: string) => void;
  onMoveBoard: (dragIndex: number, hoverIndex: number) => void;
  setBoards: React.Dispatch<React.SetStateAction<Board[]>>;
  onDeleteTodo: (boardId: string, todoId: string) => void;
};

export default function BoardList({
  boards,
  onUpdateBoard,
  onDeleteBoard,
  onMoveBoard,
  setBoards,
  onDeleteTodo,
}: BoardListProps) {
  const moveTodo = (
    fromBoardId: string,
    toBoardId: string,
    dragIndex: number,
    hoverIndex: number
  ) => {
    setBoards((prevBoards) => {
      const newBoards = JSON.parse(JSON.stringify(prevBoards));
      const fromBoardIndex = newBoards.findIndex(
        (b: Board) => b.id === fromBoardId
      );
      const toBoardIndex = newBoards.findIndex(
        (b: Board) => b.id === toBoardId
      );

      if (fromBoardIndex === -1 || toBoardIndex === -1) return prevBoards;

      const fromBoard = newBoards[fromBoardIndex];
      const toBoard = newBoards[toBoardIndex];

      if (!fromBoard.todos || !toBoard.todos) return prevBoards;

      const [draggedTodo] = fromBoard.todos.splice(dragIndex, 1);
      if (!draggedTodo) return prevBoards;

      toBoard.todos.splice(hoverIndex, 0, draggedTodo);

      return newBoards;
    });
  };

  return (
    <ol className="flex gap-4 h-full overflow-x-auto pb-4 max-w-screen [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {boards.map((board, index) => (
        <BoardItem
          key={board.id}
          board={board}
          index={index}
          onUpdateBoard={onUpdateBoard}
          onDeleteBoard={onDeleteBoard}
          onMoveBoard={onMoveBoard}
          onMoveTodo={moveTodo}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </ol>
  );
}
