import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./Styles/Auth.css";

import Navbar from "./Components/Layout/Navbar";
import Home from "./Screens/Home";
import Auth from "./Screens/Auth";
import Profile from "./Screens/User/Profile";

import { useDispatch, useSelector } from "react-redux";
import { LoadUser } from "./Redux/Slices/Auth/actions";
import ProtectedRoutes from "./Screens/Utils/ProtectedRoutes";
import MyReminders from "./Screens/User/MyReminders";
import CreateReminder from "./Screens/User/CreateReminder";
import ReminderInfo from "./Screens/User/ReminderInfo";

const App = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const isAuthenticated = user?.success;
  const isAdmin = user?.user?.role === "admin" ? true : false;

  useEffect(() => {
    dispatch(LoadUser());
  }, []);

  console.log({ isAdmin, isAuthenticated });

  return (
    <div className="flex flex-col justify-start items-center w-full min-h-screen">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />

        {/* user routes */}
        <Route
          element={
            <ProtectedRoutes
              isAuthenticated={isAuthenticated}
              isAdmin={isAdmin}
              isAdminRoute={false}
            />
          }
        >
          <Route path="/account" element={<Profile />} />
          <Route path="/account/reminders" element={<MyReminders />} />
          <Route path="/account/reminders/:id" element={<ReminderInfo />} />
          <Route
            path="/account/create_reminders"
            element={<CreateReminder />}
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
