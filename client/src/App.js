import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Recommendations from "./components/Recommendations";
import Universities from "./components/Universities";
import PrivateRoute from "./helpers/PrivateRoute";
import { updateProfile } from "./redux/profileSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Get profile data from localstorage
    const localProfile = JSON.parse(localStorage.getItem("localProfile"));
    if (localProfile) {
      dispatch(updateProfile(localProfile));
    }
  }, [dispatch]);

  return (
    <div className="App">
      <h1>GradHelp</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route element={<PrivateRoute />}>
          <Route path="recommendations" element={<Recommendations />} />
          <Route path="universities" element={<Universities />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
