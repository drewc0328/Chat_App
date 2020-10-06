import React from "react";
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
}> = (props) => {
  return (
    <Modal show={true}>
      <Modal.Header closeButton>
        <Modal.Title>Create Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={props.handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SignupModal;
