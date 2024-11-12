import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "../src/styles/style.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Helmet } from "react-helmet"; // Import Helmet

import ProtectedRoute from "./ProtectedRoute";
import NotFound from "./NotFound";
import LoginUser from "./Pages/LoginUser";

import TaskManager from "./Pages/TaskManager";

function App() {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const GetUserid = sessionStorage.getItem("token");
  const [masterMenu, setMasterMenu] = useState([]);
  useEffect(() => {
    if (token) {
      setUser(token);
    } else {
      setUser(null);
      setLoading(false);
    }
  }, [token]);

  console.log("App user----:", user);
  console.log("App token:", token);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <Routes>
      <Route path="/" element={<LoginUser setToken={setToken} />} />

      <Route path="*" element={<NotFound />} />

      <Route
        path="TaskManager"
        element={
          <>
            <Helmet>
              <title>TaskManager</title>
            </Helmet>
            <ProtectedRoute user={token}>
              <TaskManager />
            </ProtectedRoute>
          </>
        }
      />
    </Routes>
  );
}

export default App;
