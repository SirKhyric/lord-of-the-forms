import { useState } from "react";
import { capitalize } from "../utils/transformations";
import { isEmailValid, isPhoneValid } from "../utils/validations";
import { allCities } from "../utils/all-cities";
import { FunctionalPhoneInput } from "./FunctionalPhoneInput";
import FunctionalTextInput from "./FunctionalTextInput";

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

  const isValidCity = (city) => {
    return allCities.some((validCity) => validCity.toLowerCase() === city.toLowerCase());
  }

  const resetForm = () => {
    setFirstNameInput("");
    setLastNameInput("");
    setEmailInput("");
    setPhoneInput(["", "", "", ""]);
    setCityNameInput("");
    setIsSubmitted(false);
  };

  const isCityInputValid = isValidCity(cityNameInput);
  const isPhoneInputValid = isPhoneValid(phoneInput);
  const isEmailInputValid = isEmailValid(emailInput);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (
      firstNameInput.length >= 2 && 
      lastNameInput.length >= 2 &&
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
          value: capitalize(firstNameInput),
        }}
        updateStateValueFunc={setFirstNameInput}
        shouldErrorShow={isSubmitted && firstNameInput.length < 2}
        errorMessage={firstNameErrorMessage}
      />

      {/* last name input */}
      <FunctionalTextInput 
        inputProps={{
          id: 'Last Name',
          placeholder: 'Baggins',
          value: capitalize(lastNameInput),
        }}
        updateStateValueFunc={setLastNameInput}
        shouldErrorShow={isSubmitted && lastNameInput.length < 2}
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
