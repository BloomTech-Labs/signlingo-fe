import React from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
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
      {value === index && <Box p={2}>{children}</Box>}
    </Typography>
  );
}
const styles = theme => ({
  indicator: {
    backgroundColor: 'white',
  },
})
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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // backgroundColor: theme.palette.background.paper,
    color: '#333333',
    
  },
}));

const Account = () => {
  const { path, url } = useRouteMatch();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <h1>Account</h1>
      <AppBar position="static" style= {{background: 'white', color: 'black', boxShadow: 'none'}}>
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
          TabIndicatorProps={{style: {background:'#F6BF00'}}}
          
        >
          <LinkTab label="Sign up" href="/signup" style= {{textTransform: 'none'}} {...a11yProps(1)} />
          <LinkTab label="Login" href="/login" style= {{textTransform: 'none'}} {...a11yProps(0)} />
          
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Signup />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Login />
      </TabPanel>
    </div>
  );
  // return (
  //   <div>
  //     <nav>
  //       <Link to={`${url}/login`}>Login</Link>
  //       <Link to={`${url}/signup`}>Sign Up</Link>
  //     </nav>
  //     <Route path={`/login`}>
  //       <Login />
  //     </Route>
  //     <Route path={`${path}/signup`}>
  //       <Signup />
  //     </Route>
  //   </div>
  // );
};

export default Account;
