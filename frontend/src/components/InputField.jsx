import React from 'react';

const InputField = ({ type, placeholder, value, onChange }) => {
  return (
    <div className="mb-3 w-full min-h-full border-white ">
      <input
        type={type}
        className="w-full min-h-full p-3 border border-gray-300 rounded-md"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
