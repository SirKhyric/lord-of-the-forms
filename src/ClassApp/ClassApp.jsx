import { Component, useState } from "react";
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
    
    const { userData } = this.state;
    return (
      <>
        <h2>Class</h2>
        <ProfileInformation userData={userData} />
        <ClassForm setUserData={this.setUserData} />
      </>
    );
  }
}
