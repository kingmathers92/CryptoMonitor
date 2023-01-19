import React from "react";
import SavedCoin from "../components/SavedCoin";
import { UserAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const Account = () => {
  const { user } = UserAuth();
  let username = user?.email.substring(0, user?.email.indexOf("@"));
  //console.log(username);

  if (user) {
    return (
      <div className="max-w-[1140px] mx-auto">
        <div className="flex justify-between items-center my-12 py-8 rounded-div">
          <div>
            <h1 className="text-2xl font-bold">Account</h1>
            <div>
              <p>Welcome, {username}</p>
            </div>
          </div>
        </div>
        <div className="flex justfiy-between items-center my-12 py-8 rounded-div">
          <div className="w-full min-h-[300px]">
            <h1 className="text-2xl font-bold py-4">Watch List</h1>
            <SavedCoin />
          </div>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/login" />;
  }
};

export default Account;
