import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { getAllLevels, checkLevels, addLevelsToUserAccount } from "../../actions/levelsActions";
import cuid from "cuid";
import DashboardCard from "./DashboardCard";

// use getAllLevels Action Creator to get all levels and save to store
// use checkLevels Action Creator to get all user levels from user_levels table and save to store
// check if user has all sign lingo levels linked to them in the join table, IF NOT,
// add all levels to the join table. At least the ones they don't already have. Don't overwrite 
// old levels. Then display levels via dashboardcard component, disabling all levels with timestamps
// === null in user_levels table (data we now have in store from checkLevels action creator)

const Dashboard = (props) => {
  const history = useHistory();

  useEffect(() => {
    props.getAllLevels();
    props.checkLevels();
  }, []);

  return (
    <div>
      {props.userLevels.length < props.levels.length ? (
        <>
          {addLevelsToUserAccount}
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

const mapDispatchToProps = { getAllLevels, checkLevels, addLevelsToUserAccount };

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
