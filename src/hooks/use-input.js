import { useState } from "react";

const useInput = (inputValidationLogic) => {
  const [inputValue, setInputValue] = useState("");
  const [inputIsTouched, setInputIsTouched] = useState(false);

  const inputValueIsValid = inputValidationLogic(inputValue);
  const inputHasError = !inputValueIsValid && inputIsTouched;

  const inputValueChangeHandler = (event) => {
    setInputValue(event.target.value);
  };

  const inputBlurHandler = (event) => {
    setInputIsTouched(true);
  };

  const resetInputValue = () => {
    setInputValue("");
    setInputIsTouched(false);
  };

  return {
    value: inputValue,
    IsValid: inputValueIsValid,
    hasError: inputHasError,
    changeHandler: inputValueChangeHandler,
    blurHandler: inputBlurHandler,
    reset: resetInputValue,
  };
};

export default useInput;
