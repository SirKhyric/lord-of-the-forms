import { Component, createRef } from "react";
import { ErrorMessage } from "../ErrorMessage";

export class ClassPhoneInput extends Component {
  
  ref0 = createRef();
  ref1 = createRef();
  ref2 = createRef();
  ref3 = createRef();
  

  createOnChangeHandler = (index) => (e) => {
    const { phoneInputState, setPhoneInputState } = this.props;
    const lengths = [2, 2, 2, 1];
    const currentMaxLength = lengths[index];
    const value = e.target.value.replace(/\D/g, '').slice(0, currentMaxLength);
    
    const newState = phoneInputState.map((phoneInput, phoneInputIndex) => 
      index === phoneInputIndex ? value : phoneInput
    );

    if (currentMaxLength === value.length && this[`ref${index + 1}`]) {
      this[`ref${index + 1}`].current.focus();
    } else if (value.length === 0 && index > 0) {
      this[`ref${index - 1}`].current.focus();
    }

    setPhoneInputState(newState);
  };

  render() {
    const { phoneInputState, shouldErrorShow, errorMessage } = this.props;
    return (
      <>
        <div className="input-wrap">
          <label htmlFor="phone">Phone:</label>
          <div id="phone-input-wrap">
            <input 
              type="text" 
              id="phone-input-1" 
              placeholder="55"
              ref={this.ref0}
              maxLength={2}
              value={phoneInputState[0]}
              onChange={this.createOnChangeHandler(0)} 
            />
            -
            <input 
              type="text" 
              id="phone-input-2" 
              placeholder="55" 
              ref={this.ref1}
              maxLength={2}
              value={phoneInputState[1]}
              onChange={this.createOnChangeHandler(1)}
            />
            -
            <input 
              type="text" 
              id="phone-input-3" 
              placeholder="55" 
              ref={this.ref2}
              maxLength={2}
              value={phoneInputState[2]}
              onChange={this.createOnChangeHandler(2)}
            />
            -
            <input 
              type="text" 
              id="phone-input-4" 
              placeholder="5" 
              ref={this.ref3}
              maxLength={1}
              value={phoneInputState[3]}
              onChange={this.createOnChangeHandler(3)}
            />
          </div>
        </div>
        <ErrorMessage message={errorMessage} show={shouldErrorShow} />
      </>
    )
  }
}