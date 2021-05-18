import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "./Elements/Modal";
import { id } from "date-fns/locale";
import { useHistory } from "react-router-dom";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";
import CategoryEditForm from "./Categories/CategoryEditForm";
import countWords from "../Helpers/countWords";
import {
  getCategory,
  updateCategory,
  deleteCategory,
} from "../Services/Organizations/CategoriesService";

//fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faTrashAlt);
library.add(faEdit);

export default function CategoriesShow(props) {
  // const [id, setId] = useState("");
  // const [name, setName] = useState("");
  const [category, setCategory] = useState({}});
  // const [organizationId, setOrganizationId] = useState("");
  // const [organizationName, setOrganizationName] = useState("");
  const [isHidden, setIsHidden] = useState(true);
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

  const [newName, setNewName] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (currentOrganizationId) {
      const CategoryId = props.match.params.category_id;
      getCategory(organizationClient, CategoryId)
        .then((category) => {
          setCategory(category)
          // setId(category.id);
          // setName(category.name);
          // setOrganizationId(category.organization_id);
          // setOrganizationName(category.organization.name);
          setNewName(category.name);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [currentOrganizationId]);

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  const handleSubmit = ({ newName }) => {
    updateCategory(organizationClient, id, {
      name: newName,
      organization_id: category.organization_id,
    })
      .then((category) => {
        setName(category.name);
        toggleHidden();
        handleClose();
      })
      .catch((error) => {
        console.log("category update error", error);
      });
  };

  const handleCancel = (event) => {
    handleClose();
  };

  const handleCategoryDelete = () => {
    const CategoryId = props.match.params.category_id;
    deleteCategory(organizationClient, CategoryId)
      .then((category) => {
        if (category.message) {
          history.push(`/organizations/${currentOrganizationId}/categories`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (loading) {
    return <h1>Loading....</h1>;
  }

  const Header = (
    <Card.Header style={{ backgroundColor: "#09191b" }}>
      <h3
        style={{
          color: "#23cb87",
          fontWeight: "bolder",
          display: "inline",
        }}
      >
        Name: {category.name}
      </h3>
      <FontAwesomeIcon
        icon={faEdit}
        style={{
          color: "#fefefe",
          fontSize: "1.5rem",
          marginLeft: "160px",
        }}
        onClick={handleShow}
      />
      <FontAwesomeIcon
        icon={faTrashAlt}
        style={{
          color: "#fefefe",
          fontSize: "1.5rem",
          marginLeft: "10px",
        }}
        onClick={handleCategoryDelete}
      />
    </Card.Header>
  );

  return (
    <div className="component">
      <Card>{Header}</Card>
      <Modal show={show} onClose={handleClose}>
        <Card>
          <Card.Body>
            <CategoryEditForm
              category={category}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          </Card.Body>
        </Card>
      </Modal>
      <Button onClick={handleCategoryDelete}>Delete</Button>
    </div>
  );
}
