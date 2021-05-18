import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Modal from "../Elements/Modal";
import { useHistory } from "react-router-dom";
import { useCurrentOrganizationContext } from "../../Contexts/currentOrganizationContext";
import BioEditForm from "./BioEditForm";
import countWords from "../../Helpers/countWords";
import {
  getBio,
  updateBio,
  deleteBio,
} from "../../Services/Organizations/BiosService";

//fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faTrashAlt);
library.add(faEdit);

export default function BiosShow(props) {
  const [bio, setBio] = useState({});
  const [quillText, setQuillText] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [newQuillText, setNewQuillText] = useState("");
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newTitle, setNewTitle] = useState("");

  const {
    currentOrganizationStore,
    currentOrganizationDispatch,
    organizationClient,
  } = useCurrentOrganizationContext();
  const currentOrganizationId =
    currentOrganizationStore.currentOrganization &&
    currentOrganizationStore.currentOrganization.id;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const history = useHistory();

  useEffect(() => {
    if (currentOrganizationId) {
      const bioId = props.match.params.bio_id;
      getBio(organizationClient, bioId)
        .then((bio) => {
          setBio(bio);
          setQuillText(bio.text);
          setLoading(false);
          setNewQuillText(bio.text);
          setNewFirstName(bio.first_name);
          setNewLastName(bio.last_name);
          setNewTitle(bio.title);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [currentOrganizationId]);

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  const handleSubmit = ({
    newFirstName,
    newLastName,
    newTitle,
    newQuillText,
  }) => {
    updateBio(organizationClient, bio.id, {
      first_name: newFirstName,
      last_name: newLastName,
      title: newTitle,
      text: newQuillText,
      organization_id: currentOrganizationId,
      wordcount: countWords(newQuillText),
    })
      .then((bio) => {
        toggleHidden();
        handleClose();
        setNewQuillText(bio.text);
        setNewFirstName(bio.first_name);
        setNewLastName(bio.last_name);
        setNewTitle(bio.title);
      })
      .catch((error) => {
        console.log("bio update error", error);
      });
  };

  const handleCancel = (event) => {
    handleClose();
  };

  const handleBioDelete = () => {
    const bioId = props.match.params.bio_id;
    deleteBio(organizationClient, bioId)
      .then((bio) => {
        if (bio.message) {
          props.history.push(`/organizations/${currentOrganizationId}/bios`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
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

  if (loading) {
    return (
      <div className="container">
        <h1>Loading....</h1>
      </div>
    );
  }

  return (
    <div className="flex-container">
      <Card>
        <Card.Header style={{ backgroundColor: "#09191b" }}>
          <h3
            style={{
              color: "#fefefe",
              fontWeight: "bolder",
              display: "inline",
            }}
          >
            {bio.first_name} {bio.last_name}
          </h3>
          <h3
            style={{
              color: "#fefefe",
              fontWeight: "bolder",
              display: "inline",
            }}
          >
            {" "}
            |{" "}
          </h3>
          <h3
            style={{
              color: "#f4f4f4",
              fontWeight: "bold",
              display: "inline",
            }}
          >
            {bio.title}
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
            onClick={handleBioDelete}
          />
        </Card.Header>
        <Card.Body>
          <h4 dangerouslySetInnerHTML={{ __html: bio.text }}></h4>
          <h4>Organization: {bio.organization.name}</h4>
          <h4>Word Count: {countWords(bio.text)}</h4>
        </Card.Body>
      </Card>
      <div>
        <Modal show={show} onClose={handleClose}>
          <Card style={{ backgroundColor: "#09191b", color: "#fefefe" }}>
            <Card.Body>
              <BioEditForm
                bio={bio}
                // title={bio.title}
                // quillText={quillText}
                // firstName={bio.first_name}
                // lastName={bio.last_name}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
              />
            </Card.Body>
          </Card>
        </Modal>
      </div>
    </div>
  );
}
