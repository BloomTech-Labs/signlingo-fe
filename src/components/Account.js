import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";

import Signup from "./Signup";
import Login from "./Login";

import BackArrow from "../images/icons/back_icon_sm.png";

import PropTypes from "prop-types";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={0}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

//styling for the underline bar for tab
const StyledTabs = withStyles((theme) => ({
  indicator: {
    background: "#F6BF00",
  },
}))(Tabs);
//styling for tab panel link tab and app bar
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    color: "#333333",
    padding: "5% 3%",
  },
  tabPanel: {
    padding: 0,
  },
  linkTab: {
    textTransform: "none",
    fontFamily: "Inter, sans-serif",
    fontSize: "1.4rem",
  },
  appBar: {
    background: "white",
    color: "black",
    boxShadow: "none",
    fontFamily: "Inter, sans-serif",
  },
}));

const Account = (props) => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const [value, setValue] = useState(props.value);

  const handleChange = (event, value) => {
    // checks value and pushes url to tab without rerendering
    if (value === 0) {
      history.push("/account/signup");
    } else if (value === 1) {
      history.push("/account/login");
    }
  };

  //sets value for which tab is click based on pathname
  useEffect(() => {
    if (location.pathname === "/account/signup") {
      setValue(0);
    } else {
      setValue(1);
    }
  }, [location.pathname]);//dependency array makes useEffect run when pathname is changed

  return (
    <div className={classes.root}>
      <div className="accountBar">
        <Link to="/">
          <img
            data-testid="backLandingPage"
            src={BackArrow}
            alt="Arrow pointing left"
          />
        </Link>
        <h1>Account</h1>
      </div>
      <AppBar position="static" className={classes.appBar}>
        <StyledTabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab
            data-testid="accountSignupTab"
            label="Sign up"
            to="/account/signup"
            className={classes.linkTab}
            {...a11yProps(0)}
          />
          <LinkTab
            data-testid="accountLoginTab"
            label="Login"
            to="/account/login"
            className={classes.linkTab}
            {...a11yProps(1)}
          />
        </StyledTabs>
      </AppBar>
      <TabPanel className={classes.tabPanel} value={value} index={0}>
        <Signup />
      </TabPanel>
      <TabPanel className={classes.tabPanel} value={value} index={1}>
        <Login />
      </TabPanel>
    </div>
  );
};

export default Account;
