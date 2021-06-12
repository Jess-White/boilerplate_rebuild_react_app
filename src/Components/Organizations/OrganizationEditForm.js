import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function OrganizationEditForm(props) {
  const { onSubmit, onCancel } = props;
  const [newName, setNewName] = useState(props.name);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      newName,
    });
  };

  const handleCancel = (event) => {
    event.preventDefault();
    onCancel();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Organization Name</Form.Label>
        <Form.Control
          type="text"
          value={newName}
          name="newName"
          placeholder={newName}
          onChange={(event) => setNewName(event.target.value)}
          required
        />
      </Form.Group>
      <Button
        variant="outline-dark"
        style={{
          fontWeight: "bolder",
        }}
        onClick={handleCancel}
      >
        Cancel
      </Button>
      <Button
        variant="dark"
        type="submit"
        style={{
          fontWeight: "bolder",
        }}
        onClick={handleSubmit}
      >
        Save Changes
      </Button>
    </Form>
  );
}
