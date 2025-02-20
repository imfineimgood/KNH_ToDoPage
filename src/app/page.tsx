"use client";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import BoardList from "./components/BoardList";

import { useBoardStore } from "@/store/useBoardStore";
import { useBoardActions } from "@/hooks/useBoardActions";

export default function Home() {
  const { boards } = useBoardStore();
  const { addBoard } = useBoardActions();

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen bg-gray-100 p-8">
        <div className="w-full h-full flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">To-Do Page</h1>
            <button
              onClick={addBoard}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              새 보드 추가
            </button>
          </div>
          <BoardList boards={boards} />
        </div>
      </div>
    </DndProvider>
  );
}
