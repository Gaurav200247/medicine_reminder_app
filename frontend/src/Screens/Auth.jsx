import React, { useEffect, useState } from "react";
import LoginForm from "../Components/AuthForms/LoginForm";
import RegisterForm from "../Components/AuthForms/RegisterForm";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [IsLoginSelector, setIsLoginSelector] = useState(false);
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.success) {
      navigate("/account");
    }
  }, [user]);

  return (
    <div className="auth_container">
      {/* auth block */}
      <div className="auth_block">
        {/* auth selector container */}
        <div className="auth_block_selector">
          <button
            onClick={() => setIsLoginSelector(true)}
            className={`${IsLoginSelector && "active_auth_btn"}`}
          >
            Login
          </button>

          <button
            onClick={() => setIsLoginSelector(false)}
            className={`${!IsLoginSelector && "active_auth_btn"}`}
          >
            Register
          </button>
        </div>

        {/* forms */}
        {IsLoginSelector ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
};

export default Auth;
