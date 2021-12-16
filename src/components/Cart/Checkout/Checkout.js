import React, { useState } from "react";
import useInput from "../../../hooks/use-input";
import classes from "./Checkout.module.css";

const checkEmpty = (value) => value.trim() === "";

const validateEmail = (emailAddress) => {
  if (!checkEmpty(emailAddress)) {
    const validDomains = /@gmail|@yahoo|@vodafone\.com$/;
    // /@gmail|@yahoo|@vodafone|@hotmail\.com$/
    let validOrNot = String(emailAddress)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    if (validOrNot) {
      if (validDomains.test(emailAddress)) {
        return { valid: true, errorMessage: "" };
      }
      return { valid: false, errorMessage: "Please enter valid domain!" };
    }
    return { valid: false, errorMessage: "Please enter valid email!" };
  }
  return { valid: false, errorMessage: "Email is required!" };
};

const Checkout = (props) => {
  //#region Name Input Logic
  //#region Using useState() hook
  // const [name, setName] = useState("");
  // const [nameIsTouched, setNameIsTouched] = useState(false);
  // const nameInValid = checkEmpty(name) && nameIsTouched;

  // const nameChangeHandler = (event) => {
  //   setName(event.target.value);
  // };

  // const nameBlurHandler = (event) => {
  //   setNameIsTouched(true);
  // };
  //#endregion

  //#region Using Custom Hook useInput() hook
  const {
    value: name,
    hasError: nameHasError,
    changeHandler: nameChangeHandler,
    blurHandler: nameBlurHandler,
    IsValid: nameIsValid,
    reset: resetName,
  } = useInput((name) => !checkEmpty(name));
  //#endregion

  const nameClasses = nameHasError
    ? classes.control + " " + classes.invalid
    : classes.control;

  //#endregion

  //#region Email Input Logic

  //#region Using useState() hook
  // const [email, setEmail] = useState("");
  // const [emailIsTouched, setEmailIsTouched] = useState(false);
  // let checkEmailValidity = validateEmail(email);
  // const emailInValid = !checkEmailValidity.valid && emailIsTouched;

  // const emailChangeHandler = (event) => {
  //   setEmail(event.target.value);
  // };

  // const emailBlurHandler = (event) => {
  //   setEmailIsTouched(true);
  // };
  //#endregion
  //#region Using Custom Hook useInput() hook
  let checkEmailValidity = { valid: false, errorMessage: "" };
  const {
    value: email,
    hasError: emailHasError,
    IsValid: emailIsValid,
    reset: resetEmail,
    changeHandler: emailChangeHandler,
    blurHandler: emailBlurHandler,
  } = useInput((email) => {
    if (!checkEmpty(email)) {
      const validDomains = /@gmail|@yahoo|@vodafone\.com$/;
      // /@gmail|@yahoo|@vodafone|@hotmail\.com$/
      let validOrNot = String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
      if (validOrNot) {
        if (validDomains.test(email)) {
          checkEmailValidity = { valid: true, errorMessage: "" };
          return true;
        }
        checkEmailValidity = {
          valid: false,
          errorMessage: "Please enter valid domain!",
        };
        return false;
      }
      checkEmailValidity = {
        valid: false,
        errorMessage: "Please enter valid email!",
      };
      return false;
    }
    checkEmailValidity = { valid: false, errorMessage: "Email is required!" };
    return false;
  });
  //#endregion
  const emailClasses = emailHasError
    ? classes.control + " " + classes.invalid
    : classes.control;
  //#endregion

  //#region Street
  // const [street, setStreet] = useState("");
  // const [streetIsTouched, setStreetIsTouched] = useState(false);
  // const streetInValid = checkEmpty(street) && streetIsTouched;

  // const streetChangeHandler = (event) => {
  //   setStreet(event.target.value);
  // };

  // const streetBlurHandler = (event) => {
  //   setStreetIsTouched(true);
  // };

  const {
    value: street,
    hasError: streetHasError,
    changeHandler: streetChangeHandler,
    blurHandler: streetBlurHandler,
    IsValid: streetIsValid,
    reset: resetStreet,
  } = useInput((street) => !checkEmpty(street));

  const streetClasses = streetHasError
    ? classes.control + " " + classes.invalid
    : classes.control;
  //#endregion

  //#region PostalCode
  // const [postalCode, setPostalCode] = useState("");
  // const [postalCodeIsTouched, setPostalCodeIsTouched] = useState(false);
  // const postalCodeInValid = checkEmpty(postalCode) && postalCodeIsTouched;

  // const postalCodeChangeHandler = (event) => {
  //   setPostalCode(event.target.value);
  // };

  // const postalCodeBlurHandler = (event) => {
  //   setPostalCodeIsTouched(true);
  // };

  const {
    value: postalCode,
    IsValid: postalCodeIsValid,
    changeHandler: postalCodeChangeHandler,
    blurHandler: postalCodeBlurHandler,
    hasError: postalCodeHasError,
    reset: resetPostalCode,
  } = useInput((postalCode) => !checkEmpty(postalCode));

  const postalCodeClasses = postalCodeHasError
    ? classes.control + " " + classes.invalid
    : classes.control;
  //#endregion

  //#region City
  // const [city, setCity] = useState("");
  // const [cityIsTouched, setCityIsTouched] = useState(false);
  // const cityInValid = checkEmpty(city) && cityIsTouched;

  // const cityChangeHandler = (event) => {
  //   setCity(event.target.value);
  // };

  // const cityBlurHandler = (event) => {
  //   setCityIsTouched(true);
  // };

  const {
    value: city,
    IsValid: cityIsValid,
    hasError: cityHasError,
    blurHandler: cityBlurHandler,
    changeHandler: cityChangeHandler,
    reset: resetCity,
  } = useInput((city) => !checkEmpty(city));

  const cityClasses = cityHasError
    ? classes.control + " " + classes.invalid
    : classes.control;
  //#endregion

  //#region Validate The Whole Form
  let formIsValid = false;
  if (
    !nameHasError &&
    !emailHasError &&
    !postalCodeHasError &&
    !cityHasError &&
    !streetHasError
  ) {
    formIsValid = true;
  }
  //#endregion

  const confirmOrderHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      console.log("Done");
      props.onConfirmOrder({
        name,
        street,
        city,
        postalCode,
        email,
      });
      resetCity();
      resetName();
      resetPostalCode();
      resetEmail();
      resetStreet();
    }
  };

  return (
    <form className={classes.form} onSubmit={confirmOrderHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
        {nameHasError && (
          <label className={classes.invalid}>Name is required!</label>
        )}
      </div>
      <div className={emailClasses}>
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        {emailHasError && (
          <label className={classes.invalid}>
            {checkEmailValidity.errorMessage}
          </label>
        )}
      </div>
      <div className={streetClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={street}
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
        />
        {streetHasError && (
          <label className={classes.invalid}>Street is required!</label>
        )}
      </div>
      <div className={postalCodeClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={postalCode}
          onChange={postalCodeChangeHandler}
          onBlur={postalCodeBlurHandler}
        />
        {postalCodeHasError && (
          <label className={classes.invalid}>Postal Code is required!</label>
        )}
      </div>
      <div className={cityClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
        />
        {cityHasError && (
          <label className={classes.invalid}>City is required!</label>
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button disabled={!formIsValid} className={classes.submit}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
