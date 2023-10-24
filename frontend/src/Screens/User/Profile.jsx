import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LogOut } from "../../Redux/Slices/Auth/actions";

const Profile = () => {
  const dispatch = useDispatch();
  const { loading, user } = useSelector((state) => state.auth);

  const userData = user?.user;

  const HandleLogOut = () => {
    dispatch(LogOut());
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-start  bg-purple-200">
      <div className="flex flex-col justify-between items-start p-10 mt-20  rounded-md bg-white shadow-md hover:shadow-lg duration-300 w-[30rem]">
        <h1 className="text-[1.8rem] underline">
          Welcome {userData?.username} !!
        </h1>
        <h2 className="mt-5 text-[1.2rem]">Your Detatils</h2>
        <p className="mt-2">
          Email :{" "}
          <span className="text-blue-600 underline">{userData?.email}</span>
        </p>
        <p className="mt-2">
          Phone No. :{" "}
          <span className="text-blue-600 underline">
            {userData?.contact_details?.phone_no}
          </span>
        </p>

        <Link
          to="/account/reminders"
          className="underline mt-5 text-purple-500"
        >
          Check Out Your Reminders
        </Link>

        <button className="submit_btn" onClick={HandleLogOut}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
