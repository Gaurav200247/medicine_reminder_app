import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen w-full relative flex justify-center items-start">
      <div className="mt-28 w-1/2 z-10 flex flex-col justify-center items-center bg-[#cff4ffce] p-10 shadow-md rounded-lg ">
        <h1 className="text-[2rem]  text-center">
          Welcome to <br />
          <span className="text-red-700 text-[2.5rem] font-semibold underline">
            Medicine <span className="text-blue-600">Reminder</span> App
          </span>
        </h1>

        <p className="text-[1.2rem] mt-5 font-bold">
          "An simple App for Medicine Taking Reminders"
        </p>

        <Link
          to="/auth"
          className="mt-5 text-center py-2 w-[20rem] bg-blue-500 text-white shadow-md rounded-md hover:text-red-500
        duration-200 hover:bg-white font-medium overflow-hidden text-[1.3rem]"
        >
          Get Started
        </Link>
      </div>

      <div className="w-full h-full absolute top-0 bottom-0 left-0 right-0">
        <img
          src="/assets/bg.jpg"
          alt="bg"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Home;
