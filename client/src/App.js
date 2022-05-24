import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Recommendations from "./components/Recommendations";
import Universities from "./components/Universities";
import PrivateRoute from "./helpers/PrivateRoute";
import { updateProfile } from "./redux/profileSlice";
import logo from "./assets/logo.png";

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
    <div className="bg-teal-50 min-h-screen px-10">
      <div className="flex items-center justify-center">
        <img src={logo} width={40} height={40} alt="" />
        <h1 className="text-3xl font-bold p-4">
          GradHelp{" "}
          <span className="block sm:inline text-sm">
            Helping you find your dream university
          </span>
        </h1>
      </div>
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
