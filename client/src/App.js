import React from 'react';
import logo from './open-graph.png';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
// import FormGroup from 'react-bootstrap/FormGroup'
// import FormLabel from 'react-bootstrap/FormLabel'
// import Input from 'react-bootstrap/Input'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'

function App() {
  const BaseUrl = "http://localhost:3000/sm/"
  return (
 

    <Container fluid className="bg-dark">
    {/* // <Container fluid className="bg-dark vh-100 d-flex flex-column justify-content-center">  
    //   <Row className="justify-content-center">
    //     <Col xs={6} className="text-center d-flex flex-column justify-content-center">
          
    //       <Button className="w-50 ml-auto mr-auto">Salik</Button>
    //       <Button></Button>
    //     </Col>
    //   </Row>
       */}
    <Form className="shortener-form text-white mh-100vh">
      
      <Container className="text-center">
        <Row>
          <Col>
          <img className="d-block mw-100 mh-100" src={logo}></img>
            <h1><span className="font-weight-bold">SCmini</span><span className="font-weight-light"> - a URL Shortener</span></h1>
          </Col>
        </Row>
        {/* <h1 className="font-weight-bold">SCmini</h1> */}
        {/* <h2>URL Shortener</h2> */}
        {/* <img className="w-50" src={logo}></img> */}
      </Container>
      <Form.Group>
        <Form.Label>Long URL</Form.Label>
        <Form.Control type="text" placeholder="Example: https://getbootstrap.com/" />
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
      <Button variant="secondary" className="btn-lg btn-block">Clear</Button>
      <Button className="btn-lg btn-block">Create Short URL</Button>
    </Form>
    </Container>


  );
}

export default App;
