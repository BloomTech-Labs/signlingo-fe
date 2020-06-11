import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getAllLevels,
  getAllUserLevelsByID,
  addLevelsToUserAccount,
} from "../../actions/levelsActions";
import DashboardCard from "./DashboardCard";

const Dashboard = (props) => {
  const history = useHistory();
  console.log("outside", props.levels.length, props.userLevels.length);
  function logout() {
    localStorage.removeItem("userID", "token", "okta-token-storage");
    history.push("/");
  }
  useEffect(() => {
    props.getAllUserLevelsByID();
    props.getAllLevels();
    console.log("inside", props.levels.length, props.userLevels.length);
    if (props.levels.length > props.userLevels.length) {
      console.log("conditional", props.levels.length, props.userLevels.length);
      props.addLevelsToUserAccount(props.levels, props.userLevels);
    } else if (props.levels.length < props.userLevels.length) {
      throw new Error("This should be unreachable");
    }
  }, [props.levels.length]);

  return (
    <div className="dashboard-wrapper">
      <span className="logout-span">
        <p className="logout-filler"></p>
        <p className="logout"onClick={logout}>Log Out</p>
      </span>
      {props.isLoading ? (
        <>
          <p>{props.loadingMessage}</p>
        </>
      ) : (
        props.userLevels.map((levelData) => (
          <DashboardCard
            key={levelData.id}
            levelData={levelData}
            title={levelData.level_id}
          />
        ))
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    isLoading: state.authReducer.isLoading,
    loadingMessage: state.authReducer.loadingMessage,
    levels: state.levelsReducer.levels, // array of all levels in database
    userLevels: state.levelsReducer.userLevels, // array of userLevels by userID in database
  };
}

const mapDispatchToProps = {
  getAllLevels,
  getAllUserLevelsByID,
  addLevelsToUserAccount,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
