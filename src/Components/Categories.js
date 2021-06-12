import React, { useState, useEffect } from "react";
import CategoriesNew from "./CategoriesNew";
import Modal from "./Elements/Modal";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";
import { getAllCategories } from "../Services/Organizations/CategoriesService";
import {
  getCategory,
  updateCategory,
  deleteCategory,
} from "../Services/Organizations/CategoriesService";
import CategoriesTable from "./Categories/CategoriesTable";
import CategoryEditForm from "./Categories/CategoryEditForm";
//fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const NO_SELECTED_CATEGORY = "none";

library.add(faTrashAlt);
library.add(faEdit);

export default function Categories(props) {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [query] = useState("");
  const { currentOrganizationStore, organizationClient } =
    useCurrentOrganizationContext();
  const currentOrganizationId =
    currentOrganizationStore.currentOrganization?.id;

  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState({});

  const [showCategoriesNew, setShowCategoriesNew] = useState(false);
  const [showCategoryEdit, setShowCategoryEdit] = useState(false);
  const handleClose = () => {
    setShowCategoriesNew(false);
    setShowCategoryEdit(false);
  };
  const handleShowCategoriesNew = () => setShowCategoriesNew(true);
  const handleShowEditCategory = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
    setShowCategoryEdit(true);
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
    console.log("id from form", id);
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

  const handleDeleteCategory = (category) => {
    if (
      // eslint-disable-next-line no-restricted-globals
      confirm(`Are you sure you want to delete the ${category.name} category?`)
    ) {
      deleteCategory(organizationClient, category.id)
        .then((category) => {
          console.log("category deleted!");
        })
        .catch((error) => {
          console.log("category delete error", error);
        });
    }
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

          <Button onClick={handleShowCategoriesNew}>Add Category</Button>
        </Card>
      </div>
      <Modal show={showCategoriesNew}>
        <CategoriesNew
          updateCategories={updateCategories}
          onClose={handleClose}
        />
      </Modal>
      <Modal show={showCategoryEdit}>
        <CategoryEditForm
          category={selectedCategory}
          onSubmit={handleSubmitEditCategory}
          onCancel={handleCancel}
        />
      </Modal>
      <CategoriesTable
        categories={categories}
        onShowEditCategory={handleShowEditCategory}
        onDeleteCategory={handleDeleteCategory}
      />
    </div>
  );
}
