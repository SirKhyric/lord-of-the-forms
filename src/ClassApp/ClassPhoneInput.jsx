import { Component, createRef } from "react";


export class ClassPhoneInput extends Component {
  constructor(props) {
    super(props);
    this.refsArray = [createRef(), createRef(), createRef(), createRef()];
    this.lengths = [2, 2, 2, 1];
  }

  createOnChangeHandler = (index) => (e) => {
    const { phoneInputState, setPhoneInputState } = this.props;
    const currentMaxLength = this.lengths[index];
    const value = e.target.value.replace(/\D/g, '').slice(0, currentMaxLength);
    const nextRef = this.refsArray[index + 1];
    const prevRef = this.refsArray[index - 1];

    const shouldGoToNextRef = currentMaxLength === value.length && nextRef?.current;
    const shouldGoToPrevRef = value.length === 0 && index > 0;

    const newState = phoneInputState.map((phoneInput, phoneInputIndex) => 
      index === phoneInputIndex ? value : phoneInput
    );

    if (shouldGoToNextRef) {
      nextRef.current?.focus();
    }

    if (shouldGoToPrevRef) {
      prevRef.current?.focus();
    }

    setPhoneInputState(newState);
  };

  render() {
    const { phoneInputState } = this.props;
    return (
      <div className="input-wrap">
          <label htmlFor="phone">Phone:</label>
          <div id="phone-input-wrap">
            <input 
              type="text" 
              id="phone-input-1" 
              placeholder="55"
              ref={this.refsArray[0]}
              maxLength={this.lengths[0]}
              value={phoneInputState[0]}
              onChange={this.createOnChangeHandler(0)} 
            />
            -
            <input 
              type="text" 
              id="phone-input-2" 
              placeholder="55" 
              ref={this.refsArray[1]}
              maxLength={this.lengths[1]}
              value={phoneInputState[1]}
              onChange={this.createOnChangeHandler(1)}
            />
            -
            <input 
              type="text" 
              id="phone-input-3" 
              placeholder="55" 
              ref={this.refsArray[2]}
              maxLength={this.lengths[2]}
              value={phoneInputState[2]}
              onChange={this.createOnChangeHandler(2)}
            />
            -
            <input 
              type="text" 
              id="phone-input-4" 
              placeholder="5" 
              ref={this.refsArray[3]}
              maxLength={this.lengths[3]}
              value={phoneInputState[3]}
              onChange={this.createOnChangeHandler(3)}
            />
          </div>
        </div>
    )
  }
}