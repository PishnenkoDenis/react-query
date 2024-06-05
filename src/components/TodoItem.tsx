import { Card, Row } from "antd";
import { FC } from "react";

type TTodoItemProps = {
  title: string;
  id: number;
};

export const TodoItem: FC<TTodoItemProps> = ({ title, id }) => {
  return (
    <Card style={{ width: "600px" }}>
      <Row style={{ marginLeft: "1rem" }}>{title}</Row>
    </Card>
  );
};
