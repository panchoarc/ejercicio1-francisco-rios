import React from "react";

const Input = ({ inputValue, onChangeInputValue }) => {
  const handleChange = (e) => {
    e.preventDefault();
    onChangeInputValue(e.target.value);
  };

  return (
    <>
      <input onChange={(e) => handleChange(e)} value={inputValue} />
    </>
  );
};

export default Input;
