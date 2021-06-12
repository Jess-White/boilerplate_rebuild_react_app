import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function OrganizationsNew(props) {
  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);

  const clearForm = () => {
    setName("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newOrganization = {
      name: name,
    };
    axios
      .post("/api/organizations", newOrganization, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .then((response) => {
        props.onSubmit(response.data);
        clearForm();
      })
      .catch((error) => {
        console.log("organization creation error", error);
      });
  };

  return (
    <Card>
      <Card.Header>
        <h3>Add Organization</h3>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Organization Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </Form.Group>
          <Button variant="outline-dark" onClick={props.onCancel}>Cancel</Button>
          <Button variant="dark" type="submit">Add New Organization</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
