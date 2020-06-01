import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import cuid from "cuid";
import { dashLevel } from "../actions/dashboardLevel";
import { resetArray } from "../actions/resetArray";
import DashboardCard from "./DashboardCard";
// import { getAllLevels, addLevels } from "../actions/levelsActions";

// const Dashboard = (props) => {

//   const history = useHistory();
//   const [levels, setLevels] = useState([
//     {
//       title: "Alphabet - Level 1",
//       signs: "A - E",
//     },
//     {
//       title: "Alphabet - Level 2",
//       signs: "F - J",
//     },
//     {
//       title: "Alphabet - Level 3",
//       signs: "K - O",
//     },
//     {
//       title: "Alphabet - Level 4",
//       signs: "P - T",
//     },
//     {
//       title: "Alphabet - Level 5",
//       signs: "U - Z",
//     },
//   ]);

//   function logout() {
//     resetArray();
//     window.localStorage.removeItem("token");
//     return history.push("/");
//   }

//   useEffect(() => {
//     // if logged in user already has levels associated 
//     // with them, then display those. 
//     // otherwise, run the following post request loop
//     if ()
//     levels.forEach(level => {
//       addLevels(level);
//     })
//   }, []);

//   return (
//     <div>
//       <div className="logoutDiv">
//         <p onClick={logout}>Log out</p>
//       </div>
//       {levels.map((eachLevel) => (
//         <>
//           <DashboardCard key={cuid()} level={eachLevel} />
//           {console.log("each item in dashboard", eachLevel)}
//         </>
//       ))}
//     </div>
//   );
// };

// function mapStateToProps(state) {
//   return {
//   };
// }

// export default connect(mapStateToProps, {getAllLevels, addLevels})(Dashboard);

const Dashboard = ({ resetArray, dashLevel, userId, globalLevel }, props) => {
  const history = useHistory();

  function logout() {
    // state was holding the information from previous logins for levels and selectedLessons
    // so using resetArray to empty before logout
    resetArray();
    window.localStorage.removeItem("token");
    return history.push("/");
  }

  // These action calls call the back end level endpoints in the order we want them back. It is not DRY.
  // There is an async / await here and in the dashLevel action to ensure that stack waits for each
  // promise to return before moving on to next. The DRY option would be to create an
  // ALL LEVELS ENDPOINT ON THE BACKEND.

  const fetchLevels = async () => {
    await dashLevel(userId, 1);
    await dashLevel(userId, 2);
    await dashLevel(userId, 3);
    await dashLevel(userId, 4);
    dashLevel(userId, 5);
  };

  useEffect(() => {
    // reset Array is used to reset the data stored in signImages and selectedLesson and levels back to empty
    // this allows for a fresh start everytime a user reaches the dashboard
    // there is probably a better way to make this work.
    resetArray();
    fetchLevels();
    // check to see if the user id exists in the database
    // if they do, then do not post / create new levels,
    // instead grab the levels already created, associated
  }, []);

  return (
    <div>
      <div className="logoutDiv">
        <p onClick={logout}>Log out</p>
      </div>

      {globalLevel.map((each) => (
        <>
        <DashboardCard key={cuid()} data={each} />
        {console.log("each item in dashboard", each)}
        </>
      ))}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    userId: state.user.id,
    globalLevel: state.dashLevel.levels,
  };
}

export default connect(mapStateToProps, {
  dashLevel,
  resetArray,
})(Dashboard);
