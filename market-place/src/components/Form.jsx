import React from 'react';

const Form = ({ onSubmit, children }) => {
  return (
    <form className="p-4 mx-auto max-w-[400]  flex flex-col justify-around gap-3"onSubmit={onSubmit} >
      {children}
    </form>
  );
};

export default Form;
