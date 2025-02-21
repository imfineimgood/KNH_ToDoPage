"use client";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BoardList from "./components/board/BoardList";
import { PageHeader } from "./components/common/Header";

export default function Home() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen bg-gray-100 p-8">
        <div className="w-full h-full flex flex-col">
          <PageHeader />
          <BoardList />
        </div>
      </div>
    </DndProvider>
  );
}
