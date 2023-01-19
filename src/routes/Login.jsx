import React, { useState } from "react";
import {
  AiOutlineMail,
  AiFillLock,
  AiFillEyeInvisible,
  AiFillEye,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { logIn, UserAuth } from "../context/AuthContext";
import Error from "../components/Error";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { logIn, checkEmailExists } = UserAuth();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await logIn.sendPasswordResetEmail(forgotPasswordEmail);
      setForgotPasswordMessage(
        "Password reset email sent. Please check your email."
      );
    } catch (e) {
      setForgotPasswordMessage(e.message);
    }
  };

  const toggle = () => {
    setOpen(!open);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/account");
    } catch (e) {
      setError(e.message);

      const emailExists = await checkEmailExists(email);
      if (!emailExists) {
        setError("This email is not registered.");
      } else {
        try {
          await logIn(email, password);
          navigate("/account");
        } catch (e) {
          setError(e.message);
          console.log(e.message);
        }
      }
    }
  };
  return (
    <div>
      <div className="max-w-[400px] mx-auto min-h-[600px] px-4 py-20">
        <h1 className="text-2xl font-bold">Sign In</h1>
        {error ? <Error error={error} setError={setError} /> : null}
        <form onSubmit={handleSubmit}>
          <div className="my-4">
            <label>Email</label>
            <div className="my-2 w-full relative rounded-2xl shadow-xl">
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 bg-primary border border-input rounded-2xl"
                type="email"
              />
              <AiOutlineMail className="absolute right-2 top-3 text-gray-400" />
            </div>
          </div>
          <div className="my-4">
            <label>Password</label>
            <div className="my-2 w-full relative rounded-2xl shadow-xl">
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 bg-primary border border-input rounded-2xl"
                type={open === false ? "password" : "text"}
              />
              <AiFillLock className="absolute right-2 top-3 text-gray-400" />
              <div
                title={open === false ? "Show Password" : "Hide Password"}
                className="text-xl absolute top-2.5 right-7 text-gray-400 cursor-pointer"
              >
                {open === false ? (
                  <AiFillEye onClick={toggle} />
                ) : (
                  <AiFillEyeInvisible onClick={toggle} />
                )}
              </div>
            </div>
          </div>
          <button className="w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl cursor-pointer">
            Sign in
          </button>
        </form>
        <p className="my-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-accent cursor-pointer">
            Sign up
          </Link>
        </p>
        <div className="pt-0">
          {showForgotPassword ? (
            <form onSubmit={handleForgotPassword}>
              <label>Email</label>
              <input
                onChange={(e) => setForgotPasswordEmail(e.target.value)}
                type="email"
              />
              <button type="submit">Submit</button>
              {forgotPasswordMessage && <p>{forgotPasswordMessage}</p>}
            </form>
          ) : (
            <button onClick={() => setShowForgotPassword(true)}>
              Forgot Password?
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
