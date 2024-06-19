import { Component } from "react";
import { ErrorMessage } from "../ErrorMessage";

class ClassTextInput extends Component {
  handleChange = (e) => {
    const { updateStateValueFunc } = this.props;
    updateStateValueFunc(e.target.value);
  };

  render() {
    const { inputProps, ShouldErrorShow, errorMessage } = this.props;
    const { id } = inputProps;

    return (
      <>
        <div className="input-wrap">
          <label htmlFor={id}>{id}:</label>
          <input 
            type="text"
            onChange={this.handleChange}
            {...inputProps}
          />
        </div>
        <ErrorMessage message={errorMessage} show={ShouldErrorShow} />
      </>
    )
  }
}

export default ClassTextInput;