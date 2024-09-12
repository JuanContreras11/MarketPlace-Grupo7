import React from 'react';
import "../App.css";
import HomePage from "../components/HomePage";



const LandingPage = () => {
  return (
    <div className="landing w-full h-[100%] flex justify-around items-center">
      <div className=" w-[40%] h-full flex flex-col gap-52  -mt-80 ">
        <div className="rounded-3xl w-[20%] h-[30%]   p-8  ">
          <img src="/logo.png" alt="logo" className="max-w-sm h-auto -ml-20" />
        </div>
        <div className="w-[100%] h-[30%] ">
          <h1 className='font-poppins font-black italic text-6xl text-shadow-white'>BIENVENIDO</h1>
          <p className='font-poppins font-medium italic my-4 mx-4 text-shadow-white'>AL MARKETPLACE</p>
        </div>
      </div> 
      <div className="rounded-3xl w-[40%] max-w-[500px] h-[80%]  bg-gray-700 p-8 shadow-lg flex flex-col ">   
      <HomePage/>     
      </div>
    </div>
  );
};

export default LandingPage;

