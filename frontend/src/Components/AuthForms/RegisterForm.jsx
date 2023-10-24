import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import AuthInput from "./AuthInput";
import { register } from "../../Redux/Slices/Auth/actions";
import { useDispatch } from "react-redux";

const RegisterForm = () => {
  const defaultValues = {
    username: "",
    email: "",
    password: "",
  };

  const methods = useForm({ defaultValues });

  const { handleSubmit } = methods;

  const dispatch = useDispatch();

  const HandleRegister = (data) => {
    console.log(data);

    dispatch(register(data));
  };

  return (
    <FormProvider {...methods}>
      <form className="auth_form" onSubmit={handleSubmit(HandleRegister)}>
        <h1 className="w-full text-center underline mb-2">
          Create a New Account
        </h1>

        <AuthInput name="username" type="text" />

        <AuthInput name="email" type="email" />

        <AuthInput name="password" type="password" />

        <button type="submit" className="auth_form_submit_btn">
          Create Account
        </button>
      </form>
    </FormProvider>
  );
};

export default RegisterForm;
