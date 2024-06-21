import { ErrorMessage } from "../ErrorMessage";

const FunctionalTextInput = ({ inputProps, updateStateValueFunc, shouldErrorShow, errorMessage }) => {
  const { id } = inputProps;
  return (
    <>
      <div className="input-wrap">
        <label htmlFor={id}>{id}:</label>
        <input 
          type="text"
          onChange={(e) => {
            updateStateValueFunc(e.target.value);
          }} 
          {...inputProps}
        />
      </div>
      <ErrorMessage message={errorMessage} show={shouldErrorShow} />
    </>
  )
}

export default FunctionalTextInput;