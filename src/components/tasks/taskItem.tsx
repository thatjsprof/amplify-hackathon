import { Text, Card, Button } from "@aws-amplify/ui-react";
import Check from "src/assets/svgs/check";
import { ITask, IUpdateTask } from "src/interfaces/tasks";

const TaskItem = ({
  id,
  title,
  completed,
  description,
  updateTask,
}: ITask & { updateTask: (task: IUpdateTask) => Promise<void> }) => {
  const handleUpdate = async () => {
    await updateTask({
      title,
      id: id as string,
      completed: !completed,
      description: description as string,
    });
  };

  return (
    <Card
      style={{
        display: "flex",
        padding: "2rem",
        borderRadius: "5px",
        alignItems: "center",
        marginBottom: ".5rem",
        justifyContent: "space-between",
        backgroundColor: "rgb(250, 250, 250)",
      }}
    >
      <div>
        <Text>{title}</Text>
        <Text>{description}</Text>
      </div>
      <div>
        <Button onClick={handleUpdate}>
          <Check />
        </Button>
      </div>
    </Card>
  );
};

export default TaskItem;
