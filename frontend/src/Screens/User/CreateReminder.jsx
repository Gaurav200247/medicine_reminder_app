import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FormInput from "../../Components/Reminder/FormInput";
import { useCreateUserReminderMutation } from "../../Redux/APIs/RemindersAPI";
import { useNavigate } from "react-router-dom";

const CreateReminder = () => {
  const navigate = useNavigate();

  const [createUserReminder, { error, isLoading }] =
    useCreateUserReminderMutation();

  const [Meds, setMeds] = useState([]);

  const currentDate = new Date(Date.now());

  const defaultValues = {
    title: "",
    description: "",

    med_name: "",
    med_desc: "",
    dosage: "",
    med_prescription: "",

    timing: {
      day: currentDate.getDate(),
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear(),

      hours:
        currentDate.getHours() > 12
          ? currentDate.getHours() - 12
          : currentDate.getHours(),
      minutes: currentDate.getMinutes(),
      convention: "PM",
    },
  };
  const methods = useForm({
    defaultValues,
  });

  const { getValues, setValue, handleSubmit, reset } = methods;

  const AddMedicine = () => {
    const medicine = {
      med_name: getValues("med_name"),
      med_desc: getValues("med_desc"),
      dosage: getValues("dosage"),
      med_prescription: getValues("med_prescription"),
    };

    setMeds((prevMeds) => [...prevMeds, medicine]);

    console.log({ Meds, medicine });

    setValue("med_name", "");
    setValue("med_desc", "");
    setValue("dosage", "");
    setValue("med_prescription", "");
  };

  const AddReminderHandler = (data) => {
    // console.log({ data, Meds });

    const { title, description, timing } = data;

    // pass Meds as meds array to mutator
    const RequestBody = {
      title,
      description,
      timing,
      meds: Meds,
    };

    createUserReminder(RequestBody)
      .then(() => {
        alert("Reminder Created Successfully !!");
        setMeds([]);
        reset(defaultValues); // resets all input fields
        navigate("/account/reminders");
      })
      .catch((err) => alert(err?.message));
  };

  if (error) {
    alert(error);
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col justify-between items-center w-full p-10 pt-5 bg-purple-200"
        onSubmit={handleSubmit(AddReminderHandler)}
      >
        <h1 className="form_heading">Enter Reminder Details</h1>
        {/* Enter Reminder Details */}
        <div className="form_block w-full">
          <FormInput name="title" type="text" />
          <FormInput name="description" type="textarea" />

          <FormInput name="timing.day" type="number" />
          <FormInput name="timing.month" type="number" />
          <FormInput name="timing.year" type="number" />
          <FormInput name="timing.hours" type="number" />
          <FormInput name="timing.minutes" type="number" />
          <FormInput
            name="timing.convention"
            type="select"
            options={["AM", "PM"]}
          />
        </div>

        <h1 className="form_heading">Add Medicines</h1>
        {/* add medicines */}
        <div className="flex justify-between items-start w-full ">
          {/* medicine form */}
          <div className="form_block w-[48%]">
            <FormInput name="med_name" type="text" />
            <FormInput name="med_desc" type="textarea" />
            <FormInput name="dosage" type="text" />
            <FormInput name="med_prescription" type="textarea" />

            <div className="w-full flex justify-end items-center ">
              <button
                type="button"
                className="px-5 py-2 rounded-md bg-green-500 text-white shadow-md hover:shadow-lg duration-300"
                onClick={AddMedicine}
              >
                Add Medicine
              </button>
            </div>
          </div>

          {/* medicine preview */}
          <ul className="form_block w-[48%] h-full">
            {Meds.length > 0 ? (
              Meds.map((item, index) => {
                return (
                  <li key={index} className="border-b-2 my-5 list-none pb-5">
                    <h1>{item.med_name}</h1>
                    <p>{item.med_desc}</p>
                    <p>{item.dosage}</p>
                    <p>{item.med_prescription}</p>
                  </li>
                );
              })
            ) : (
              <h1 className="font-bold text-center w-full">
                Please Add Medicine to Preview
              </h1>
            )}
          </ul>
        </div>

        {/* form btns */}
        <div className="flex justify-end items-center w-full">
          <button
            className="form_submit_btn w-[15rem] mr-5 bg-white text-red-500"
            type="submit"
          >
            Reset Form
          </button>

          <button
            className="form_submit_btn w-[15rem]  bg-blue-500 hover:bg-blue-500 text-white"
            type="submit"
          >
            Create Reminder
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateReminder;
