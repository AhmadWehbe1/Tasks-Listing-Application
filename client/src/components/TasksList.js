import styled from "styled-components";
import TaskItem from "./TaskItem";

const TasksWrapper = styled.div``;

const Heading = styled.h1`
  font-weight: bold;
  font-size: 26px;
  color: #ff6fff;
  text-align: center;
  margin: 6px 0;
`;

const Tasks = styled.ul`
  list-style-type: none;
  width: 100%;
  border-radius: 16px;
  background: #f5f5f5;
  padding: 20px;
`;

const TasksList = ({ tasks, setTasks }) => {
  return (
    <TasksWrapper>
      <Heading>Your Tasks</Heading>

      <Tasks>
        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            tasks={tasks}
            setTasks={setTasks}
          />
        ))}
      </Tasks>
    </TasksWrapper>
  );
};

export default TasksList;
