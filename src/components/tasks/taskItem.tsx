import { Text, Card, Button, Icon } from "@aws-amplify/ui-react";
import Check from "src/assets/svgs/check";

export interface ITask {
  title: string;
  id: string | number;
  description?: string;
}

const TaskItem = ({ title, description }: ITask) => {
  return (
    <Card
      style={{
        display: "flex",
        padding: "2rem",
        borderRadius: "5px",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "rgb(250, 250, 250)",
      }}
    >
      <div>
        <Text>{title}</Text>
        <Text>{description}</Text>
      </div>
      <div>
        <Button>
          <Check />
        </Button>
      </div>
    </Card>
  );
};

export default TaskItem;
