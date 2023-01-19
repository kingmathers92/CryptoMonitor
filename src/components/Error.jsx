import React, { useEffect } from "react";

const Error = ({ error, setError }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      setError("");
    }, 3000);
    return () => clearTimeout(timeout);
  }, [error, setError]);

  return <div className="bg-red-500 p-3 my-2">{error}</div>;
};

export default Error;
