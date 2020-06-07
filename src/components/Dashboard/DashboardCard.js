import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

const DashboardCard = (props) => {
  const history = useHistory();
  const purl = process.env.PUBLIC_URL;

  return (
    <>
      <p>dashboard card</p>
      <p>{props.level.name}</p>
    </>
  );
};

const mapDispatchToProps = {};

export default connect(null, mapDispatchToProps)(DashboardCard);
