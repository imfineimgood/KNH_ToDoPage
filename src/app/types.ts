export interface Todo {
  id: string;
  content: string;
}

export interface Board {
  id: string;
  title: string;
  todos: Todo[];
}

export interface DragItem {
  index: number;
  id: string;
  type: string;
}

export interface TodoDragItem extends DragItem {
  boardId: string;
}
