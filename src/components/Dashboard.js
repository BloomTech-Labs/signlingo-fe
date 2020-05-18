import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import cuid from "cuid";
import { dashLevel } from "../actions/DashboardLevel";
import DashboardCard from "./DashboardCard";

const Dashboard = (props) => {
  const history = useHistory();

  function logout() {
    window.localStorage.removeItem("token");
    return history.push("/");
  }

  const testing = () => {
    for (let i = 1; i <= 5; i++) {
      props.dashLevel(props.userId || props.newUserId, i);
    }
  };

  useEffect(() => {
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

export default connect(mapStateToProps, { dashLevel })(Dashboard);
