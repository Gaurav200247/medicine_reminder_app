import { TextField } from "@mui/material";
import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

const AuthInput = ({ name, type }) => {
  const { control } = useFormContext();

  const [isTypePassword, setIsTypePassword] = useState(true);

  if (type === "password") {
    return (
      <div className="auth_input">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <TextField
              variant="standard"
              label={`Enter ${name}`}
              color="secondary"
              type={isTypePassword ? "password" : "text"}
              {...field}
            />
          )}
        />

        <button
          type="button"
          onClick={() => setIsTypePassword(!isTypePassword)}
          className="flex justify-center items-center"
        >
          {isTypePassword ? <AiFillEyeInvisible /> : <AiFillEye />}
        </button>
      </div>
    );
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          variant="standard"
          label={`Enter ${name}`}
          color="secondary"
          type={type}
          {...field}
        />
      )}
    />
  );
};

export default AuthInput;
