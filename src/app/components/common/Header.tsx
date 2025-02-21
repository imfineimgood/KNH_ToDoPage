"use client";

import { useBoardActions } from "@/hooks/useBoardActions";

export function PageHeader() {
  const { addBoard } = useBoardActions();
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold text-gray-900">To-Do Page</h1>
      <button
        onClick={addBoard}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        새 보드 추가
      </button>
    </div>
  );
}
