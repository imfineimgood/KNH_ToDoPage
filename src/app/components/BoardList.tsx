import { Board } from "../types";
import BoardItem from "./BoardItem";

type BoardListProps = {
  boards: Board[];
};

export default function BoardList({ boards }: BoardListProps) {
  return (
    <ol className="flex gap-4 h-full overflow-x-auto pb-4 max-w-screen [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {boards.map((board, index) => (
        <BoardItem key={board.id} board={board} index={index} />
      ))}
    </ol>
  );
}
