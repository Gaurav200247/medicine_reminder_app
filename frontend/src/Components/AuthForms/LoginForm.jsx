import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import AuthInput from "./AuthInput";
import { login } from "../../Redux/Slices/Auth/actions";
import { useDispatch } from "react-redux";

const LoginForm = () => {
  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { handleSubmit } = methods;

  const dispatch = useDispatch();

  const HandleLogin = (data) => {
    dispatch(login(data));
  };

  return (
    <FormProvider {...methods}>
      <form className="auth_form" onSubmit={handleSubmit(HandleLogin)}>
        <h1 className="w-full text-center underline">Welcome Back !!</h1>

        <AuthInput name="email" type="email" />

        <AuthInput name="password" type="password" />

        <button type="submit" className="auth_form_submit_btn">
          Log In
        </button>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
