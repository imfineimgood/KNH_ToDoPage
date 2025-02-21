import { DragItem, TodoDragItem } from "@/type/types";
import { RefObject, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

export const useBoardDrag = (
  index: number,
  moveBoard: (dragIndex: number, hoverIndex: number) => void,
  onTodoDrop: (toBoardId: string) => void
) => {
  const ref = useRef<HTMLLIElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: "BOARD",
    item: { index, type: "BOARD" },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ["BOARD", "TODO"],
    hover: (item: DragItem) => {
      if (!ref.current) return;

      if (item.type === "BOARD") {
        const dragIndex = item.index;
        const hoverIndex = index;

        if (dragIndex === hoverIndex) return;

        moveBoard(dragIndex, hoverIndex);
        item.index = hoverIndex;
      }
    },
    drop: (item: DragItem, monitor) => {
      if (item.type === "TODO" && !monitor.didDrop()) {
        const todoItem = item as TodoDragItem;
        onTodoDrop(todoItem.boardId);
      }
    },
  });

  const dragDropRef = (el: RefObject<HTMLLIElement | null>) => {
    drag(drop(el));
    return el;
  };

  return {
    ref,
    isDragging,
    dragDropRef,
  };
};
