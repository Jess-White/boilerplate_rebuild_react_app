import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CategoriesNew from "./CategoriesNew";
import Modal from "./Elements/Modal";
import Card from "react-bootstrap/Card";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";
import { getAllCategories } from "../Services/Organizations/CategoriesService";
import CategoryEditForm from "./Categories/CategoryEditForm";
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

export default function Categories() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [query] = useState("");
  const {
    currentOrganizationStore,
    currentOrganizationDispatch,
    organizationClient,
  } = useCurrentOrganizationContext();
  const currentOrganizationId =
    currentOrganizationStore.currentOrganization &&
    currentOrganizationStore.currentOrganization.id;

  const [name, setName] = useState("");
  const [newName, setNewName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState({});

  const [showCategoriesNew, setShowCategoriesNew] = useState(false);
  const [showCategoryEdit, setShowCategoryEdit] = useState(false);
  const handleClose = () => {
    setShowCategoriesNew(false);
    setShowCategoryEdit(false);
  };
  const handleShowCategoriesNew = () => setShowCategoriesNew(true);
  const handleShowCategoryEdit = (selectedCategory) => {
    console.log(selectedCategory);
    setSelectedCategory(selectedCategory);
    setShowCategoryEdit(true);
    console.log(showCategoryEdit);
  };

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

  const updateCategories = (newCategory) => {
    const newCategories = [...categories, newCategory];
    setCategories(newCategories);
  };

  const handleSubmitEditCategory = ({ newName }, id) => {
    console.log(id);
    updateCategory(organizationClient, id, {
      name: newName,
      organization_id: currentOrganizationId,
    })
      .then((category) => {
        setName(name);
        handleClose();
      })
      .catch((error) => {
        console.log("category update error", error);
      });
  };

  const handleCancel = (event) => {
    handleClose();
  };

  const handleCategoryDelete = (categoryId) => {
    console.log("deleted!");
  };

  if (loading) {
    return (
      <div className="container">
        <h1>Loading....</h1>
      </div>
    );
  }

  return (
    <div className="flex-container">
      <div className="flex container col">
        <Card className="card-component">
          <Card.Header className="card-component card-heading">
            Categories
          </Card.Header>
          {categories.map((category) => {
            return (
              <div>
                <p>{category.name}</p>
                <FontAwesomeIcon
                  icon={faEdit}
                  style={{
                    color: "black",
                    fontSize: "1.5rem",
                  }}
                  onClick={() => handleShowCategoryEdit(category)}
                />
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  style={{
                    color: "black",
                    fontSize: "1.5rem",
                  }}
                  onClick={() => handleCategoryDelete(category.id)}
                />
              </div>
            );
          })}
        </Card>
      </div>
      <Modal show={showCategoriesNew} onClose={handleClose}>
        <CategoriesNew updateCategories={updateCategories} />
      </Modal>
      <Modal show={showCategoryEdit} onClose={handleClose}>
        <CategoryEditForm
          category={selectedCategory}
          onSubmit={handleSubmitEditCategory}
          onCancel={handleCancel}
        />
      </Modal>
    </div>
  );
}
