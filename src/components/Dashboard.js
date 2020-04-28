import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import DashboardCard from "./DashboardCard";
import dummyData from "./DummyData";

const Dashboard = (props) => {
  const [data, setData] = useState([]);

  function logout() {
    window.localStorage.removeItem("token");
    //redirect to whatever becomes the landing page
    return <Redirect to="/" />;
  }

  useEffect(() => {
    setData(dummyData);
  }, []);

  return (
    <div>
      <p>Hello User</p>
      <button onClick={logout}>Logout</button>

      {data.map((each) => (
        <DashboardCard key={each.id} data={each} />
      ))}
    </div>
  );
};

export default Dashboard;
