import React, { useState } from "react";
import { Redirect } from "react-router";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./HomePage.css";

const HomePage = () => {
  const [back, setBack] = useState<boolean>(false);

  return (
    <div>
      {back && <Redirect to="/" />}
      <Button onClick={() => setBack(true)}>Back</Button>
      <h3>HomePage</h3>
    </div>
  );
};

export default HomePage;
