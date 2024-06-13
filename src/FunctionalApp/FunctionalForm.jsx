import { useState } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { capitalize } from "../utils/transformations";
import { isEmailValid, isPhoneValid } from "../utils/validations";
import { allCities } from "../utils/all-cities";
import { FunctionalPhoneInput } from "./FunctionalPhoneInput";

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

  const handleFirstNameChange = (e) => {
    setFirstNameInput(capitalize(e.target.value));
  };

  const handleLastNameChange = (e) => {
      setLastNameInput(capitalize(e.target.value));
  };

  const handleCityNameChange = (e) => {
    setCityNameInput(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmailInput(e.target.value);
  };

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
      <div className="input-wrap">
        <label>{"First Name"}:</label>
        <input 
          placeholder="Bilbo"
          type="text"
          value={firstNameInput}
          onChange={handleFirstNameChange} 
        />
      </div>
      {isSubmitted && firstNameInput.length < 2 && (
        <ErrorMessage message={firstNameErrorMessage} show={true} />
      )}

      {/* last name input */}
      <div className="input-wrap">
        <label>{"Last Name"}:</label>
        <input 
          placeholder="Baggins"
          type="text"
          value={lastNameInput}
          onChange={handleLastNameChange} 
        />
      </div>
      {isSubmitted && lastNameInput.length < 2 && (
         <ErrorMessage message={lastNameErrorMessage} show={true} />
      )}

      {/* Email Input */}
      <div className="input-wrap">
        <label>{"Email"}:</label>
        <input placeholder="bilbo-baggins@adventurehobbits.net" 
          type="text"
          value={emailInput}
          onChange={handleEmailChange}
        />
      </div>
      {isSubmitted && !isEmailInputValid && (
        <ErrorMessage message={emailErrorMessage} show={true} />
      )}

      {/* City Input */}
      <div className="input-wrap">
        <label>{"City"}:</label>
        <input 
          placeholder="Hobbiton" 
          type="text"
          value={cityNameInput}
          onChange={handleCityNameChange}
        />
      </div>
      {isSubmitted && !isCityInputValid && (
        <ErrorMessage message={cityErrorMessage} show={true} />
      )}

      {/* Phone Input */}
      <FunctionalPhoneInput 
        phoneInputState={phoneInput}
        setPhoneInputState={setPhoneInput}
      />
      {isSubmitted && !isPhoneInputValid && (
        <ErrorMessage message={phoneNumberErrorMessage} show={true} />
      )}

      <input type="submit" value="Submit" />
    </form>
  );
};
