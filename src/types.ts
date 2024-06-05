export interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export type TPost = Omit<ITodo, "completed"> & { body: string };

export interface IPostBody {
  title: string;
  body: string;
  userId: number;
}

export interface IPostProps {
  title: string;
  body: string;
}
