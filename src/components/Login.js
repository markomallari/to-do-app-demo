import React, { useState } from "react";
import "./Login.css";
import { checkUser } from "../services/services";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setUserStore } from "../utils/storage";
toast.configure();

const Login = (props) => {
  const { dataLog } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const checkAccountExists = () => {
    const data = {
      username: email,
      password: password,
    };
    checkUser(data)
      .then((response) => {
        if (response?.data?.userExists) {
          setUserStore(JSON.stringify(response?.data?.data));
          dataLog(true);
          toast.success(`Successful logged in`, {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.error(`${response?.data?.status}`, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((error) => {});
  };

  return (
    <div className="log-form">
      <h2>Login to your account</h2>
      <form>
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          className="btn"
          onClick={() => checkAccountExists()}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
