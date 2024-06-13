import { Component } from "react";
import { ClassForm } from "./ClassForm";
import { ProfileInformation } from "../ProfileInformation";


export class ClassApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
    };
  }

  setUserData = (data) => {
    this.setState({ userData: data });
  }

  render() {
    const { userData } = this.state;
    return (
      <>
        <h2>Class</h2>
        <ProfileInformation userData={userData} />
        <ClassForm setUserData={this.setUserData}/>
      </>
    );
  }
}
