import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// import axios from "axios";
// import { useHistory } from "react-router-dom";
// import { useCurrentOrganizationContext } from "../../Contexts/currentOrganizationContext";

export default function CategoriesShowForm(props) {
  console.log("rendered!");
  const { onSubmit, onCancel } = props;
  const [category, setCategory] = useState(props.category);
  const [newName, setNewName] = useState(props.category.name);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(
      {
        newName,
      },
      category.id
    );
  };

  const handleCancel = (event) => {
    event.preventDefault();
    onCancel();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          value={newName}
          name="newName"
          placeholder={newName}
          onChange={(event) => setNewName(event.target.value)}
          required
        />
      </Form.Group>
      <div>
        <Button
          variant="outline-success"
          type="submit"
          style={{
            maxWidth: "50%",
            align: "center",
            backgroundColor: "#23cb87",
            color: "#09191b",
            fontWeight: "bolder",
          }}
          onClick={handleSubmit}
        >
          Save Changes
        </Button>
        <Button
          variant="outline-success"
          style={{
            maxWidth: "50%",
            align: "center",
            backgroundColor: "#23cb87",
            color: "#09191b",
            fontWeight: "bolder",
          }}
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </div>
    </Form>
  );
}
