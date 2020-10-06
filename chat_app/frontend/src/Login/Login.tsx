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
import "./Login.css";

const Login = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [openSignupModal, setOpenSignupModal] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  return (
    <div className="joinOuterContainer">
      {loggedIn && <Redirect to="/home" />}
      {openSignupModal && (
        <SignupModal handleClose={() => setOpenSignupModal(false)} />
      )}
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <Container>
          <Row className="email-row">
            <InputGroup size="lg">
              <FormControl
                placeholder="Email"
                aria-label="Large"
                aria-describedby="inputGroup-sizing-sm"
              />
            </InputGroup>
          </Row>
          <Row className="password-row">
            <InputGroup size="lg">
              <FormControl
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
                onClick={() => setLoggedIn(true)}
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
