import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { getAllLevels, checkLevels } from "../../actions/levelsActions";
import cuid from "cuid";
import DashboardCard from "./DashboardCard";

// after a user logs in, I need to get the all levels
// check what levels the user already has,
// if the user has none, or is missing some new levels added to the levels table
// then the user will need to have them added to the join table!
// either way, after that conditonal occurs, retrieve all user/levels and levels
// route to dashboard
// display all levels, and enable/disable according to completed status

const Dashboard = (props) => {
  const history = useHistory();

  useEffect(() => {
    props.getAllLevels();
    props.checkLevels();
  }, []);

  return (
    <div>
      {props.levels.map((level) => (
        <DashboardCard levelName={level.name} />
      ))}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    levels: state.levelsReducer.levels,
  };
}

const mapDispatchToProps = { getAllLevels, checkLevels };

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
