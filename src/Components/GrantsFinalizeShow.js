import React, { useState, useEffect } from "react";
import axios from "axios";
import SectionsShow from "./SectionsShow";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";
import GrantFinalizeEditForm from "./Grants/GrantEditForm";
import {
  getGrant,
  updateGrant,
  createGrant,
} from "../Services/Organizations/GrantsService";
import { getAllBios } from "../Services/Organizations/BiosService";
import { getAllBoilerplates } from "../Services/Organizations/BoilerplatesService";

export default function GrantsFinalizeShow(props) {
  const [grant, setGrant] = useState("");
  // const [id, setId] = useState("");
  // const [title, setTitle] = useState("");
  // const [rfpUrl, setRfpUrl] = useState("");
  // const [deadline, setDeadline] = useState("");
  // const [submitted, setSubmitted] = useState(false);
  // const [successful, setSuccessful] = useState(false);
  // const [purpose, setPurpose] = useState("");
  // const [fundingOrgId, setFundingOrgId] = useState("");
  // const [sections, setSections] = useState([]);
  // const [reports, setReports] = useState([]);
  const [isHidden, setIsHidden] = useState(true);
  const [isCopyGrantHidden, setIsCopyGrantHidden] = useState(true);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [bios, setBios] = useState([]);
  const [boilerplates, setBoilerplates] = useState([]);
  const [copyTitle, setCopyTitle] = useState("");
  const [copyRfpUrl, setCopyRfpUrl] = useState("");
  const [copyDeadline, setCopyDeadline] = useState("");
  const [successfulCopy, setSuccessfulCopy] = useState(false);
  const [copiedGrantId, setCopiedGrantId] = useState("");
  const [showCopyModal, setShowCopyModal] = useState(false);

  const [newTitle, setNewTitle] = useState("");
  const [newRfpUrl, setNewRfpUrl] = useState("");
  const [newDeadline, setNewDeadline] = useState("");
  const [newSubmitted, setNewSubmitted] = useState(false);
  const [newSuccessful, setNewSuccessful] = useState(false);
  const [newPurpose, setNewPurpose] = useState("");

  const {
    currentOrganizationStore,
    currentOrganizationDispatch,
    organizationClient,
  } = useCurrentOrganizationContext();
  const currentOrganizationId =
    currentOrganizationStore.currentOrganization &&
    currentOrganizationStore.currentOrganization.id;

  const [show, setShow] = useState(false);
  const handleClose = (event) => setShow(false);
  const handleShow = (event) => setShow(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (currentOrganizationId) {
      const grantId = props.match.params.grant_id;
      getGrant(organizationClient, grantId).then((grant) => {
        const zippySections = createUnzipped(grant.sections);
        setGrant(grant);
        // setId(grant.id);
        // setTitle(grant.title);
        // setRfpUrl(grant.rfp_url);
        // setDeadline(grant.deadline);
        // setSubmitted(grant.submitted);
        // setSuccessful(grant.successful);
        // setPurpose(grant.purpose);
        // setOrganizationId(grant.organizion_id);
        // setOrganizationName(grant.organization_name);
        // setFundingOrgId(grant.funding_org_id);
        setSections(zippySections);
        // setReports(grant.reports);
        setLoading(false);
        setNewTitle(grant.title);
        setNewRfpUrl(grant.rfp_url);
        setNewDeadline(grant.deadline);
        setNewSubmitted(grant.submitted);
        setNewSuccessful(grant.successful);
        setNewPurpose(grant.purpose);
      });
      getAllBoilerplates(organizationClient).then((boilerplates) => {
        setBoilerplates(boilerplates);
      });
      getAllBios(organizationClient)
        .then((bios) => {
          setBios(bios);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [currentOrganizationId]);

  const createUnzipped = (sections) => {
    return sections.map((section) => {
      section.isUnzipped = false;
      return section;
    });
  };

  const toggleUnzipped = (id, bool) => {
    const alteredSections = sections.map((sectionKey) => {
      if (id === sectionKey.id) {
        sectionKey.isUnzipped = bool;
      }
      console.log(sectionKey);
      return sectionKey;
    });
    setSections(alteredSections);
  };

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  const toggleCopyGrantHidden = () => {
    setIsCopyGrantHidden(!isCopyGrantHidden);
  };

  const handleHideCopyModal = () => {
    setShowCopyModal(false);
  };

  const handleSubmit = ({
    newTitle,
    newRfpUrl,
    newDeadline,
    newSubmitted,
    newSuccessful,
    newPurpose,
  }) => {
    updateGrant(organizationClient, grant.id, {
      title: newTitle,
      rfp_url: newRfpUrl,
      deadline: newDeadline,
      submitted: newSubmitted,
      successful: newSuccessful,
      purpose: newPurpose,
      sections: [],
      organization_id: organizationId,
      funding_org_id: fundingOrgId,
    })
      .then((grant) => {
        toggleHidden();
        handleClose();
        setTitle(grant.title);
        setRfpUrl(grant.rfp_url);
        setDeadline(grant.deadline);
        setSubmitted(grant.submitted);
        setSuccessful(grant.successful);
        setPurpose(grant.purpose);
      })
      .catch((error) => {
        console.log("grant update error", error);
      });
  };

  const handleCancel = (event) => {
    handleClose();
  };

  const copyGrant = (event) => {
    event.preventDefault();
    if (currentOrganizationId) {
      createGrant(organizationClient, {
        original_grant_id: grant.id,
        title: copyTitle,
        rfp_url: copyRfpUrl,
        deadline: copyDeadline,
      })
        .then((grant) => {
          setCopiedGrantId(grant.id);
          setShowCopyModal(true);
          setSuccessfulCopy(true);
          toggleCopyGrantHidden();
        })
        .catch((error) => {
          console.log("grant copy error", error);
          setShowCopyModal(true);
          setSuccessfulCopy(false);
        });
    }
  };

  const handleSectionDelete = () => {
    axios
      .delete(
        `/api/organizations/${currentOrganizationId}/sections/` +
          props.section.id,
        {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateSections = (newSection) => {
    const sections = sections.map((section) => {
      if (section.id === newSection.id) {
        section.title = newSection.title;
        section.text = newSection.text;
        section.wordcount = newSection.wordcount;
      }
      return section;
    });
    setSections(sections);
  };

  if (loading) {
    return <h1>Loading....</h1>;
  }

  const Header = (
    <Card.Header>
      <h3>Grants Finalize Page - View Grant Draft, Make Final Edits</h3>
      <h3>{grant.title}</h3>
      <h3>{grant.purpose}</h3>
    </Card.Header>
  );

  return (
    <div className="component">
      {Header}
      <div>
        {/* beginning of grant update */}
        <div className="container">
          <br />
          {isHidden ? (
            <Button onClick={toggleHidden}>Update Grant</Button>
          ) : (
            <Button onClick={toggleHidden}>Close</Button>
          )}
          <br />
          {!isHidden ? (
            <div>
              <GrantFinalizeEditForm
                grant={grant}
                // title={grant.title}
                // rfpUrl={grant.rfpUrl}
                // deadline={grant.deadline}
                // submitted={grant.submitted}
                // successful={successful}
                // purpose={purpose}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
              />
            </div>
          ) : null}
        </div>
        {/* beginning of copy grant feature */}
        <Button onClick={toggleCopyGrantHidden}>Copy Grant</Button>
        {/* modal for grant copy confirm message */}
        <Modal show={showCopyModal} onHide={handleHideCopyModal}>
          <Modal.Header closeButton></Modal.Header>
          {successfulCopy ? (
            <Card>
              <Card.Body>
                <Alert variant="success">
                  <Alert.Heading>
                    Congrats! You've created a copy. View your copy
                    <Alert.Link
                      href={`/organizations/${currentOrganizationId}/grants/${copiedGrantId}`}
                    >
                      {" "}
                      here
                    </Alert.Link>
                    .
                  </Alert.Heading>
                </Alert>
              </Card.Body>
            </Card>
          ) : (
            <Card>
              <Alert variant="danger">
                <Alert.Heading>
                  Oops! You haven't created a copy. Please close this pop up and
                  try again.
                </Alert.Heading>
              </Alert>
            </Card>
          )}
        </Modal>
        {/* end of modal for grant copy confirm message */}
        <Card>
          {!isCopyGrantHidden ? (
            <Card.Body>
              <Form onSubmit={copyGrant}>
                <Form.Group>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="copyTitle"
                    value={copyTitle}
                    onChange={(event) => setCopyTitle(event.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>RFP URL</Form.Label>
                  <Form.Control
                    name="copyRfpUrl"
                    value={copyRfpUrl}
                    onChange={(event) => setCopyRfpUrl(event.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Deadline</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="copyDeadline"
                    value={copyDeadline}
                    onChange={(event) => setCopyDeadline(event.target.value)}
                    required
                  />
                </Form.Group>
                <Button type="submit">Create Copy</Button>
              </Form>
            </Card.Body>
          ) : null}
        </Card>
        {/* end of copy grant feature */}

        {sections.map((section) => {
          return (
            <div key={section.id}>
              <SectionsShow
                isUnzipped={section.isUnzipped}
                toggleUnzipped={toggleUnzipped}
                section_id={section.id}
                grant_id={grant.id}
                boilerplates={boilerplates}
                bios={bios}
                updateSections={updateSections}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
