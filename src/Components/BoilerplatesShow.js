import React, { useState, useEffect } from "react";
import { useFetcher, useResource } from "rest-hooks";
import Card from "react-bootstrap/Card";
import Modal from "./Elements/Modal";
import { Boilerplate } from "../resources";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";
import BoilerplateEditForm from "./Boilerplates/BoilerplateEditForm";
import {
  getBoilerplate,
  updateBoilerplate,
  deleteBoilerplate,
} from "../Services/Organizations/BoilerplatesService";
import countWords from "../Helpers/countWords";
import unique from "../Helpers/unique";
import { getAllCategories } from "../Services/Organizations/CategoriesService";

//fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faTrashAlt);
library.add(faEdit);

export default function BoilerplatesShow(props) {
  const [boilerplate, setBoilerplate] = useState({});
  const [quillText, setQuillText] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  const [wordcount, setWordcount] = useState("");

  const {
    currentOrganizationStore,
    currentOrganizationDispatch,
    organizationClient,
  } = useCurrentOrganizationContext();
  const currentOrganizationId =
    currentOrganizationStore.currentOrganization &&
    currentOrganizationStore.currentOrganization.id;

  // const boilerplate = useResource(
  //   Boilerplate.url({ id: props.match.params.boilerplate_id }),
  //   {}
  // );

  // const categories = unique(
  //   boilerplate.map((boilerplate) => boilerplate.category_name).sort()
  // );

  const [newTitle, setNewTitle] = useState("");
  const [newQuillText, setNewQuillText] = useState("");
  const [newCategoryId, setNewCategoryId] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (currentOrganizationId) {
      const boilerplateId = props.match.params.boilerplate_id;
      getBoilerplate(organizationClient, boilerplateId)
        .then((boilerplate) => {
          setBoilerplate(boilerplate);
          setQuillText(boilerplate.text);
          setNewTitle(boilerplate.title);
          setNewQuillText(boilerplate.text);
          setNewCategoryId(boilerplate.category_id);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
      getAllCategories(organizationClient)
        .then((categories) => {
          setCategories(categories);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    }
  }, [
    currentOrganizationId,
    organizationClient,
    props.match.params.boilerplate_id,
  ]);

  const handleSubmit = ({ newTitle, newQuillText, newCategoryId }) => {
    updateBoilerplate(organizationClient, boilerplate.id, {
      title: newTitle,
      text: newQuillText,
      category_id: newCategoryId,
      wordcount: countWords(newQuillText),
      organization_id: boilerplate.organization.id,
    })
      .then((boilerplate) => {
        handleClose();
        setBoilerplate(boilerplate);
        setNewTitle(boilerplate.title);
        setNewQuillText(boilerplate.text);
        setNewCategoryId(boilerplate.category_id);
      })
      .catch((error) => {
        console.log("boilerplate update error", error);
      });
    console.log("yo");
  };

  const handleCancel = (event) => {
    handleClose();
  };

  const handleBoilerplateDelete = () => {
    const boilerplateId = props.match.params.boilerplate_id;
    deleteBoilerplate(organizationClient, boilerplateId)
      .then((boilerplate) => {
        if (boilerplate.message) {
          history.push(`/organizations/${currentOrganizationId}/boilerplates`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (loading) {
    return (
      <div className="container">
        <h1>Loading....</h1>
      </div>
    );
  }

  const Header = (
    <Card.Header>
      <h3>{boilerplate.title}</h3>
      <Link
        to={`/organizations/${currentOrganizationId}/boilerplates-edit/${boilerplate.id}/`}
      >
        <FontAwesomeIcon
          icon={faEdit}
          style={{
            color: "black",
            fontSize: "1.5rem",
          }}
          // onClick={handleShow}
        />
      </Link>
      <FontAwesomeIcon
        icon={faTrashAlt}
        style={{
          color: "black",
          fontSize: "1.5rem",
        }}
        onClick={handleBoilerplateDelete}
      />
    </Card.Header>
  );

  return (
    <div className="flex-container">
      <Link to={`/organizations/${currentOrganizationId}/boilerplates/`}>
        <p>Back to Boilerplates</p>
      </Link>
      <Card>
        {Header}
        <Card.Body>
          <p>Category</p>
          <p>{boilerplate.category.name}</p>
          <p>Boilerplate Text</p>
          <p dangerouslySetInnerHTML={{ __html: quillText }}></p>
          <p>Word Count: {countWords(quillText)}</p>
        </Card.Body>
      </Card>
      <Modal show={show} onClose={handleClose}>
        <Card>
          <Card.Body>
            <BoilerplateEditForm
              title={boilerplate.title}
              quillText={quillText}
              categoryId={boilerplate.category_id}
              categories={categories}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          </Card.Body>
        </Card>
      </Modal>
    </div>
  );
}
