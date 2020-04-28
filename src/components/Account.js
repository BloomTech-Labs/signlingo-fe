import React, { useState, useEffect } from "react";
import {
  useParams,
  Route,
  Link,
  useRouteMatch,
  useLocation,
} from "react-router-dom";
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
//removed inline styling for tabs and created a material ui style theme;
//what was copied and then i modified it below
// const StyledTabs = withStyles(theme => ({
//   indicator: {
//     background: "#F6BF00",
//   }
// }))(props => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);
const StyledTabs = withStyles(theme => ({
  indicator: {
    background: "#F6BF00",
  }
}))(Tabs);
//styling for tab panel linktab and appbar
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
    fontSize: "1.4rem"
  },
  appBar: {
    background: "white",
    color: "black",
    boxShadow: "none",
    fontFamily: "Inter, sans-serif",
  },
}));

const Account = () => {
  const { path, url } = useRouteMatch();
  const classes = useStyles();
  const location = useLocation();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //sets value for which tab is click on from landing page
  useEffect(() => {
    // console.log("location", location);
    if (location.state) {
      setValue(location.state.value);
    } else {
      setValue(0);
      console.log("value from landing page", location.state);
    }
  }, [location.state]);

  return (
    <div className={classes.root}>
      <div className="accountBar">
        <Link to="/" >
          <img src={BackArrow} alt="Arrow pointing left" />
        </Link>
        <h1>Account</h1>
      </div>
      <AppBar
        position="static"
        className={classes.appBar}
      >
        <StyledTabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab
            label="Sign up"
            href="/signup"
            className={classes.linkTab}
            {...a11yProps(1)}
          />
          <LinkTab
            label="Login"
            href="/login"
            className={classes.linkTab}
            {...a11yProps(0)}
          />
        </StyledTabs>
      </AppBar>
      <TabPanel
        className={classes.tabPanel}
        value={value}
        index={0}
      >
        <Signup />
      </TabPanel>
      <TabPanel
        className={classes.tabPanel}
        value={value}
        index={1}
      >
        <Login />
      </TabPanel>
    </div>
  );
};

export default Account;
