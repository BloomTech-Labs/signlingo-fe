import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import cuid from "cuid";
import DashboardCard from "./DashboardCard";

const Dashboard = (props) => {
  const history = useHistory();

  return (
    <div>
      dashboard
    </div>
  );
};

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
