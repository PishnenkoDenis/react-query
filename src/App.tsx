import { Button, Form, Input, Result, Space, Spin, Typography } from "antd";
import { TodoItem } from "./components/TodoItem";
import { useTodos } from "./hooks/useTodos";
import {
  useIsFetching,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import Title from "antd/es/typography/Title";
import { SyntheticEvent, useState } from "react";
import { createPost } from "./services/todo";
import { IPostProps } from "./types";

function App() {
  const { isFetching, error, data } = useTodos();

  const queryClient = useQueryClient();
  //useIsFetching - возвр-ет кол-во запросов
  const fetching = useIsFetching();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const handleBody = (e: React.ChangeEvent<HTMLInputElement>) =>
    setBody(e.target.value);

  const { mutate, isPending } = useMutation({
    mutationKey: ["post"],
    mutationFn: ({ title, body }: IPostProps) => createPost({ title, body }),
    onSuccess: () => {
      setTitle("");
      setBody("");
      alert("Post created");
    },
  });

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    mutate({ title, body });
  };

  if (error) {
    return <Result title="Something went wrong" />;
  }
  return (
    <Space
      direction="horizontal"
      style={{ display: "flex", alignItems: "start" }}
    >
      <Space direction="vertical">
        <Title style={{ marginLeft: "5rem" }}>TODOS:</Title>
        <Button
          style={{ marginLeft: "1rem" }}
          onClick={() => queryClient.invalidateQueries()}
        >
          Refetch
        </Button>
        {isFetching ? (
          <Spin style={{ marginLeft: "5rem" }} />
        ) : (
          data?.map(({ title, id }) => (
            <TodoItem title={title} id={id} key={id} />
          ))
        )}
      </Space>
      <Space>
        <Form style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Title style={{ marginLeft: "5rem" }}>POST FORM:</Title>
          <Input
            type="text"
            value={title}
            placeholder="title"
            onChange={handleTitle}
          />
          <Input
            type="text"
            value={body}
            placeholder="body"
            onChange={handleBody}
          />
          <Button onClick={handleSubmit}>
            {isPending ? <Spin /> : "Submit"}
          </Button>
        </Form>
        <Typography>{fetching}</Typography>
      </Space>
    </Space>
  );
}

export default App;
