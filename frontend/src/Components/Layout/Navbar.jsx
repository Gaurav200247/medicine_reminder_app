import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex justify-around items-center w-full shadow-md p-5 bg-sky-300  ">
      <Link to="/" className="font-bold text-[1.3rem]">
        Medicine Reminder App
      </Link>

      <div className="flex justify-around items-center w-[60%] lg:w-[40%]">
        {/* home */}
        <Link className="underline hover:text-blue-600 duration-200" to="/">
          Home
        </Link>{" "}
        {/* my reminders */}
        {user?.success === true && (
          <Link
            className="underline hover:text-blue-600 duration-200"
            to="/account/reminders"
          >
            My Reminders
          </Link>
        )}
        {/* login/register + profile */}
        {user?.success === true ? (
          <Link
            className="underline hover:text-blue-600 duration-200"
            to="/account"
          >
            {user?.data?.username || "My Account"}
          </Link>
        ) : (
          <Link
            className="underline hover:text-blue-600 duration-200"
            to="/auth"
          >
            Login/Register
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
