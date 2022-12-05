import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Header from "../components/Header";
import styled from "styled-components";
import TasksList from "../components/TasksList";

const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  align-self: start;
`;

const From = styled.form`
  width: 100%;
  display: flex;
  align-items: flex-end;
  background: #2752e7;
  padding: 20px;
  border-radius: 16px;
`;
const FormChild = styled.div`
  width: 100%;
  margin: 8px 0;
`;
const Input = styled.input`
  width: 100%;
  outline: none;
  border-radius: 6px;
  padding: 8px 8px;
  border: none;
  margin: 4px 0;
  font-size: 18px;
`;
const Label = styled.label`
  color: #ffffff;
  font-weight: 600;
  font-size: 22px;
`;

const Button = styled.button`
  border: none;
  background: #ffffff;
  border-radius: 6px;
  padding: 8px 16px;
  font-weight: 600;
  font-size: 16px;
  margin: 8px 0 8px 8px;
  color: #2752e7;
  width: fit-content;
`;

const Main = styled.main`
  min-height: calc(100vh - 94px);
  max-width: 768px;
  margin: 0 auto;
  padding: 10px;
  width: 100%;
  display: flex;
`;

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [taskName, setTaskName] = useState("");

  // State to store to the tasks
  const [tasks, setTasks] = useState([]);

  // Runs to get the tasks from the server
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`,
      },
    };
    // Doing Request to the server
    fetch("http://localhost:8000/get-tasks", options)
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Function Run to handle the add task button
  const handleAdd = (e) => {
    e.preventDefault();
    setLoading(true);
    const createdAt = new Date();
    console.log(createdAt);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`,
      },
      body: JSON.stringify({
        task: taskName,
        isCompleted: false,
        createdAt,
      }),
    };

    // Doing Request to the server
    fetch("http://localhost:8000/add-task", options)
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "New Task Added Successful") {
          setTasks([
            ...tasks,
            {
              task: taskName,
              isCompleted: false,
              _id: data.id,
              createdAt,
            },
          ]);

          toast.success("New Task Added", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          setTaskName("");
        }
      })
      .catch((err) => {
        toast.error("Error In Inserting the Task", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .finally(() => setLoading(false));
  };
  return (
    <div>
      <Header />
      <Main>
        <Wrapper>
          <From onSubmit={handleAdd}>
            <FormChild>
              <Label>Task</Label>
              <Input
                value={taskName}
                type={"text"}
                name="taskName"
                onChange={(e) => {
                  setTaskName(e.target.value);
                }}
                placeholder="Enter Your Task Here"
              />
            </FormChild>
            <Button className={`${loading && " loading "}`} type="submit">
              Add Task
            </Button>
          </From>

          <TasksList tasks={tasks} setTasks={setTasks} />
        </Wrapper>
      </Main>
    </div>
  );
};

export default Dashboard;
