import React, { useState } from "react";
import logo from "./open-graph.png";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Alert from "react-bootstrap/Alert";
// import FormGroup from 'react-bootstrap/FormGroup'
// import FormLabel from 'react-bootstrap/FormLabel'
// import Input from 'react-bootstrap/Input'
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  const [validated, setValidated] = useState(false);
  const [longUrl, setLongUrl] = useState("");
  const [alert, setAlert] = useState({ message: "This is a success alert.", variant: "success" });
  const BaseUrl = "http://localhost:3000/sm/";

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();

    if (form.checkValidity() === false) e.stopPropagation();

    console.log(longUrl);
    setValidated(true);
  };

  return (
    <Container fluid className="bg-dark">
      {alert && (
        <Row className="alert-fixed">
          <Col>
            
                <Alert dismissible variant={alert.variant}>
                  {alert.message}
                </Alert>
              
          </Col>
        </Row>
      )}
      

      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className="shortener-form text-white mh-100vh"
      >
        <Container className="text-center">
          <Row>
            <Col>
              <img className="d-block mw-100 mh-100" src={logo} alt=""></img>
              <h1>
                <span className="font-weight-bold">SCmini</span>
                <span className="font-weight-light"> - a URL Shortener</span>
              </h1>
            </Col>
          </Row>
        </Container>
        <Form.Group>
          <Form.Label>Long URL</Form.Label>
          <Form.Control
            required
            type="text"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="Example: https://getbootstrap.com/"
          />
          <Form.Control.Feedback type="invalid">
            This is a required field!
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Custom ID</Form.Label>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>{BaseUrl}</InputGroup.Text>
            </InputGroup.Prepend>

            <Form.Control type="text" placeholder="Optional" />
          </InputGroup>
        </Form.Group>
        <Button type="reset" variant="secondary" className="btn-lg btn-block">
          Clear
        </Button>
        <Button type="submit" className="btn-lg btn-block">
          Create Short URL
        </Button>
      </Form>
    </Container>
  );
}

export default App;
