import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory, } from "react-router-dom";

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
      // onClick={(event) => {
      //   event.preventDefault();
      // }}
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
const StyledTabs = withStyles((theme) => ({
  indicator: {
    background: "#F6BF00",
  },
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
  const [value, setValue] = useState(props.value || 0 );

  const handleChange = (event, value) => {
    //
    //setValue(newValue);
    if (value === 0) {history.push('/account/signup')}
    if(value === 1) {history.push('/account/login')}
  };

  //sets value for which tab is click on from landing page
  useEffect(() => {
    // console.log("location", location);

    if(location.pathname == '/account/signup') {
      setValue(0)
    } else {
      setValue(1)
    }
    // if (location.state) {
    //   setValue(location.state.value);
    // } else {
    //   setValue(0);
    // }
  }, [location.pathname]);

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
            // href="/account/signup"
            to="/account/signup"
            className={classes.linkTab}
            {...a11yProps(0)}
          />
          <LinkTab
            data-testid="accountLoginTab"
            label="Login"
            // href="/account/login"
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

      {/* <Switch>        
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />

      </Switch> */}
    </div>
  );
};

export default Account;
