import styled from "styled-components";
import { toast } from "react-toastify";
import { TiTick } from "react-icons/ti";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { useState } from "react";

const Task = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #fcfcfc;
`;

const TaskText = styled.h4`
  font-weight: 600;
  font-size: 18px;
`;
const IconContainer = styled.div`
  display: flex;
`;

const IconWrapper = styled.div`
  cursor: pointer;
  margin: 0 4px;
  border: 1px solid #2752e7;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
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
const Input = styled.input`
  outline: none;
  width: 100%;
  padding: 6px 8px;
`;
const iconStyle = {
  color: "#2752e7",
};

const TextWrapper = styled.p`
  display: flex;
  flex-direction: column;
`;

const I = styled.i``;

const TaskItem = ({ task, setTasks, tasks }) => {
  // State to handle the Loading states about the operations
  const [loading, setLoading] = useState({
    update: false,
    delete: false,
    complete: false,
  });

  // Function to run to delete the task
  const { task: taskName, isCompleted, _id, createdAt } = task;
  console.log({ createdAt });
  // Runs On the click of tick icon
  const handleTickClick = (id) => {
    setLoading({
      ...loading,
      complete: true,
    });

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`,
      },
      body: JSON.stringify({ id, isCompleted: !isCompleted, task: taskName }),
    };
    // Doing Request to the server
    fetch("http://localhost:8000/update-task", options)
      .then((response) => {
        // Checking Response is good or not
        if (response.status === 200) {
          tasks.map((obj) => {
            if (obj._id === id) {
              obj.isCompleted = !isCompleted;
            }
            return obj;
          });
          setTasks(tasks);
          toast.success("Task Updated", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setLoading({
            ...loading,
            complete: false,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  // Runs to delete the task
  const handleDelete = (id) => {
    setLoading({
      ...loading,
      delete: true,
    });

    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`,
      },
      body: JSON.stringify({ id }),
    };
    // Doing Request to the server
    fetch("http://localhost:8000/delete-task", options)
      .then((response) => {
        // Checking Response is good or not
        if (response.status === 200) {
          // Deleting Also from the state too
          setTasks([...tasks.filter((task) => task._id !== id)]);

          setLoading({
            ...loading,
            delete: false,
          });

          toast.success("Task Deleted", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateClick = (id) => {
    setLoading({
      ...loading,
      update: true,
    });

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`,
      },
      body: JSON.stringify({
        id,
        isCompleted: isCompleted,
        task: taskValue,
        createdAt,
      }),
    };
    // Doing Request to the server
    fetch("http://localhost:8000/update-task", options)
      .then((response) => {
        // Checking Response is good or not
        if (response.status === 200) {
          tasks.map((obj) => {
            if (obj._id === id) {
              obj.task = taskValue;
            }
            return obj;
          });
          setTasks(tasks);
          toast.success("Task Updated", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setLoading({
            ...loading,
            update: false,
          });

          setIsEditClicked(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const [isEditClicked, setIsEditClicked] = useState(false);

  const [taskValue, setTaskValue] = useState(taskName);

  return (
    <Task>
      {isEditClicked ? (
        <Input
          onChange={(e) => {
            setTaskValue(e.target.value);
          }}
          value={taskValue}
        />
      ) : (
        <TextWrapper>
          <TaskText className={`${isCompleted && "completed"} }`}>
            {taskName}
          </TaskText>
          <I>
            Created On : {new Date(createdAt).toDateString()} at{" "}
            {new Date(createdAt).toLocaleTimeString()}{" "}
          </I>
        </TextWrapper>
      )}

      {isEditClicked ? (
        <Button
          onClick={() => {
            handleUpdateClick(_id);
          }}
        >
          Update
        </Button>
      ) : (
        <IconContainer>
          <IconWrapper
            className={`${loading.complete && "loading"}`}
            onClick={() => {
              handleTickClick(_id);
            }}
          >
            <TiTick style={iconStyle} />
          </IconWrapper>
          <IconWrapper
            onClick={() => {
              setIsEditClicked(true);
            }}
          >
            <AiOutlineEdit style={iconStyle} />
          </IconWrapper>
          <IconWrapper
            className={`${loading.delete && "loading"}`}
            onClick={() => {
              handleDelete(_id);
            }}
          >
            <MdOutlineDeleteOutline style={iconStyle} />
          </IconWrapper>
        </IconContainer>
      )}
    </Task>
  );
};

export default TaskItem;
