import React, { useEffect, useState } from "react";
import "./Todo.css";
import AddTodo from "./AddTodo";
import TodoCard from "./TodoCard";
import {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
} from "../services/services";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserStore, removeUserStore } from "../utils/storage";
toast.configure();

const Todo = (props) => {
  const { dataLog } = props;
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const user = JSON.parse(getUserStore());
    if (!user) {
      dataLog(false);
    }
    getTaskList();
  }, []);

  const getTaskList = () => {
    getTasks()
      .then(({ data }) => {
        setTasks(data?.data?.data);
      })
      .catch((error) => {
        toast.error(`${error}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const dataFromAdd = (data) => {
    if (data) {
      addTask(data)
        .then((response) => {
          const newTasks = [...tasks, response?.data];
          setTasks(newTasks);
          toast.success("Successfully Added!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        })
        .catch((error) => {
          toast.error(`${error}`, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    }
  };

  const dataFromUpdate = (data, from) => {
    if (data) {
      updateTask(data)
        .then((response) => {
          const newTasks = tasks.map((obj) => {
            if (obj.id === response?.data?.id) {
              return (obj = response?.data);
            }
            return obj;
          });
          setTasks(newTasks);
          let msg = "";
          if (from && from === "c-a") {
            msg = "Successfully added a comment";
          } else if (from && from === "c-d") {
            msg = "Successfully removed a comment";
          } else if (from && from === "c-u") {
            msg = "Successfully updated a comment";
          } else {
            msg = "Successfully Updated!";
          }
          toast.success(`${msg}`, {
            position: toast.POSITION.TOP_RIGHT,
          });
        })
        .catch((error) => {
          toast.error(`${error}`, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    }
  };

  const dataFromDelete = (id) => {
    if (id) {
      deleteTask(id)
        .then((res) => {
          getTaskList();
          toast.error("Successfully Deleted!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        })
        .catch((error) => {
          toast.error(`${error}`, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    }
  };

  const dataFromCommentAdd = (data) => {
    dataFromUpdate(data, "c-a");
  };

  const dataFromCommentDelete = (data) => {
    dataFromUpdate(data, "c-d");
  };

  const dataFromCommentUpdate = (data) => {
    dataFromUpdate(data, "c-u");
  };

  const logout = () => {
    dataLog(false);
    removeUserStore();
    toast.error(`Logged out!`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  return (
    <>
      <div className="container">
        <h2>TO DO TASKS</h2>
        <AddTodo
          dataFromAdd={dataFromAdd}
          currentCount={Math.max(...tasks?.map((o) => o.id))}
        />
        <button
          className="button primary"
          onClick={() => {
            logout();
          }}
        >
          Logout
        </button>
        {tasks?.map((task, i) => (
          <TodoCard
            task={task}
            key={i}
            dataFromUpdate={dataFromUpdate}
            dataFromDelete={dataFromDelete}
            dataFromCommentAdd={dataFromCommentAdd}
            dataFromCommentUpdate={dataFromCommentUpdate}
            dataFromCommentDelete={dataFromCommentDelete}
          />
        ))}
      </div>
    </>
  );
};

export default Todo;
