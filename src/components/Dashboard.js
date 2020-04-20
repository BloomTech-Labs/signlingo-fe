import React from "react";
import { Redirect } from "react-router-dom";

const Dashboard = props => {
  function logout() {
    window.localStorage.removeItem("token");
    //redirect to whatever becomes the landing page
    return <Redirect to="/" />;
  }

  return (
    <div>
      <p>Dashboard Up</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
