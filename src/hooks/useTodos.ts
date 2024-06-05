import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "../services/todo";

const start = 0;
const limit = 10;

export const useTodos = () =>
  useQuery({
    queryKey: ["todos"],
    queryFn: () => fetchTodos(start, limit),
    select: ({ data }) => data,
    retry: 3, //кол-во попыток запроса
    staleTime: 3600, //время до устаревания данных
  });
