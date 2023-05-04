import PerformOperation from "./PerformOperation";
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from "axios";

const LoginRegister = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [balance, setBalance] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isRegister) {
        const response = await axios.post(
          "https://sbhnbx5vf7.execute-api.us-east-1.amazonaws.com/register",
          {
            username,
            password,
            balance,
          }
        );
        alert(`Successfully registered user ${response.data.username}`);
      } else {
        const response = await axios.post(
          "https://sbhnbx5vf7.execute-api.us-east-1.amazonaws.com/login",
          {
            username,
            password,
          }
        );
        localStorage.setItem("token", response.data.token);
        setBalance(response.data.balance);
        setLoggedIn(true);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  if (loggedIn) {
    return (
      <PerformOperation balance={balance} setLoggedIn={setLoggedIn}/>
    );
  }

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs={12} sm={8} md={6} lg={4}>
          <h1 className="text-center mb-4">
            Truenorth Challenge
          </h1>
          <h2 className="text-center mb-4">
            Arithmetic calculator
          </h2>
          <h3 className="text-center mb-4">
            {isRegister ? "Register" : "Login"}
          </h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            {isRegister && (
              <Form.Group controlId="formBalance">
                <Form.Label>Starting Balance</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter starting balance"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                />
              </Form.Group>
            )}
            <Button variant="primary" type="submit" block="true">
              {isRegister ? "Register" : "Login"}
            </Button>
            <div className="text-center mt-3">
              {isRegister
                ? "Already have an account?"
                : "Don't have an account?"}{" "}
              <a
                href="#"
                onClick={() => setIsRegister(!isRegister)}
                className="font-weight-bold"
              >
                {isRegister ? "Login" : "Register"}
              </a>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginRegister;