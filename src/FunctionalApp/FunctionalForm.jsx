import { useState } from "react";
import { isEmailValid, isPhoneValid } from "../utils/validations";
import { FunctionalPhoneInput } from "./FunctionalPhoneInput";
import FunctionalTextInput from "./FunctionalTextInput";
import { isValidCity } from "../utils/validations";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export const FunctionalForm = ({ setUserData }) => {

  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [phoneInput, setPhoneInput] = useState(["", "", "", ""]);
  const [cityNameInput, setCityNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const resetForm = () => {
    setFirstNameInput("");
    setLastNameInput("");
    setEmailInput("");
    setPhoneInput(["", "", "", ""]);
    setCityNameInput("");
    setIsSubmitted(false);
  };

  const isFirstNameValid = firstNameInput.length >= 2;
  const isLastNameValid = lastNameInput.length >= 2;
  const isCityInputValid = isValidCity(cityNameInput);
  const isPhoneInputValid = isPhoneValid(phoneInput);
  const isEmailInputValid = isEmailValid(emailInput);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (
      isFirstNameValid && 
      isLastNameValid &&
      isEmailInputValid && 
      isCityInputValid && 
      isPhoneInputValid
    ) {
      setUserData({
        firstName: firstNameInput,
        lastName: lastNameInput,
        email: emailInput,
        city: cityNameInput,
        phone: phoneInput.join(""),
      });
      resetForm();
    }
  };

  return (
    <form onSubmit={handleSubmit} >
      <u>
        <h3>User Information Form</h3>
      </u>

      {/* first name input */}
      <FunctionalTextInput
        inputProps={{
          id: 'First Name',
          placeholder: 'Bilbo',
          value: firstNameInput,
        }}
        updateStateValueFunc={setFirstNameInput}
        shouldErrorShow={isSubmitted && !isFirstNameValid}
        errorMessage={firstNameErrorMessage}
      />

      {/* last name input */}
      <FunctionalTextInput 
        inputProps={{
          id: 'Last Name',
          placeholder: 'Baggins',
          value: lastNameInput,
        }}
        updateStateValueFunc={setLastNameInput}
        shouldErrorShow={isSubmitted && !isLastNameValid}
        errorMessage={lastNameErrorMessage}
      />

      {/* Email Input */}
      <FunctionalTextInput 
        inputProps={{
          id: 'Email',
          placeholder: 'bilbo-baggins@adventurehobbits.net',
          value: emailInput
        }}
        updateStateValueFunc={setEmailInput}
        shouldErrorShow={isSubmitted && !isEmailInputValid}
        errorMessage={emailErrorMessage}
      />

      {/* City Input */}
      <FunctionalTextInput 
        inputProps={{
          id: 'City',
          placeholder: 'Hobbiton',
          list: 'cities',
          value: cityNameInput
        }}
        updateStateValueFunc={setCityNameInput}
        shouldErrorShow={isSubmitted && !isCityInputValid}
        errorMessage={cityErrorMessage}
      />

      {/* Phone Input */}
      <FunctionalPhoneInput 
        phoneInputState={phoneInput}
        setPhoneInputState={setPhoneInput}
        shouldShowError={isSubmitted && !isPhoneInputValid}
        errorMessage={phoneNumberErrorMessage}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};
