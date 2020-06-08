import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getAllLevels,
  getAllUserLevelsByID,
  addLevelsToUserAccount,
} from "../../actions/levelsActions";
import DashboardCard from "./DashboardCard";

const Dashboard = (props) => {

  console.log("RENDERED DASHBOARD");
  console.log("outside useEffect level:", props.levels.length);
  console.log("outside useEffect userlevel:", props.userLevels.length);

  useEffect(() => {
    props.getAllLevels()
    props.getAllUserLevelsByID();
    console.log("inside useEffect level:", props.levels.length);
    console.log("inside useEffect userlevel:", props.userLevels.length);
    if (props.levels.length > props.userLevels.length) {
      console.log("inside useEffect Conditional where addLevelsToUserAccount Should run")
      props.addLevelsToUserAccount(props.levels, props.userLevels);
    } else if (props.levels.length < props.userLevels.length) {
      throw new Error("This should be unreachable");
    }
  
  }, []);

  return (
    <div>
      hello
      {/* {props.isLoading ? (
        <>
          <p>{props.loadingMessage}</p>
        </>
      ) : (
        props.levels.map((level) => (
          <DashboardCard key={level.id} level={level} />
        ))
      )} */}
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
