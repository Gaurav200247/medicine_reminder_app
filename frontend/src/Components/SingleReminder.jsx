import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { MdEditSquare } from "react-icons/md";
import { useDeleteUserReminderMutation } from "../Redux/APIs/RemindersAPI";
import { Link } from "react-router-dom";

const SingleReminder = ({ _id, title, description, meds, refetch }) => {
  const [deleteUserReminder, result] = useDeleteUserReminderMutation();

  const DeleteReminder = () => {
    deleteUserReminder(_id)
      .then(() => {
        alert("Reminder Deleted Successfully !!");
        refetch();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="p-5 bg-white w-full min-h-[8rem] rounded-lg duration-200 shadow-md hover:shadow-lg flex flex-col justify-start items-start cursor-pointer text-[1rem]">
      <h1 className="font-bold">{title}</h1>

      <p className="my-2 text-[0.8rem]">{description}</p>

      <p className="text-[0.9rem]">
        Total Medicines to be taken : {meds.length}{" "}
      </p>

      <div className="btns-container flex justify-between items-center w-full mt-5">
        <Link
          to={`/account/reminders/${_id}`}
          className="underline text-[0.9rem] text-blue-500 cursor-Linkointer "
        >
          More Info
        </Link>

        <div>
          <button className="text-[1.3rem] text-orange-400  mr-3">
            <MdEditSquare />
          </button>

          <button
            className="text-[1.3rem] text-red-600"
            onClick={DeleteReminder}
          >
            <AiOutlineDelete />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleReminder;
