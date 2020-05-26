import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import cuid from "cuid";
import { dashLevel } from "../actions/DashboardLevel";
import { resetArray } from "../actions/ResetArray";
import DashboardCard from "./DashboardCard";

const Dashboard = (
  { resetArray, dashLevel, userId, globalLevel },
  props
) => {
  const history = useHistory();

  function logout() {
    resetArray();
    window.localStorage.removeItem("token");
    return history.push("/");
  }

  //These action calls call the back end level endpoints in the order we want them back. It is not DRY. There is an async / await here and in the dashLevel action to ensure that stack waits for each promise to return before moving on to next. The DRY option would be to create an ALL LEVELS ENDPOINT ON THE BACKEND.

  const testing = async () => {
    await dashLevel(userId, 1);
    await dashLevel(userId, 2);
    await dashLevel(userId, 3);
    await dashLevel(userId, 4);
    dashLevel(userId, 5);
  };

  useEffect(() => {
    resetArray();
    testing();
  }, []);

  return (
    <div>
      <div className="logoutDiv">
        <p onClick={logout}>Log out</p>
      </div>

      {globalLevel.map((each) => (
        <DashboardCard key={cuid()} data={each} />
      ))}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    userId: state.user.id,
    globalLevel: state.dashLevel.levels,
    isLoading: state.dashLevel.isLoading,
  };
}

export default connect(mapStateToProps, {
  dashLevel,
  resetArray,
})(Dashboard);
