import React, { useState } from "react";
import {
  Modal,
  Button,
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
} from "react-bootstrap";

const SignupModal: React.FC<{
  handleClose: () => void;
  handleSignup: (email: string, password: string, name: string) => void;
}> = (props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

  const signup = () => {
    props.handleSignup(email, password, name);
  };

  return (
    <Modal show={true}>
      <Modal.Header closeButton>
        <Modal.Title>Create Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={signup}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SignupModal;
