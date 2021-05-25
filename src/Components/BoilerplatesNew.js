import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ReactQuill from "react-quill";
import CategoriesNew from "./CategoriesNew";
import "react-quill/dist/quill.snow.css";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";
import { createBoilerplate } from "../Services/Organizations/BoilerplatesService";
import { getAllCategories } from "../Services/Organizations/CategoriesService";

export default function BoilerplatesNew(props) {
  const [quillText, setQuillText] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [organizationId, setOrganizationId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [wordcount, setWordcount] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const {
    currentOrganizationStore,
    currentOrganizationDispatch,
    organizationClient,
  } = useCurrentOrganizationContext();
  const currentOrganizationId =
    currentOrganizationStore.currentOrganization &&
    currentOrganizationStore.currentOrganization.id;

  useEffect(() => {
    if (currentOrganizationId) {
      getAllCategories(organizationClient)
        .then((categories) => {
          setCategories(categories);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  const updateCategories = (newCategory) => {
    const newCategories = [...categories];
    newCategories.push(newCategory);
    setCategories(categories);
  };

  const clearForm = () => {
    setQuillText("");
    setTitle("");
    setText("");
    setOrganizationId("");
    setCategoryId("");
    setWordcount("");
  };

  const handleCancel = (event) => {
    event.preventDefault();
    history.push(`/organizations/${currentOrganizationId}/boilerplates`);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentOrganizationId) {
      createBoilerplate(organizationClient, {
        title: title,
        text: quillText,
        organization_id: currentOrganizationId,
        category_id: categoryId,
        wordcount: countWords(quillText),
      })
        .then((boilerplate) => {
          if (boilerplate) {
            props.updateBoilerplates(boilerplate);

            clearForm();
          }
        })
        .catch((error) => {
          console.log("boilerplate creation error", error);
        });
    }
  };

  const countWords = (string) => {
    if (string) {
      return string.split(" ").length;
    } else {
      return 0;
    }
  };

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

  return (
    <div className="container">
      {/* <CategoriesNew
        categories={categories}
        updateCategories={updateCategories}
      /> */}
      <Card>
        <Card.Header>
          <h4>Add New Boilerplate</h4>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="categoryId"
                value={categoryId}
                onChange={(event) => setCategoryId(event.target.value)}
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
                      onChange={(event) => setCategoryId(event.target.value)}
                    >
                      {category.name}
                    </option>
                  );
                })}
              </Form.Control>
              <Button variant="primary" size="sm">
                Add New Category
              </Button>
              <Form.Label>Boilerplate Text</Form.Label>
              <ReactQuill
                modules={modules}
                format={formats}
                value={quillText}
                onChange={(value) => setQuillText(value)}
              />
              <Form.Group>
                <Form.Label>Word Count: {countWords(quillText)}</Form.Label>
              </Form.Group>
            </Form.Group>

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
        </Card.Body>
      </Card>
    </div>
  );
}
