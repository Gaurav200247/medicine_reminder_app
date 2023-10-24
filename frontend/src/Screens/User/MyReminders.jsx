import React from "react";
import { BiPlusCircle } from "react-icons/bi";
import SingleReminder from "../../Components/SingleReminder";
import { useGetUserRemindersQuery } from "../../Redux/APIs/RemindersAPI";
import { Link } from "react-router-dom";

const MyReminders = () => {
  const { isLoading, error, data, refetch } = useGetUserRemindersQuery();
  const reminders = data?.reminders;

  if (error) {
    alert(error.data);
  }

  return (
    <div className="flex flex-col justify-start items-start w-full min-h-screen bg-gray-100">
      {/* create reminder button */}
      <Link
        to="/account/create_reminders"
        className="p-5 bg-white w-[20rem] m-5 min-h-[10rem] rounded-lg duration-200 shadow-md hover:shadow-lg flex flex-col justify-center items-center cursor-pointer text-[1rem]"
      >
        <BiPlusCircle className="text-[2rem]" />
        <h1 className="mt-3">Create Reminder</h1>
      </Link>

      {/* all reminders */}
      {isLoading ? (
        <h1>Please wait, loading reminders....</h1>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 w-full border-t-2 p-5">
          {reminders?.length > 0 ? (
            reminders.map((item, index) => {
              return <SingleReminder {...item} key={index} refetch={refetch} />;
            })
          ) : (
            <h1>Reminder List is Empty !!</h1>
          )}
        </div>
      )}
    </div>
  );
};

export default MyReminders;
