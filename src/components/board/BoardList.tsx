"use client";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useBoardStore } from "@/store/useBoardStore";
import BoardItem from "./BoardItem";

export default function BoardList() {
  const { boards } = useBoardStore();
  return (
    <DndProvider backend={HTML5Backend}>
      <ol className="flex gap-4 h-full overflow-x-auto pb-4 max-w-screen [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {boards.map((board, index) => (
          <BoardItem key={board.id} board={board} index={index} />
        ))}
      </ol>
    </DndProvider>
  );
}
