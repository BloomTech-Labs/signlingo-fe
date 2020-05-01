import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import DashboardCard from "./DashboardCard";
import { dummyDataDash } from "./DummyData";

const Dashboard = (props) => {
  const [data, setData] = useState([]);

  function logout() {
    window.localStorage.removeItem("token");
    //redirect to whatever becomes the landing page
    return <Redirect to="/" />;
  }

  useEffect(() => {
    setData(dummyDataDash);
  }, []);

  return (
    <div>
      <div className="logoutDiv">
        <p onClick={logout}>Log out</p>
      </div>

      {data.map((each) => (
        <DashboardCard key={each.id} data={each} />
      ))}
    </div>
  );
};

export default Dashboard;
