import React, { useState } from "react";
import logo from "./open-graph.png";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Alert from "react-bootstrap/Alert";
import Table from "react-bootstrap/Table";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  const [validated, setValidated] = useState(false);
  const [longUrl, setLongUrl] = useState("");
  const [customId, setCustomId] = useState("");
  const [alert, setAlert] = useState(undefined);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const BaseUrl =
    process.env.NODE_ENV === "development" ? "http://localhost:3200/" : "";

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();

    if (form.checkValidity() === false) e.stopPropagation();
    else requestShortUrl(longUrl, customId);

    setValidated(true);
  };

  const resetForm = () => {
    setCustomId("");
    setLongUrl("");
    setValidated(false);
  };

  const requestShortUrl = (longUrl, customId) => {
    setLoading(true);
    axios
      .post(BaseUrl + "api/url/shorten", {
        longUrl: longUrl,
        customId: customId,
      })
      .then((res) => {
        setAlert({
          message: `A new short URL has been created!`,
          variant: "success",
        });
        setLinks([
          ...links,
          { longUrl: res.data.longUrl, shortUrl: res.data.shortUrl },
        ]);
        setLoading(false);
        resetForm();
      })
      .catch((err) => {
        setAlert({ message: err.response.data, variant: "danger" });
        setLoading(false);
        resetForm();
      });
  };
  return (
    <Container fluid className="bg-dark mh-100vh">
      {alert && (
        <Row className="alert-fixed w-100 justify-content-center">
          <Col xl={6} large={11} sm={11} md={11}>
            <Alert
              dismissible
              variant={alert.variant}
              className="local-max-width-alert"
              onClose={() => setAlert(undefined)}
            >
              {alert.message}
            </Alert>
          </Col>
        </Row>
      )}

      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className="shortener-form text-white"
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
            placeholder="Example: https://some-link.com/example"
          />
          <Form.Control.Feedback type="invalid">
            This is a required field!
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Custom ID</Form.Label>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>scmini.herokuapp.com/</InputGroup.Text>
            </InputGroup.Prepend>

            <Form.Control
              type="text"
              placeholder="Optional"
              value={customId}
              onChange={(e) => setCustomId(e.target.value)}
            />
          </InputGroup>
        </Form.Group>
        <Button
          type="reset"
          variant="secondary"
          className="btn-lg btn-block"
          onClick={resetForm}
        >
          Clear
        </Button>
        <Button type="submit" className="btn-lg btn-block" disabled={loading}>
          Create Short URL
        </Button>
        {links.length > 0 && (
          <Table striped responsive variant="dark" className="margin-top-15px">
            <thead>
              <tr>
                <th>Short URL</th>
                <th>Long URL</th>
              </tr>
            </thead>
            <tbody>
              {links.map((link, i) => (
                <tr key={i}>
                  <td>
                    <a href={link.shortUrl}>{link.shortUrl}</a>
                  </td>
                  <td>{link.longUrl}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Form>
    </Container>
  );
}

export default App;
