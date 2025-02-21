import { DRAG_TYPES } from "@/const";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

export const useTodoDrag = (
  boardId: string,
  index: number,
  moveTodo: (
    fromBoardId: string,
    toBoardId: string,
    dragIndex: number,
    hoverIndex: number
  ) => void
) => {
  const ref = useRef<HTMLLIElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: DRAG_TYPES.TODO,
    item: () => ({ boardId, index, type: DRAG_TYPES.TODO }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: DRAG_TYPES.TODO,
    hover: (
      item: { type: string; boardId: string; index: number },
      monitor
    ) => {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex && item.boardId === boardId) return;

      const targetRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (targetRect.bottom - targetRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - targetRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveTodo(item.boardId, boardId, dragIndex, hoverIndex);
      item.index = hoverIndex;
      item.boardId = boardId;
    },
  });
  return {
    ref,
    isDragging,
    TodoDragDropRef: (el: HTMLLIElement) => drag(drop(el)),
  };
};
