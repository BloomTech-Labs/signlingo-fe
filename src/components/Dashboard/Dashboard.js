import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  getAllLevels,
  getAllUserLevelsByID,
  addLevelsToUserAccount,
} from "../../actions/levelsActions";
import DashboardCard from "./DashboardCard";

// use getAllLevels Action Creator to get all levels and save to store
// use checkLevels Action Creator to get all user levels from user_levels table and save to store
// check if user has all sign lingo levels linked to them in the user_levels join table, IF NOT,
// add all reamining levels to the join table.
// Display levels via DashboardCard component, disabling all levels with timestamps
// === null in user_levels table (data we now have in store from checkLevels action creator)

const Dashboard = (props) => {
  const history = useHistory();

  useEffect(() => {
    props.getAllLevels();
    props.getAllUserLevelsByID();
    // console.log("levels length 1", props.levels.length)
    if (props.levels.length > props.userLevels.length) {
      {
        props.addLevelsToUserAccount(props.levels, props.userLevels);
      }
    } else if (props.levels.length < props.userLevels.length) {
      throw new Error("This should be unreachable");
    }
    // console.log("levels length 2", props.levels.length)
  }, [props.levels.length]);

  // first appraoch, get levels, then all levels for the user
  // doing those seperately rather then a join because it is more generalized that way because
  // you might have a user who doesn't have any level, or some site admin could have added levels
  // so for every login that's more elegant because the seperateness makes it clear, we could
  // need to do it OR NOT.
  // props.levels.length - props.userLevels.length style standpoint, check all the differetn cases
  // if props.levels.length is greater then user lenght, then do something
  // else if levels.lenght is less then users length, log warning something is wrong! etc.
  //

  return (
    <div>
      {props.isLoading ? (
        <>
          <p>Loading New Levels...</p>
        </>
      ) : (
        props.levels.map((level) => (
          <DashboardCard key={level.id} level={level} />
        ))
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    isLoading: state.authReducer.isLoading,
    levels: state.levelsReducer.levels,
    userLevels: state.levelsReducer.userLevels,
  };
}

const mapDispatchToProps = {
  getAllLevels,
  getAllUserLevelsByID,
  addLevelsToUserAccount,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
