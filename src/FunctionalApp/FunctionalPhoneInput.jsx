import { useRef } from "react";
import { ErrorMessage } from "../ErrorMessage";

export const FunctionalPhoneInput = ({ phoneInputState, setPhoneInputState, shouldShowError, errorMessage }) => {

  const refs = [useRef(), useRef(), useRef(), useRef()];

  const ref0 = refs[0];
  const ref1 = refs[1];
  const ref2 = refs[2];
  const ref3 = refs[3];

  const lengths = [2, 2, 2, 1];

  const createOnChangeHandler = (index) => (e) => {
    const currentMaxLength = lengths[index];
    const value = e.target.value.replace(/\D/g, '').slice(0, currentMaxLength); // Ensure max length
    const nextRef = refs[index + 1];
    const prevRef = refs[index - 1];

    const shouldGoToNextRef = currentMaxLength === value.length && nextRef?.current;
    const shouldGoToPrevRef = value.length === 0 && index > 0;

    const newState = phoneInputState.map((phoneInput, phoneInputIndex) => 
      index === phoneInputIndex ? value : phoneInput
    );

    if (shouldGoToNextRef) {
      nextRef.current?.focus();
    };

    if (shouldGoToPrevRef) {
      prevRef.current?.focus();
    };
    setPhoneInputState(newState);
  };

  return (
    <>
    <div className="input-wrap">
      <label htmlFor="phone">Phone:</label>
      <div id="phone-input-wrap">
        <input 
          type="text" 
          ref={ref0}
          maxLength={lengths[0]}
          value={phoneInputState[0]}
          onChange={createOnChangeHandler(0)}
          id="phone-input-1" 
          placeholder="55" 
        />
        -
        <input 
          type="text"
          ref={ref1}
          maxLength={lengths[1]}
          value={phoneInputState[1]}
          onChange={createOnChangeHandler(1)} 
          id="phone-input-2" 
          placeholder="55" 
        />
        -
        <input 
          type="text"
          ref={ref2}
          maxLength={lengths[2]}
          value={phoneInputState[2]}
          onChange={createOnChangeHandler(2)}
          id="phone-input-3" 
          placeholder="55" 
        />
        -
        <input 
          type="text" 
          ref={ref3}
          maxLength={lengths[3]}
          value={phoneInputState[3]}
          onChange={createOnChangeHandler(3)}
          id="phone-input-4" 
          placeholder="5" 
        />
      </div>
    </div>
    <ErrorMessage message={errorMessage} show={shouldShowError} />
    </>
  );
}