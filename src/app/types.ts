type Todo = {
  id: string;
  content: string;
};

export type Board = {
  id: string;
  title: string;
  todos: Todo[];
};
