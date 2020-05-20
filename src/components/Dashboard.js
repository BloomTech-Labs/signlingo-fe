import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import cuid from "cuid";
import { dashLevel } from "../actions/DashboardLevel";
import { resetArray } from "../actions/ResetArray";
import DashboardCard from "./DashboardCard";

const Dashboard = (props) => {
  const history = useHistory();

  function logout() {
    props.resetArray();
    window.localStorage.removeItem("token");
    return history.push("/");
  }

  //These action calls call the back end level endpoints in the order we want them back. It is not DRY. There is an async / await here and in the dashLevel action to ensure that stack waits for each promise to return before moving on to next. The DRY option would be to create an ALL LEVELS ENDPOINT ON THE BACKEND.

  const testing = async () => {
    await props.dashLevel(props.userId || props.newUserId, 1);
    await props.dashLevel(props.userId || props.newUserId, 2);
    await props.dashLevel(props.userId || props.newUserId, 3);
    await props.dashLevel(props.userId || props.newUserId, 4);
    await props.dashLevel(props.userId || props.newUserId, 5);
  };

  useEffect(() => {
    props.resetArray();
    testing();
  }, []);

  return (
    <div>
      <div className="logoutDiv">
        <p onClick={logout}>Log out</p>
      </div>

      {props.globalLevel.map((each) => (
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
    newUserId: state.newUser.id,
  };
}

export default connect(mapStateToProps, {
  dashLevel,
  resetArray,
})(Dashboard);
