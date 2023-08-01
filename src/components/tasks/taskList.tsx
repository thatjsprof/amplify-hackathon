import { ITask, IUpdateTask } from "src/interfaces/tasks";
import TaskItem from "./taskItem";
import { Heading, Loader } from "@aws-amplify/ui-react";
import { useStore } from "src/store/store";
import { useEffect } from "react";
import { editTask, removeTask } from "src/services/tasks";

interface ITaskMap {
  tasks: ITask[];
  handleDelete: (id: string) => Promise<void>;
  handleUpdate: (task: IUpdateTask) => Promise<void>;
}

const TaskMap = ({ tasks, handleUpdate, handleDelete }: ITaskMap) => {
  return (
    <>
      {tasks.map((task) => {
        return (
          <TaskItem
            key={task.id}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
            {...task}
          />
        );
      })}
    </>
  );
};

interface ITaskList {
  type: "completed" | "inprogress";
}

const TaskList = ({ type }: ITaskList) => {
  const [id] = useStore((state) => [state.user.user?.id]);

  const [tasks, loading, fetchTasks] = useStore((state) => [
    state.task.tasks,
    state.task.loading,
    state.task.fetchTasks,
  ]);

  const refetch = async () => {
    await fetchTasks(id as string, {
      completed: type === "completed",
    });
  };

  const handleUpdate = async (task: IUpdateTask) => {
    await editTask({
      ...task,
      completed: !task.completed,
    });
    await refetch();
  };

  console.log(tasks);

  const handleDelete = async (id: string) => {
    await removeTask(id);
    await refetch();
  };

  useEffect(() => {
    if (id) {
      fetchTasks(id, {
        completed: type === "completed",
      });
    }
  }, [id]);

  return (
    <div
      style={{
        marginTop: "2rem",
      }}
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          {(tasks || []).length > 0 ? (
            <TaskMap
              tasks={tasks}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
            />
          ) : (
            <Heading level={5}>No Tasks Found</Heading>
          )}
        </>
      )}
    </div>
  );
};

export default TaskList;
