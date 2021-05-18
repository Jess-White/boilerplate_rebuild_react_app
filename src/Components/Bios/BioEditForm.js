import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import countWords from "../../Helpers/countWords";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
    [{ color: [] }],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "color",
];

export default function BioEditForm(props) {
  const { onSubmit, onCancel } = props;
  const [newQuillText, setNewQuillText] = useState(props.bio.quillText);
  const [newFirstName, setNewFirstName] = useState(props.bio.firstName);
  const [newLastName, setNewLastName] = useState(props.bio.lastName);
  const [newTitle, setNewTitle] = useState(props.bio.title);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      newQuillText,
      newFirstName,
      newLastName,
      newTitle,
    });
  };

  const handleCancel = (event) => {
    event.preventDefault();
    onCancel();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          value={newFirstName}
          name="newFirstName"
          placeholder={newFirstName}
          onChange={(event) => setNewFirstName(event.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          value={newLastName}
          name="newLastName"
          placeholder={newLastName}
          onChange={(event) => setNewLastName(event.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={newTitle}
          name="newTitle"
          placeholder={newTitle}
          onChange={(event) => setNewTitle(event.target.value)}
          required
        />
      </Form.Group>
      <ReactQuill
        name="quillText"
        modules={modules}
        format={formats}
        defaultValue={newQuillText}
        style={{ color: "#09191b", backgroundColor: "#fefefe" }}
        value={newQuillText}
        onChange={(value) => setNewQuillText(value)}
      />
      <Form.Group>
        <Form.Label>Word Count</Form.Label>
        <p style={{ color: "#fefefe" }}>{countWords(newQuillText)}</p>
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
