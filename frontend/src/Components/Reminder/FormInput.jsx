import { TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const FormInput = ({ name, type }) => {
  const { control } = useFormContext();

  if (type === "textarea") {
    return (
      <div className="w-full flex flex-col justify-start items-start my-5">
        <textarea
          className="m-0 w-full bg-transparent border-[1px] border-gray-500 placeholder:text-gray-500"
          {...control.register(name)}
          cols="20"
          rows="5"
          placeholder={`Enter ${name}`}
        ></textarea>
      </div>
    );
  }

  if (type === "number") {
    return (
      <div className="w-full my-3">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <TextField
              className="w-full"
              variant="outlined"
              label={`Enter ${
                name.startsWith("timing") ? name.substring(7) : name
              }`}
              color="secondary"
              type={type}
              {...field}
            />
          )}
        />
      </div>
    );
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          className="w-full"
          variant="outlined"
          label={`Enter ${
            name.startsWith("timing") ? name.substring(7) : name
          }`}
          color="secondary"
          type={type}
          {...field}
        />
      )}
    />
  );
};

export default FormInput;
