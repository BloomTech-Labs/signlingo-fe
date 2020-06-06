import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import cuid from "cuid";
import { level } from "../actions/levelActions";
import { resetArray } from "../actions/resetArray";
import DashboardCard from "./DashboardCard";

const Dashboard = ({ resetArray, level, userId, globalLevel }, props) => {
  const history = useHistory();

  function logout() {
    // state was holding the information from previous logins for levels and selectedLessons
    // so using resetArray to empty before logout
    resetArray();
    window.localStorage.removeItem("token");
    return history.push("/");
  }

  // These action calls call the back end level endpoints in the order we want them back. It is not DRY.
  // There is an async / await here and in the level action to ensure that stack waits for each
  // promise to return before moving on to next. The DRY option would be to create an
  // ALL LEVELS ENDPOINT ON THE BACKEND.

  const fetchLevels = async () => {
    await level(userId, 1);
    await level(userId, 2);
    await level(userId, 3);
    await level(userId, 4);
    level(userId, 5);
  };

  useEffect(() => {
    // reset Array is used to reset the data stored in signImages and selectedLesson and levels back to empty
    // this allows for a fresh start everytime a user reaches the dashboard
    // there is probably a better way to make this work.
    resetArray();
    fetchLevels();
    // check to see if the user id exists in the database
    // if they do, then do not post / create new levels,
    // instead grab the levels already created, associated
  }, []);

  return (
    <div>
      <div className="logoutDiv">
        <p onClick={logout}>Log out</p>
      </div>

      {globalLevel.map((each) => (
        <>
        <DashboardCard key={cuid()} data={each} />
        {console.log("each item in dashboard", each)}
        </>
      ))}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    userId: state.user.id,
    globalLevel: state.level.levels,
  };
}

export default connect(mapStateToProps, {
  level,
  resetArray,
})(Dashboard);
