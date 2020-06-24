import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getAllLevels,
  getAllUserLevelsByOktaUID,
  addLevelsToUserAccount,
} from "../../actions/levelsActions";
import DashboardCard from "./DashboardCard";
import axios from "axios";
import { useOktaAuth } from "@okta/okta-react";
const URL = process.env.REACT_APP_BACK_END_BASE_URL;

const Dashboard = (props) => {
  const { authService } = useOktaAuth();

  function logout() {
    localStorage.removeItem("oktaUID");
    authService.logout("/");
  }

  useEffect(() => {
    // initialize dashboard with user data via the signup endpoint
    axios
      .post(
        URL + "user/signup",
        JSON.parse(localStorage.getItem("okta-token-storage"))
      )
      .then((res) => {
        // after initial login/register, retrieve all levels and user_level data
        localStorage.setItem("oktaUID", res.data.okta_uid);
        props.getAllUserLevelsByOktaUID(res.data.okta_uid);
        props.getAllLevels();
      })
      .catch((err) => {
        console.log("error loggin in and or registering", err);
      });
    // if level.length is greater then user_level length, this means
    // user is missing levels so add them.
    if (props.levels.length > props.userLevels.length) {
      props.addLevelsToUserAccount(
        props.levels,
        props.userLevels,
        localStorage.getItem("oktaUID")
      );
    } else if (props.levels.length < props.userLevels.length) {
      throw new Error("This should be unreachable");
    }
  }, []);

  return (
    <div className="dashboard-wrapper">
      <span className="logout-span">
        <p className="logout-filler"></p>
        <p className="logout" onClick={logout}>
          Log Out
        </p>
      </span>
      {props.userLevels.sort((a,b) => a.level_id - b.level_id).map((levelData) => (
        <DashboardCard
          key={levelData.id}
          levelData={levelData}
          title={levelData.level_id}
        />
      ))}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    levels: state.levelsReducer.levels, // array of all levels in database
    userLevels: state.levelsReducer.userLevels, // array of userLevels by userID in database
  };
}

const mapDispatchToProps = {
  getAllLevels,
  getAllUserLevelsByOktaUID,
  addLevelsToUserAccount,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
