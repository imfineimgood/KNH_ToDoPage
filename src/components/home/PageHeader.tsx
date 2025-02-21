"use client";

import { useBoardActions } from "@/hooks/useBoardActions";
import { AddButton } from "./AddButton";
import { PageTitle } from "./PageTitle";

export function PageHeader() {
  const { addBoard } = useBoardActions();
  return (
    <div className="flex justify-between items-center mb-8">
      <PageTitle title="To-Do Page"></PageTitle>
      <AddButton name="새 보드 추가" onClick={addBoard} />
    </div>
  );
}
