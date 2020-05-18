import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { dashLevel } from "../actions/DashboardLevel";
import DashboardCard from "./DashboardCard";

const Dashboard = (props) => {
  const history = useHistory();
  const [levels, setLevels] = useState([]);
  console.log("we about to solve it ", levels);

  function logout() {
    window.localStorage.removeItem("token");
    return history.push("/");
  }

  // const testing = async () => {
  //   await setLevels([
  //     ...levels,
  //     props.dashLevel(props.userId || props.newUserId, 1),
  //   ]);
  //   await setLevels([
  //     ...levels,
  //     props.dashLevel(props.userId || props.newUserId, 2),
  //   ]);
  //   await setLevels([
  //     ...levels,
  //     props.dashLevel(props.userId || props.newUserId, 3),
  //   ]);
  //   await setLevels([
  //     ...levels,
  //     props.dashLevel(props.userId || props.newUserId, 4),
  //   ]);
  //   await setLevels([
  //     ...levels,
  //     props.dashLevel(props.userId || props.newUserId, 5),
  //   ]);
  // };

  useEffect(() => {
    // testing();
  }, []);

  return (
    <div>
      <div className="logoutDiv">
        <p onClick={logout}>Log out</p>
      </div>

      {levels.map((each) => (
        <DashboardCard key={each.id} data={each} />
      ))}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    userId: state.user.id,
    dashLevel: state.dashLevel.levels,
    newUserId: state.newUser.id,
  };
}

export default connect(mapStateToProps, { dashLevel })(Dashboard);
