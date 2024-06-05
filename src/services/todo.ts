import axios from "axios";
import { IPostBody, IPostProps, ITodo, TPost } from "../types";

const TODOS_URL = "https://jsonplaceholder.typicode.com/todos";
const POST_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchTodos = async (start: number, limit: number) =>
  await axios.get<ITodo[]>(`${TODOS_URL}/?_start=${start}&_limit=${limit}`);

export const fetchTodo = async (id: number) =>
  await axios.get<ITodo>(`${TODOS_URL}/${id}`);

export const createPost = async ({ title, body }: IPostProps) =>
  await axios.post<any, TPost, IPostBody>(POST_URL, {
    title,
    body,
    userId: 1,
  });
