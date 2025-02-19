import Board from "./Board";

type BoardListProps = {
  boards: Board[];
  onUpdateBoard: (boardId: string, title: string) => void;
  onDeleteBoard: (boardId: string) => void;
  onMoveBoard: (dragIndex: number, hoverIndex: number) => void;
  setBoards: React.Dispatch<React.SetStateAction<Board[]>>;
};

export default function BoardList({
  boards,
  onUpdateBoard,
  onDeleteBoard,
  onMoveBoard,
  setBoards,
}: BoardListProps) {
  const moveTodo = (
    fromBoardId: string,
    toBoardId: string,
    dragIndex: number,
    hoverIndex: number
  ) => {
    setBoards((prevBoards) => {
      const newBoards = JSON.parse(JSON.stringify(prevBoards)); // Deep copy
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {boards.map((board, index) => (
        <Board
          key={board.id}
          board={board}
          index={index}
          onUpdateBoard={onUpdateBoard}
          onDeleteBoard={onDeleteBoard}
          onMoveBoard={onMoveBoard}
          onMoveTodo={moveTodo}
        />
      ))}
    </div>
  );
}
