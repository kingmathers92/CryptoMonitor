import React, { useState } from "react";
import {
  AiFillLock,
  AiOutlineMail,
  AiFillEyeInvisible,
  AiFillEye,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import Error from "../components/Error";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { signUp, checkEmailExists } = UserAuth();

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const isValidEmail = (email) => {
    return emailRegex.test(email);
  };

  const toggle = () => {
    setOpen(!open);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!isValidEmail(email)) {
      setError("Invalid email address");
      return;
    }
    if (password.length === 0) {
      setError("Password is empty.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    try {
      await signUp(email, password);
      navigate("/account");
    } catch (e) {
      setError(e.message);
      const emailExists = await checkEmailExists(email);
      if (emailExists) {
        setError("This email is already registered.");
      }
    }
  };

  return (
    <div>
      <div className="max-w-[400px] mx-auto min-h-[600px] px-4 py-20">
        <h1 className="text-2xl font-bold">Sign Up</h1>
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
          <button className="w-full my-2 p-3 bg-button cursor-pointer text-btnText rounded-2xl shadow-xl">
            Sign up
          </button>
        </form>
        <p className="my-4">
          Already have an account?{" "}
          <Link to="/signin" className="text-accent">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
