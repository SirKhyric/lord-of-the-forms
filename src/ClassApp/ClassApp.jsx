import { Component } from "react";
import { ProfileInformation } from "../ProfileInformation";
import { ClassForm } from "./ClassForm";


export class ClassApp extends Component {
  state = {
    userData: null,
  };

  setUserData = (userData) => {
    this.setState({ userData });
  };
  
  render() {
    return (
      <>
        <h2>Class</h2>
        <ProfileInformation userData={this.state.userData} />
        <ClassForm setUserData={this.setUserData} />
      </>
    );
  }
}
