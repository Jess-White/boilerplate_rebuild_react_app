import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "react-quill/dist/quill.snow.css";
import SectionToBoilerplateNew from "./SectionToBoilerplateNew";
import Modal from "./Elements/Modal";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";
import SectionEditForm from "./Sections/SectionEditForm";
import countWords from "../Helpers/countWords";
import { getAllBoilerplates } from "../Services/Organizations/BoilerplatesService";
import {
  getGrantSection,
  updateGrantSection,
  deleteGrantSection,
} from "../Services/Organizations/Grants/GrantSectionsService";

//fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faTrashAlt);
library.add(faEdit);

export default function SectionsShow(props) {
  const [quillText, setQuillText] = useState("");
  const [title, setTitle] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [isBoilerplateHidden, setIsBoilerplateHidden] = useState(true);
  const [isUnzipped, setIsUnzipped] = useState(true);
  const [wordcount, setWordcount] = useState("");
  const [grantId, setGrantId] = useState("");
  const [errors, setErrors] = useState([]);
  const [newQuillText, setNewQuillText] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newSortOrder, setNewSortOrder] = useState("");
  const [boilerplates, setBoilerplates] = useState([]);
  const [loading, setLoading] = useState(true);

  const [show, setShow] = useState(false);
  const handleClose = (event) => setShow(false);
  const handleShow = (event) => setShow(true);

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
      const grantId = props.grant_id;
      const sectionId = props.section_id;
      getGrantSection(organizationClient, grantId, sectionId).then(
        (section) => {
          console.log(section);
          setTitle(section.title);
          setQuillText(section.text);
          setWordcount(section.wordcount);
          setSortOrder(section.sort_order);
          setGrantId(section.grant_id);
          setNewQuillText(section.text);
          setNewTitle(section.title);
          setNewSortOrder(section.sort_order);
        }
      );
      getAllBoilerplates(organizationClient)
        .then((boilerplates) => {
          setBoilerplates(boilerplates);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [currentOrganizationId, organizationClient]);

  const toggleUnzipped = () => {
    setIsUnzipped(!isUnzipped);
  };

  const toggleBoilerplateHidden = () => {
    setIsBoilerplateHidden(!isBoilerplateHidden);
  };

  const handleSubmit = ({ newTitle, newQuillText, newSortOrder }) => {
    const grantId = props.grant_id;
    const sectionId = props.section_id;
    updateGrantSection(
      organizationClient,
      grantId,
      sectionId,
      {
        title: newTitle,
        text: newQuillText,
        sort_order: newSortOrder,
        wordcount: countWords(newQuillText),
        grant_id: grantId,
      },
      { headers: { Authorization: `Bearer ${localStorage.token}` } }
    )
      .then((section) => {
        if (section) {
          props.updateSections(section);
          handleClose();
          setNewQuillText(section.text);
          setNewTitle(section.title);
          setNewSortOrder(section.sort_order);
        }
      })
      .catch((error) => {
        console.log("grant section update error", error);
      });
  };

  const handleCancel = (event) => {
    handleClose();
  };

  const handleSectionDelete = () => {
    const grantId = props.match.params.grant_id;
    const sectionId = props.match.params.section_id;
    deleteGrantSection(organizationClient, grantId, sectionId)
      .then((section) => {
        if (section.message === "Section successfully destroyed") {
          props.updateSections(section);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      {isUnzipped === false ? (
        <Card>
          <Card.Body>
            <h5>{title}</h5>
            <h1 onClick={toggleUnzipped}>+</h1>
            <FontAwesomeIcon
              icon={faEdit}
              style={{
                color: "black",
                fontSize: "1.5rem",
              }}
              onClick={handleShow}
            />
          </Card.Body>
        </Card>
      ) : (
        <Card>
          <Card.Body>
            <h5>{title}</h5>
            <h1 onClick={toggleUnzipped}>-</h1>
            <FontAwesomeIcon
              icon={faEdit}
              style={{
                color: "black",
                fontSize: "1.5rem",
              }}
              onClick={handleShow}
            />
            <h5 dangerouslySetInnerHTML={{ __html: quillText }}></h5>
            <h5>wordcount: {countWords(quillText)}</h5>
          </Card.Body>
          <div className="container">
            {isBoilerplateHidden ? (
              <Button onClick={toggleBoilerplateHidden}>
                Save Section as Boilerplate
              </Button>
            ) : (
              <Button onClick={toggleBoilerplateHidden}>Close</Button>
            )}
            {!isBoilerplateHidden ? (
              <SectionToBoilerplateNew
                toggleBoilerplateHidden={toggleBoilerplateHidden}
                organization_id={props.organization_id}
                title={title}
                text={quillText}
              />
            ) : null}

            {/* Beginning of section update form */}
            <div></div>
          </div>
        </Card>
      )}
      <div>
        <Modal onClose={handleClose} show={show}>
          <Card>
            <Card.Body>
              <SectionEditForm
                title={title}
                quillText={quillText}
                boilerplates={boilerplates}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
              />
            </Card.Body>
          </Card>
        </Modal>
      </div>
      <br />
    </div>
  );
}
