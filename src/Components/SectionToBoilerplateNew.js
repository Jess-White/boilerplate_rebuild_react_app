import React, { Component, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "react-quill/dist/quill.snow.css";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";
import { createBoilerplate } from "../Services/Organizations/BoilerplatesService";
import { getAllCategories } from "../Services/Organizations/CategoriesService";

export default function SectionToBoilerplateNew(props) {
  const [quillText, setQuillText] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [organizationId, setOrganizationId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [wordcount, setWordcount] = useState("");
  const [categories, setCategories] = useState([]);
  const [
    isHiddenCategoriesOrganizationsNew,
    setIsHiddenCategoriesOrganizationsNew,
  ] = useState(true);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
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
  }, [currentOrganizationId]);

  // const updateCategories = (newCategory) => {
  //   const categoriesArray = [...categories, newCategory];
  //   setCategories(categoriesArray);
  // };

  // const clearForm = () => {
  //   setQuillText("");
  //   setTitle("");
  //   setText("");
  //   setOrganizationId("");
  //   setCategoryId("");
  //   setWordcount("");
  // };

  // const toggleHiddenCategoriesOrganizationsNew = () => {
  //   setIsHiddenCategoriesOrganizationsNew(!isHiddenCategoriesOrganizationsNew);
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newBoilerplate = {
      title: props.title,
      text: props.text,
      organization_id: props.organization_id,
      category_id: categoryId,
      wordcount: countWords(props.text),
    };
    createBoilerplate(organizationClient, newBoilerplate)
      .then((boilerplate) => {
        if (boilerplate) {
          props.toggleBoilerplateHidden();
        }
      })
      .catch((error) => {
        console.log("boilerplate creation error", error);
      });
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
    <div>
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
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
            </Form.Group>
            <p>{props.title}</p>
            <p dangerouslySetInnerHTML={{ __html: props.text }}></p>
            <Form.Group>
              <Form.Label>Word Count</Form.Label>
              <p>{countWords(props.text)}</p>
            </Form.Group>

            <div className="text-center">
              <Button type="submit">Add New Boilerplate</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
