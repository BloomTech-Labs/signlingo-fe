import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  getAllLevels,
  checkLevels,
  addLevelsToUserAccount,
} from "../../actions/levelsActions";
import cuid from "cuid";
import DashboardCard from "./DashboardCard";

// use getAllLevels Action Creator to get all levels and save to store
// use checkLevels Action Creator to get all user levels from user_levels table and save to store
// check if user has all sign lingo levels linked to them in the user_levels join table, IF NOT,
// add all reamining levels to the join table.
// Display levels via DashboardCard component, disabling all levels with timestamps
// === null in user_levels table (data we now have in store from checkLevels action creator)

const Dashboard = (props) => {
  const history = useHistory();
  // const numLevelsToAdd = props.levels.length - props.userLevels.length;
  console.log("NUM LEVELS TO ADD", props.levels.length - props.userLevels.length)
  console.log("props.levels.LENGTH", props.levels.length)
  useEffect(() => {
    props.getAllLevels();
    props.checkLevels();
    if ((props.levels.length - props.userLevels.length) !== 0) {
      {
        addLevelsToUserAccount(props.levels.length, props.levels.length - props.userLevels.length);
      }
    }
  }, [props.levels.length]);

  return (
    <div>
      {props.levels.length - props.userLevels.length !== 0 ? (
        <>
          <p>Loading New Levels...</p>
        </>
      ) : (
        props.levels.map((level) => <DashboardCard levelName={level.name} />)
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    levels: state.levelsReducer.levels,
    userLevels: state.levelsReducer.userLevels,
  };
}

const mapDispatchToProps = {
  getAllLevels,
  checkLevels,
  addLevelsToUserAccount,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
