import React, { useState } from "react";
import { Redirect } from "react-router";

import {
  Button,
  Modal,
  Card,
  Row,
  Col,
  Container,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import SignupModal from "./SignupModal/SignupModal";
import User from "../UserContext";
import "./Login.css";

const Login: React.FC<{
  getUserId: (user: User) => void;
}> = (props) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [openSignupModal, setOpenSignupModal] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

  const loginHandler = async () => {
    try {
      console.log("email: ", email);
      console.log("password: ", password);
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }
      console.log("responseData in login: ", responseData);
      props.getUserId(responseData.user);
      setLoggedIn(true);
    } catch (err) {
      console.log(err.message || "Something went wrong, please try again");
    }
  };

  const signupHandler = async (
    signupEmail: string,
    signupPassword: string,
    signupName: string
  ) => {
    setOpenSignupModal(false);
    try {
      const response = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: signupName,
          email: signupEmail,
          password: signupPassword,
        }),
      });
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }
      console.log("responseData in signup: ", responseData);
      props.getUserId(responseData.user);
      setLoggedIn(true);
    } catch (err) {
      console.log(err.message || "Something went wrong, please try again");
    }
  };

  return (
    <div className="joinOuterContainer">
      {loggedIn && <Redirect to="/home" />}
      {openSignupModal && (
        <SignupModal
          handleClose={() => setOpenSignupModal(false)}
          handleSignup={signupHandler}
        />
      )}
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <Container>
          <Row className="name-row">
            <InputGroup size="lg">
              <FormControl
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                aria-label="Large"
                aria-describedby="inputGroup-sizing-sm"
              />
            </InputGroup>
          </Row>
          <Row className="email-row">
            <InputGroup size="lg">
              <FormControl
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                aria-label="Large"
                aria-describedby="inputGroup-sizing-sm"
              />
            </InputGroup>
          </Row>
          <Row className="password-row">
            <InputGroup size="lg">
              <FormControl
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                aria-label="Large"
                aria-describedby="inputGroup-sizing-sm"
              />
            </InputGroup>
          </Row>
          <Row className="button-row">
            <Col>
              <Button
                onClick={loginHandler}
                className="login-button"
                variant="outline-light"
              >
                Login
              </Button>
            </Col>
            <Col>
              <Button
                onClick={() => setOpenSignupModal(true)}
                className="login-button"
                variant="outline-light"
              >
                Sign-Up
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Login;
