import { Text, Card, Button } from "@aws-amplify/ui-react";
import Bin from "src/assets/svgs/bin";
import Check from "src/assets/svgs/check";
import { ITask, IUpdateTask } from "src/interfaces/tasks";

const TaskItem = (
  task: ITask & {
    handleDelete: (id: string) => Promise<void>;
    handleUpdate: (task: IUpdateTask) => Promise<void>;
  }
) => {
  const { handleUpdate, handleDelete, ...extraTask } = task;

  const { id, title, description } = extraTask;

  return (
    <Card
      style={{
        display: "flex",
        padding: "2rem",
        borderRadius: "5px",
        alignItems: "center",
        marginBottom: "1rem",
        justifyContent: "space-between",
        backgroundColor: "rgb(250, 250, 250)",
      }}
    >
      <div>
        <Text>{title}</Text>
        <Text>{description}</Text>
      </div>
      <div
        style={{
          gap: 5,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Button onClick={() => handleUpdate(extraTask as IUpdateTask)}>
          <Check />
        </Button>
        <Button onClick={() => handleDelete(id as string)}>
          <Bin />
        </Button>
      </div>
    </Card>
  );
};

export default TaskItem;
