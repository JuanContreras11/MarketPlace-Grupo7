import React from 'react';

const InputField = ({ type, placeholder, value, onChange }) => {
  return (
    <div className="mb-3 ">
      <input
        type={type}
        className="form-control"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
