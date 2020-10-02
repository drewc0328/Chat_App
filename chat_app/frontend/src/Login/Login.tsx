import React, { useState } from "react";
import { Redirect } from "react-router";

import { Button, Modal, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./Login.css";

const Login = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [openSignupModal, setOpenSignupModal] = useState<boolean>(false);

  return (
    <React.Fragment>
      {loggedIn && <Redirect to="/home" />}
      <form>
        <div className="input-wrapper">
          <div className="email-input">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="password-input">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
        </div>
        <div className="login-button">
          <button
            type="submit"
            className="btn btn-primary btn-lg active"
            onClick={() => setLoggedIn(true)}
          >
            Login
          </button>
        </div>
        <div className="signup-button">
          <h5 className="sign-up-text">Don't have an account? Sign-up</h5>
          <button
            type="submit"
            className="btn btn-secondary btn-lg active"
            onClick={(e) => {
              e.preventDefault();
              setOpenSignupModal(true);
            }}
          >
            Sign-up
          </button>
        </div>
      </form>

      {/* Signup Modal should be put into a separate component later */}
      <Modal show={openSignupModal} animation={false}>
        <Modal.Header closeButton onClick={() => setOpenSignupModal(false)}>
          <Modal.Title>Create an Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="input-wrapper">
            <div className="email-input">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="password-input">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button
            className="modal-close-button"
            variant="secondary"
            onClick={() => setOpenSignupModal(false)}
          >
            Close
          </Button>
          <Button
            className="modal-submit-button"
            variant="primary"
            onClick={() => {
              setOpenSignupModal(false);
              setLoggedIn(true);
            }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default Login;
