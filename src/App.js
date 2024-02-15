//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Todo from "./components/Todo";
import { useState, useEffect } from "react";
import { getUserStore } from "./utils/storage";

function App() {
  const [log, setLog] = useState(false);

  useEffect(() => {
    const user = JSON.parse(getUserStore());
    if (!user) {
      setLog(false);
    } else {
      setLog(true);
    }
  }, []);

  const dataLog = (data) => {
    setLog(data);
  };

  return <>{log ? <Todo dataLog={dataLog} /> : <Login dataLog={dataLog} />}</>;
}

export default App;
