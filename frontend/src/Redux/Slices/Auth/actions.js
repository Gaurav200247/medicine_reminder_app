// contains all redux async thunks middlewares

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ------------------------- register -------------------------
export const register = createAsyncThunk(
  "/auth/register",
  async (args, { rejectWithValue }) => {
    console.log({ args });
    const { username, email, password } = args;

    const userData = {
      username,
      email,
      password,
    };

    if (!username && !email && !password) {
      return rejectWithValue("please provide correct fields values");
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios
        .post(`/api/v1/register`, userData, config)
        .catch((err) => console.log(err.response.data));

      console.log({ data });

      if (data.success === true) {
        return data;
      } else {
        return rejectWithValue("Something Went Wrong !!");
      }
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error?.message);
    }
  }
);

// -------------------------Log in-------------------------
export const login = createAsyncThunk(
  "/auth/login",
  async (args, { rejectWithValue }) => {
    console.log({ args });
    const { email, password } = args;

    const userData = {
      email,
      password,
    };

    if (!email && !password) {
      return rejectWithValue("please provide correct fields values");
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios
        .post(`/api/v1/login`, userData, config)
        .catch((err) => console.log({ err }));

      console.log({ data });

      if (data.success === true) {
        return data;
      } else {
        return rejectWithValue("Something Went Wrong !!");
      }
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error?.message);
    }
  }
);

// -------------------------load User-------------------------
export const LoadUser = createAsyncThunk(
  "/auth/load_user",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios
        .get(`/api/v1/me`)
        .catch((err) => console.log({ err }));

      console.log({ data });

      if (data.success === true) {
        return data;
      } else {
        return rejectWithValue("Something Went Wrong !!");
      }
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error?.message);
    }
  }
);

// -------------------------log out-------------------------
export const LogOut = createAsyncThunk(
  "/auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios
        .get(`/api/v1/logout`)
        .catch((err) => console.log({ err }));

      console.log({ data });

      if (data.success === true) {
        return data;
      } else {
        return rejectWithValue("Something Went Wrong !!");
      }
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error?.message);
    }
  }
);
