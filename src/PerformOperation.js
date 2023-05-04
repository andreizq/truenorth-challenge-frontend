import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Modal, Navbar, Nav } from 'react-bootstrap';
import UserRecords from "./UserRecords";

const PerformOperation = (props) => {
  const [operation, setOperation] = useState('add');
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [balance, setBalance] = useState(props.balance);
  const [response, setResponse] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isTableShown, setIsTableShown] = useState(false);

  const handleOperationChange = (event) => {
    setOperation(event.target.value);
  };

  const handleValue1Change = (event) => {
    setValue1(event.target.value);
  };

  const handleValue2Change = (event) => {
    setValue2(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        'https://sbhnbx5vf7.execute-api.us-east-1.amazonaws.com/records',
        {
          operation: operation,
          value1: parseFloat(value1),
          value2: parseFloat(value2),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then((response) => {
        setBalance(response.data.user_balance);
        setResponse(response.data.operation_response);
      })
      .catch((error) => {
        setShowError(true);
        setErrorMessage(error.response.data.message);
      });
  };

  const handleCloseError = () => setShowError(false);

  const handleUserRecordsClick = () => {
    console.log("sdsdsds")
    setIsTableShown(current => !current);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    props.setLoggedIn(false);
  };

  var buttonText;
  if(isTableShown){
    buttonText="Operation"
  }else{
    buttonText="User Records"
  }


  return (
    <>
    <Navbar bg="light" variant="light" className="justify-content-between">
        <Nav>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
          <Button variant="secondary" onClick={handleUserRecordsClick}>
            {buttonText}
          </Button>
        </Nav>
      </Navbar>
      {isTableShown && <UserRecords />}
      {!isTableShown && 
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
            Perform Operation
          </h3>
      <div className="mb-3">Current Balance: ${balance}</div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formOperationType">
          <Form.Label>Operation Type:</Form.Label>
          <Form.Control as="select" value={operation} onChange={handleOperationChange}>
            <option value="add">Add ($1)</option>
            <option value="subst">Subtract ($1)</option>
            <option value="mult">Multiply ($2)</option>
            <option value="div">Divide ($2)</option>
            <option value="sqrt">Square Root ($3)</option>
            <option value="rndstr">Random String ($5)</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formValue1">
          <Form.Label>Value 1:</Form.Label>
          <Form.Control type="number" value={value1} onChange={handleValue1Change} />
        </Form.Group>
        {(operation === 'add' || operation === 'subst' || operation === 'mult' || operation === 'div') && (
          <Form.Group controlId="formValue2">
            <Form.Label>Value 2:</Form.Label>
            <Form.Control type="number" value={value2} onChange={handleValue2Change} />
          </Form.Group>
        )}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {response && (
        <div className="mt-3">
          <strong>Operation Response:</strong> {response}
        </div>
      )}
      <Modal show={showError} onHide={handleCloseError}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseError}>
            Close
          </Button>
        </Modal.Footer>
        </Modal>
      </Col>
      </Row>
    </Container>
  }
    </>
  );
};

export default PerformOperation;
