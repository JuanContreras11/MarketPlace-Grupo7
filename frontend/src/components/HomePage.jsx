import React, { useState } from "react";
import Register from "./Register";
import Login from "./Login";

const HomePage = () => {
  const [formType, setFormType] = useState("login");

  const handleShowForm = (formType) => {
    setFormType(formType);
  };

  return (
    <div className="container h-[90%] mt-4 flex flex-col justify-center">
      <div class="inline-flex justify-center">
        <button
          className="w-1/2 bg-gray-400 hover:bg-gray-300 text-gray-800  py-2 px-4 rounded-l border-r-2 border-black"
          onClick={() => handleShowForm("register")}
        >
          Register
        </button>
        <button
          className="w-1/2 bg-gray-400 hover:bg-gray-300 text-gray-800  py-2 px-4 rounded-r"
          onClick={() => handleShowForm("login")}
        >
          Login
        </button>
      </div>
      <div className="mt-4 ">
        {formType === "register" && <Register />}
        {formType === "login" && <Login />}
      </div>
    </div>
  );
};

export default HomePage;
