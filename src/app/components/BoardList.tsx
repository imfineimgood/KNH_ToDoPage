import { Board } from "../types";

type BoardListProps = {
  boards: Board[];
};

export const BoardList = ({ boards }: BoardListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {boards.map((board, index) => (
        <div
          key={board.id}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {board.title}
        </div>
      ))}
    </div>
  );
};
