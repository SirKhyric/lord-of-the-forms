import { Component } from "react";
import { isEmailValid, isPhoneValid } from "../utils/validations";
import { ClassPhoneInput } from "./ClassPhoneInput";
import ClassTextInput from "./ClassTextInput";
import { isValidCity } from "../utils/validations";


const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export class ClassForm extends Component {

  state = {
    firstNameInput: "",
    lastNameInput: "",
    emailInput: "",
    phoneInput: ["", "", "", ""],
    cityNameInput: "",
    isSubmitted: false,
  }

  resetForm = () => {
    this.setState({
      firstNameInput: "",
      lastNameInput: "",
      emailInput: "",
      phoneInput: ["", "", "", ""],
      cityNameInput: "",
      isSubmitted: false,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ isSubmitted: true });

    const { 
      firstNameInput, 
      lastNameInput, 
      emailInput, 
      cityNameInput, 
      phoneInput 
    } = this.state;
    
    const isEmailInputValid = isEmailValid(emailInput);
    const isCityInputValid = isValidCity(cityNameInput);
    const isPhoneInputValid = isPhoneValid(phoneInput);

    if (
      firstNameInput.length > 2 && 
      lastNameInput.length > 2 && 
      isEmailInputValid && 
      isCityInputValid && 
      isPhoneInputValid
    ) {
      this.props.setUserData({
        firstName: firstNameInput,
        lastName: lastNameInput,
        email: emailInput,
        city: cityNameInput,
        phone: phoneInput.join(""),
      });
      this.resetForm();
    }
  };

  updateStateValueFunc = (field) => (value) => {
    this.setState({ [field]: value });
  };  

  render() {
    const { 
      firstNameInput, 
      lastNameInput, 
      emailInput, 
      cityNameInput, 
      phoneInput, 
      isSubmitted 
    } = this.state;

    const isEmailInputValid = isEmailValid(emailInput);
    const isCityInputValid = isValidCity(cityNameInput);
    const isPhoneInputValid = isPhoneValid(phoneInput);

    return (
      <form onSubmit={this.handleSubmit}>
        <u>
          <h3>User Information Form</h3>
        </u>

        {/* first name input */}
        <ClassTextInput
          inputProps={{
            id: 'First Name',
            placeholder: 'Bilbo',
            value: firstNameInput
          }}
          updateStateValueFunc={this.updateStateValueFunc("firstNameInput")}
          shouldErrorShow={isSubmitted && firstNameInput.length < 2}
          errorMessage={firstNameErrorMessage}
        />
        
        {/* last name input */}
        <ClassTextInput
          inputProps={{
            id: 'Last Name',
            placeholder: 'Baggins',
            value: lastNameInput
          }} 
          updateStateValueFunc={this.updateStateValueFunc("lastNameInput")}
          shouldErrorShow={isSubmitted && lastNameInput.length < 2}
          errorMessage={lastNameErrorMessage}
        />

        {/* Email Input */}
        <ClassTextInput 
          inputProps={{
            id: 'Email',
            placeholder: 'bilbo-baggins@adventurehobbits.net',
            value: emailInput
          }}
          updateStateValueFunc={this.updateStateValueFunc("emailInput")}
          shouldErrorShow={isSubmitted && !isEmailInputValid}
          errorMessage={emailErrorMessage}
        />
        
        {/* City Input */}
        <ClassTextInput
          inputProps={{
            id: 'City',
            placeholder: 'Hobbiton',
            list: 'cities',
            value: cityNameInput
          }}
          updateStateValueFunc={this.updateStateValueFunc("cityNameInput")}
          shouldErrorShow={isSubmitted && !isCityInputValid}
          errorMessage={cityErrorMessage}
        />  

        {/* Phone Input */}
        <ClassPhoneInput
          phoneInputState={phoneInput}
          setPhoneInputState={this.updateStateValueFunc("phoneInput")}
          shouldErrorShow={isSubmitted && !isPhoneInputValid}
          errorMessage={phoneNumberErrorMessage}
        />
        
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
