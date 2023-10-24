import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetUserSingleReminderQuery } from "../../Redux/APIs/RemindersAPI";

const ReminderInfo = () => {
  const { id } = useParams();

  const { isLoading, data } = useGetUserSingleReminderQuery(id);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  let ReminderData = data?.reminder;

  return (
    <div className="flex flex-col justify-start items-start w-full p-10">
      <h1 className="text-[1.5rem] font-bold mb-5  underline">Reminder Info</h1>
      <div className="flex flex-col justify-between items-start w-full">
        <h1>Title : {ReminderData?.title}</h1>

        <p>Description : {ReminderData?.description}</p>
        <p>Timings : {ReminderData?.TimerLife}</p>

        <h1 className="text-[1.5rem] font-bold mt-5 underline">Medicines :</h1>

        {ReminderData?.meds.length > 0 ? (
          ReminderData.meds.map((item, index) => {
            return (
              <li key={index} className="border-b-2 my-5 list-none pb-5">
                <h1>Medicine Name : {item.med_name}</h1>
                <p>Medicine Description : {item.med_desc}</p>
                <p>Dosage : {item.dosage}</p>
                <p>Medicine Prescription : {item.med_prescription}</p>
              </li>
            );
          })
        ) : (
          <h1 className="font-bold text-center w-full">
            No Medicines were Added !!
          </h1>
        )}
      </div>
    </div>
  );
};

export default ReminderInfo;
