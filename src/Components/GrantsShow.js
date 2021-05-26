import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SectionsNew from "./SectionsNew";
import ReportsNew from "./ReportsNew";
import SectionsShow from "./SectionsShow";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import Modal from "./Elements/Modal";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";
import GrantEditForm from "./Grants/GrantEditForm";
import {
  getGrant,
  updateGrant,
  deleteGrant,
} from "../Services/Organizations/GrantsService";
import { reorderGrantSection } from "../Services/Organizations/Grants/GrantSectionsService";
import { getAllBoilerplates } from "../Services/Organizations/BoilerplatesService";
import SortableElement from "./Elements/SortableElement";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

//fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faTrashAlt);
library.add(faEdit);

export default function GrantsShow(props) {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [rfpUrl, setRfpUrl] = useState("");
  const [deadline, setDeadline] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [purpose, setPurpose] = useState("");
  const [organizationId, setOrganizationId] = useState("");
  const [fundingOrgId, setFundingOrgId] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [sections, setSections] = useState([]);
  const [reports, setReports] = useState([]);
  const [fundingOrgs, setFundingOrgs] = useState([]);
  const [grant, setGrant] = useState(null);
  const [bios, setBios] = useState([]);
  const [boilerplates, setBoilerplates] = useState([]);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState([]);
  const history = useHistory();

  const {
    currentOrganizationStore,
    currentOrganizationDispatch,
    organizationClient,
  } = useCurrentOrganizationContext();
  const currentOrganizationId =
    currentOrganizationStore.currentOrganization &&
    currentOrganizationStore.currentOrganization.id;

  const [newTitle, setNewTitle] = useState("");
  const [newRfpUrl, setNewRfpUrl] = useState("");
  const [newDeadline, setNewDeadline] = useState("");
  const [newSubmitted, setNewSubmitted] = useState(false);
  const [newSuccessful, setNewSuccessful] = useState(false);
  const [newPurpose, setNewPurpose] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = (event) => setShow(false);
  const handleShow = (event) => setShow(true);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    if (currentOrganizationId) {
      const grantId = props.match.params.grant_id;
      getGrant(organizationClient, grantId)
        .then((grant) => {
          setGrant(grant);
          setSections(grant.sections);
          setReports(grant.reports);
          setLoading(false);
          setNewTitle(grant.title);
          setNewRfpUrl(grant.rfp_url);
          setNewDeadline(grant.deadline);
          setNewSubmitted(grant.submitted);
          setNewSuccessful(grant.successful);
          setNewPurpose(grant.purpose);
        })
        .catch((error) => {
          console.log(error);
        });
      getAllBoilerplates(organizationClient)
        .then((boilerplates) => {
          setBoilerplates(boilerplates);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [currentOrganizationId, organizationClient]);

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
      organization_id: grant.organizationId,
      funding_org_id: grant.fundingOrgId,
    })
      .then((updatedGrant) => {
        handleClose();
        setGrant(updatedGrant);
      })
      .catch((error) => {
        console.log("grant update error", error);
      });
  };

  const handleCancel = (event) => {
    handleClose();
  };

  const addNewSections = (newSection) => {
    const newSections = [...sections];
    newSections.push(newSection);
    setSections(newSections);
  };

  const updateSections = (updatedSection) => {
    if (updatedSection.message) {
      const sections = sections.filter(
        (section) => section.id !== updatedSection.id
      );
      setSections(sections);
    } else {
      const sections = sections.map((section) => {
        if (section.id === updatedSection.id) {
          section = updatedSection;
        }
        return section;
      });
      setSections(sections);
    }
  };

  const updateReports = (newReport) => {
    const newReports = [...reports, newReport];
    setReports(newReports);
  };

  const handleGrantDelete = () => {
    const grantId = props.match.params.grant_id;
    deleteGrant(organizationClient, grantId)
      .then((grant) => {
        if (grant.message) {
          history.push(`/organizations/${currentOrganizationId}/grants`);
        }
        console.log(grant);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function handleDragEnd(event) {
    const { active, over } = event;
    if (active.id !== over.id) {
      setSections((sections) => {
        const oldIndex = sections.findIndex(
          (section) => section.id === active.id
        );
        const newIndex = sections.findIndex(
          (section) => section.id === over.id
        );
        return arrayMove(sections, oldIndex, newIndex);
      });

      const sectionId = active.id;
      const sortOrder = active.data.current.sortable.index;

      reorderGrantSection(organizationClient, grant.id, sectionId, sortOrder)
        .then((response) => {
          console.log(
            `Succesfully sorted section ${sectionId} to index ${sortOrder}!`,
            response
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  if (loading) {
    return (
      <div className="container">
        <h1>Loading....</h1>
      </div>
    );
  }

  const Header = (
    <Card.Header>
      <h3>{grant.title}</h3>
      <FontAwesomeIcon
        icon={faEdit}
        style={{
          color: "black",
          fontSize: "1.5rem",
        }}
        onClick={handleShow}
      />
    </Card.Header>
  );

  return (
    <div className="container">
      <Link to={`/organizations/${currentOrganizationId}/grants/`}>
        <p>Back to Grants</p>
      </Link>
      <Card>
        {Header}
        <Card.Body>
          <h4>Purpose: {grant.purpose}</h4>
          <h4>RFP URL: {grant.rfpUrl}</h4>
          <h4>Deadline: {grant.deadline}</h4>
          <h4>Submitted: {grant.submitted ? "yes" : "not yet"}</h4>
          <h4>Successful: {grant.successful ? "yes" : "not yet"}</h4>

          {/* beginning of grant update */}
          <div>
            <div>
              <Modal className="modal-popup" onClose={handleClose} show={show}>
                <Card>
                  <Card.Body>
                    <GrantEditForm
                      grant={grant}
                      onSubmit={handleSubmit}
                      onCancel={handleCancel}
                    />
                  </Card.Body>
                </Card>
              </Modal>
            </div>
          </div>
        </Card.Body>

        {/* end of grant update, beginning of sections and reports */}
        <Card.Body>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={sections}
              strategy={verticalListSortingStrategy}
            >
              <ol>
                {sections.map((section) => (
                  <SortableElement key={section.id} id={section.id}>
                    <SectionsShow
                      section_id={section.id}
                      grant_id={grant.id}
                      boilerplates={boilerplates}
                      updateSections={updateSections}
                    />
                  </SortableElement>
                ))}
              </ol>
            </SortableContext>
          </DndContext>
          <SectionsNew
            sort_number={sections.length}
            grant_id={grant.id}
            addNewSections={addNewSections}
          />
        </Card.Body>
        {/* reports */}

        <Card.Header>
          <h2>Reports:</h2>
        </Card.Header>
        <Card.Body>
          {grant.reports.length ? (
            grant.reports.map((report) => {
              return (
                <div key={report.id}>
                  <Link
                    to={`/organizations/${currentOrganizationId}/grants/${grant.id}/reports/${report.id}`}
                  >
                    <h4>{report.title}</h4>
                  </Link>
                  <h4>{report.deadline}</h4>
                  <h4>{report.submitted}</h4>
                </div>
              );
            })
          ) : (
            <h4>There are no reports yet.</h4>
          )}
          <ReportsNew
            sort_number={grant.sections.length}
            grant_id={grant.id}
            grant_title={grant.title}
            updateReports={updateReports}
          />
        </Card.Body>
      </Card>

      <Link
        to={`/organizations/${currentOrganizationId}/grants-finalize/${grant.id}/`}
      >
        <Button>Grant Finalize</Button>
      </Link>
      <Button variant="danger" onClick={handleGrantDelete}>
        Delete Grant
      </Button>
    </div>
  );
}
