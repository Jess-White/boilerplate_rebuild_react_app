import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// import axios from "axios";
// import { useHistory } from "react-router-dom";
// import { useCurrentOrganizationContext } from "../../Contexts/currentOrganizationContext";
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

export default function BoilerplateEditForm(props) {
  const { categories, onSubmit, onCancel } = props;
  const [newTitle, setNewTitle] = useState(props.title);
  const [newQuillText, setNewQuillText] = useState(props.quillText);
  const [newCategoryId, setNewCategoryId] = useState(props.categoryId);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      newTitle,
      newQuillText,
      newCategoryId,
    });
  };

  const handleCancel = (event) => {
    event.preventDefault();
    onCancel();
  };

  return (
    <div>
      <h4>Edit Boilerplate</h4>
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
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            name="newCategoryId"
            value={newCategoryId}
            onChange={(event) => setNewCategoryId(event.target.value)}
            required
          >
            <option value="" disabled>
              Select Category
            </option>
            {categories.map((category) => {
              return (
                <option
                  key={category.id}
                  value={category.id}
                  onChange={(event) => setNewCategoryId(event.target.value)}
                >
                  {category.name}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
        <ReactQuill
          name="newQuillText"
          modules={modules}
          format={formats}
          defaultValue={props.quillText}
          onChange={(value) => setNewQuillText(value)}
          style={{ backgroundColor: "#fefefe", color: "black" }}
        />
        <p style={{ color: "#fefefe" }}>
          Word Count: {countWords(newQuillText)}
        </p>
        <div>
          <Button
            type="submit"
            style={{
              maxWidth: "50%",
              align: "center",
            }}
            onClick={handleSubmit}
          >
            Save Changes
          </Button>
          <Button
            style={{
              maxWidth: "50%",
              align: "center",
            }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
}
