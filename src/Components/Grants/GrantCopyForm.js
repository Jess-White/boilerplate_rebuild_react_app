import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function GrantEditForm(props) {
  const { onSubmit, onCancel, copyGrant } = props;
  const [copyTitle, setCopyTitle] = useState();
  const [copyRfpUrl, setCopyRfpUrl] = useState("");
  const [copyDeadline, setCopyDeadline] = useState("");
  const [successfulCopy, setSuccessfulCopy] = useState(false);
  const [copiedGrantId, setCopiedGrantId] = useState("");
  const [showCopyModal, setShowCopyModal] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      copyTitle,
      copyRfpUrl,
      copyDeadline,
    });
  };

  const handleCancel = (event) => {
    event.preventDefault();
    onCancel();
  };

  return (
    <Form onSubmit={copyGrant}>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="copyTitle"
          value={copyTitle}
          onChange={(event) => setCopyTitle(event.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>RFP URL</Form.Label>
        <Form.Control
          name="copyRfpUrl"
          value={copyRfpUrl}
          onChange={(event) => setCopyRfpUrl(event.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Deadline</Form.Label>
        <Form.Control
          type="datetime-local"
          name="copyDeadline"
          value={copyDeadline}
          onChange={(event) => setCopyDeadline(event.target.value)}
          required
        />
      </Form.Group>
      <Button type="submit">Create Copy</Button>
    </Form>
  );
}
