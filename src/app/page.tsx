"use client";

import { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { loadBoards, saveBoards } from "./utils/storage";
import { Board } from "./types";
import BoardList from "./components/BoardList";

export default function Home() {
  const [boards, setBoards] = useState<Board[]>([]);

  useEffect(() => {
    setBoards(loadBoards());
  }, []);

  useEffect(() => {
    saveBoards(boards);
  }, [boards]);

  const addBoard = () => {
    const newBoard: Board = {
      id: crypto.randomUUID(),
      title: "새 보드",
      todos: [],
    };
    setBoards([...boards, newBoard]);
  };

  const updateBoard = (boardId: string, title: string) => {
    setBoards(
      boards.map((board) =>
        board.id === boardId ? { ...board, title } : board
      )
    );
  };

  const deleteBoard = (boardId: string) => {
    setBoards(boards.filter((board) => board.id !== boardId));
  };

  const moveBoard = (dragIndex: number, hoverIndex: number) => {
    const newBoards = [...boards];
    const dragBoard = newBoards[dragIndex];
    newBoards.splice(dragIndex, 1);
    newBoards.splice(hoverIndex, 0, dragBoard);
    setBoards(newBoards);
  };

  const deleteTodo = (boardId: string, todoId: string) => {
    setBoards(
      boards.map((board) => {
        if (board.id === boardId) {
          return {
            ...board,
            todos: board.todos.filter((todo) => todo.id !== todoId),
          };
        }
        return board;
      })
    );
  };

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
          <BoardList
            boards={boards}
            onUpdateBoard={updateBoard}
            onDeleteBoard={deleteBoard}
            onMoveBoard={moveBoard}
            setBoards={setBoards}
            onDeleteTodo={deleteTodo}
          />
        </div>
      </div>
    </DndProvider>
  );
}
