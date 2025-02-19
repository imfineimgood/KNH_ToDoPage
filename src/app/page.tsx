"use client";

import { useState } from "react";
import { BoardList } from "./components/BoardList";

import { Board } from "./types";

export default function Home() {
  const initBoard = [
    {
      id: "1",
      title: "backlog",
      todos: [{ id: "1", content: "기능 구현" }],
    },
  ];
  const [boards, setBoards] = useState<Board[]>(initBoard);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">To-Do Page</h1>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            새 보드 추가
          </button>
        </div>
        <BoardList boards={boards} />
      </div>
    </div>
  );
}
