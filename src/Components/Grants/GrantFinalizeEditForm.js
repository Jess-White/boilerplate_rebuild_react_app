import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function GrantEditForm(props) {
  const { onSubmit, onCancel } = props;
  const [newTitle, setNewTitle] = useState(props.grant.title);
  const [newRfpUrl, setNewRfpUrl] = useState(props.grant.rfpUrl);
  const [newDeadline, setNewDeadline] = useState(props.grant.deadline);
  const [newSubmitted, setNewSubmitted] = useState(props.grant.submitted);
  const [newSuccessful, setNewSuccessful] = useState(props.grant.successful);
  const [newPurpose, setNewPurpose] = useState(props.grant.purpose);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      newTitle,
      newRfpUrl,
      newDeadline,
      newSubmitted,
      newSuccessful,
      newPurpose,
    });
  };

  const handleCancel = (event) => {
    event.preventDefault();
    onCancel();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={newTitle}
          name="newTitle"
          onChange={(event) => setNewTitle(event.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>RFP URL</Form.Label>
        <Form.Control
          type="text"
          value={newRfpUrl}
          name="newRfpUrl"
          onChange={(event) => setNewRfpUrl(event.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Deadline</Form.Label>
        <Form.Control
          type="datetime"
          value={newDeadline}
          name="newDeadline"
          onChange={(event) => setNewDeadline(event.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Submitted</Form.Label>
        <Form.Check
          type="checkbox"
          name="newSubmitted"
          checked={newSubmitted}
          onChange={(event) => setNewSubmitted(event.target.value.checked)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Successful</Form.Label>
        <Form.Check
          type="checkbox"
          name="newSuccessful"
          checked={newSuccessful}
          onChange={(event) => setNewSuccessful(event.target.value.checked)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Purpose</Form.Label>
        <Form.Control
          type="text"
          value={newPurpose}
          name="newPurpose"
          onChange={(event) => setNewPurpose(event.target.value.checked)}
          required
        />
      </Form.Group>
      <div className="text-center">
        <Button type="submit">Submit</Button>
      </div>
    </Form>
  );
}
