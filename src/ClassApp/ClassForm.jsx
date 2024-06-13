import { Component } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { capitalize } from "../utils/transformations";
import { allCities } from "../utils/all-cities";
import { isEmailValid, isPhoneValid } from "../utils/validations";
import { ClassPhoneInput } from "./ClassPhoneInput";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export class ClassForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstNameInput: "",
      lastNameInput: "",
      emailInput: "",
      phoneInput: ["", "", "", ""],
      cityNameInput: "",
      isSubmitted: false,
    };
  }

  handleFirstNameChange = (e) => {
    this.setState({ firstNameInput: capitalize(e.target.value) })
  }

  handleLastNameChange = (e) => {
    this.setState({ lastNameInput: capitalize(e.target.value) })
  }

  handleEmailChange = (e) => {
    this.setState({ emailInput: e.target.value })
  }

  handleCityNameChange = (e) => {
    this.setState({ cityNameInput: e.target.value })
  }

  handlePhoneInputChange = (phoneInputState) => {
    this.setState({ phoneInput: phoneInputState })
  };

  isValidCity = (city) => {
    return allCities.some((validCity) => validCity.toLowerCase() === city.toLowerCase())
  };

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
    const { firstNameInput, lastNameInput, emailInput, cityNameInput, phoneInput } = this.state;
    const isEmailInputValid = isEmailValid(emailInput);
    const isCityInputValid = this.isValidCity(cityNameInput);
    const isPhoneInputValid = isPhoneValid(phoneInput);

    if (firstNameInput.length > 2 && lastNameInput.length > 2 && isEmailInputValid && isCityInputValid && isPhoneInputValid) {
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

  render() {
    const { firstNameInput, lastNameInput, emailInput, cityNameInput, phoneInput, isSubmitted } = this.state;
    const isEmailInputValid = isEmailValid(emailInput);
    const isCityInputValid = this.isValidCity(cityNameInput);
    const isPhoneInputValid = isPhoneValid(phoneInput);


    return (
      <form onSubmit={this.handleSubmit}>
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
            onChange={this.handleFirstNameChange}
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
            onChange={this.handleLastNameChange} 
          />
        </div>
        {isSubmitted && lastNameInput.length < 2 && (
          <ErrorMessage message={lastNameErrorMessage} show={true} />
        )}

        {/* Email Input */}
        <div className="input-wrap">
          <label>{"Email"}:</label>
          <input 
            placeholder="bilbo-baggins@adventurehobbits.net" 
            type="text"
            value={emailInput}
            onChange={this.handleEmailChange}
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
            onChange={this.handleCityNameChange} 
          />
        </div>
        {isSubmitted && !isCityInputValid && (
          <ErrorMessage message={cityErrorMessage} show={true} />
        )}

        <ClassPhoneInput
          phoneInputState={phoneInput}
          setPhoneInputState={this.handlePhoneInputChange}
        />
        {isSubmitted && !isPhoneInputValid && (
          <ErrorMessage message={phoneNumberErrorMessage} show={true} />
        )}
        
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
