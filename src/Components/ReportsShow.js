import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReportSectionsNew from "./ReportSectionsNew";
import ReportSectionsShow from "./ReportSectionsShow";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";
import ReportEditForm from "./Reports/ReportEditForm";
import {
  getGrantReport,
  updateGrantReport,
  deleteGrantReport,
} from "../Services/Organizations/Grants/GrantReportsService";
import { getAllBios } from "../Services/Organizations/BiosService";
import { getAllBoilerplates } from "../Services/Organizations/BoilerplatesService";

//fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faTrashAlt);
library.add(faEdit);

export default function ReportsShow(props) {
  console.log("reports Show component rendered");
  const [id, setId] = useState(props.match.params.report_id);
  const [grantId, setGrantId] = useState(props.match.params.grant_id);
  // const [title, setTitle] = useState("");
  // const [deadline, setDeadline] = useState("");
  // const [submitted, setSubmitted] = useState("");
  const [bios, setBios] = useState([]);
  const [boilerplates, setBoilerplates] = useState([]);
  const [isHidden, setIsHidden] = useState(true);
  const [isGrantHidden, setIsGrantHidden] = useState(true);
  const [isHiddenNewReportSection, setIsHiddenNewReportSection] = useState(
    true
  );
  const [grantTitle, setGrantTitle] = useState("");
  const [grantSections, setGrantSections] = useState([]);
  const [reportSections, setReportSections] = useState([]);
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

  const [newTitle, setNewTitle] = useState("");
  const [newDeadline, setNewDeadline] = useState("");
  const [newSubmitted, setNewSubmitted] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (currentOrganizationId) {
      const grantId = props.match.params.grant_id;
      const reportId = id;
      getGrantReport(organizationClient, grantId, reportId)
        .then((report) => {
          setReportSections(report));
          // setId(report.id);
          // setGrantId(report.grant_id);
          // setTitle(report.title);
          // setDeadline(report.deadline);
          // setSubmitted(report.submitted);
          setReportSections(report.report_sections);
          setGrantSections(report.grant.grant_sections);
          setLoading(false);
          setNewTitle(report.title);
          setNewDeadline(report.deadline);
          setNewSubmitted(report.submitted);
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

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  const toggleHiddenGrant = () => {
    setIsGrantHidden(!isGrantHidden);
  };

  const toggleHiddenNewReportSection = () => {
    setIsHiddenNewReportSection(!isHiddenNewReportSection);
  };

  const handleSubmit = ({ newTitle, newDeadline, newSubmitted }) => {
    const grantId = props.match.params.grant_id;
    const reportId = props.match.params.report_id;
    updateGrantReport(
      organizationClient,
      grantId,
      reportId,
      {
        grant_id: grantId,
        title: newTitle,
        deadline: newDeadline,
        submitted: newSubmitted,
      },
      { headers: { Authorization: `Bearer ${localStorage.token}` } }
    )
      .then((report) => {
        toggleHidden();
        setNewTitle(report.title);
        setNewDeadline(report.deadline);
        setNewSubmitted(report.submitted);
      })
      .catch((error) => {
        console.log("report update error", error);
      });
  };

  const handleCancel = (event) => {
    setNewTitle(title);
    setNewDeadline(deadline);
    setNewSubmitted(submitted);
    handleClose();
  };

  const updateReportSections = (newReportSection) => {
    let newReportSections = [...reportSections, newReportSection];
    setReportSections(newReportSections);
  };

  useEffect(() => {}, [reportSections]);

  const editReportSections = (editedReportSection) => {
    const newReportSections = reportSections.map((reportSection) => {
      if (reportSection.id === editedReportSection.id) {
        reportSection = editedReportSection;
      }
      return reportSection;
    });
    setReportSections(newReportSections);
  };

  const deleteReportSections = (deletedReportSection) => {
    let newReportSections = [...reportSections];
    let newArr = [];
    newReportSections.forEach((newReportSection) => {
      if (newReportSection.id !== deletedReportSection.id) {
        newArr.push(newReportSection);
      }
    });
    console.log(newArr);
    setReportSections(newArr);
  };

  const handleReportDelete = () => {
    const grantId = props.match.params.grant_id;
    const reportId = props.match.params.report_id;
    deleteGrantReport(organizationClient, grantId, reportId)
      .then((report) => {
        if (report.message) {
          history.push("/grants/" + grantId);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderedSections = grantSections.map((grant_section) => {
    return (
      <div key={grant_section.id}>
        <h3>{grant_section.title}</h3>
        <h3 dangerouslySetInnerHTML={{ __html: grant_section.text }}></h3>
        <h3>{grant_section.wordcount}</h3>
      </div>
    );
  });

  if (loading) {
    return (
      <div className="container">
        <h1>Loading....</h1>
      </div>
    );
  }

  return (
    <div className="component container">
      <h1>Report Show - Build Draft Report Sections</h1>
      <Card>
        <Card.Header>
          <h2>{report.title}</h2>
        </Card.Header>
        <Card.Body>
          <h3>Deadline: {report.deadline}</h3>
          <h3>Submitted: {report.submitted ? "yes" : "not yet"}</h3>
        </Card.Body>
      </Card>

      {/* Associated grant */}

      <Button onClick={toggleHiddenGrant}>Show Associated Grant</Button>
      <Button onClick={toggleHidden}>Update Report</Button>

      {!isGrantHidden ? (
        <Card>
          <Card.Header>
            <h1>Associated Grant</h1>
            <h2>{grantTitle}</h2>
          </Card.Header>

          <Card.Body>{renderedSections}</Card.Body>
        </Card>
      ) : null}

      {/* beginning of report update */}

      <div className="container">
        <br />
        <br />
        {!isHidden ? (
          <Card>
            <Card.Body>
              <ReportEditForm
                title={report.title}
                deadline={report.deadline}
                submitted={report.submitted}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
              />
            </Card.Body>
          </Card>
        ) : null}
      </div>

      {/* New report section */}

      <ReportSectionsNew
        report_id={id}
        grant_id={props.grant_id}
        sort_number={reportSections.length}
        updateReportSections={updateReportSections}
      />
      <br />

      {/* Report sections */}

      <Card>
        <Card.Header>
          <h3>Report Sections:</h3>
        </Card.Header>
        <Card.Body>
          {reportSections?.length ? (
            reportSections.map((reportSection) => {
              return (
                <div key={reportSection.id}>
                  <ReportSectionsShow
                    report_id={id}
                    grant_id={props.grant_id}
                    report_section_id={reportSection.id}
                    editReportSections={editReportSections}
                    deleteReportSections={deleteReportSections}
                  />
                </div>
              );
            })
          ) : (
            <h4>There are no report sections yet.</h4>
          )}
        </Card.Body>
      </Card>
      <br />

      <Link
        to={`/organizations/${currentOrganizationStore.currentOrganization.id}/grants/${grantId}/reports-finalize/${id}`}
      >
        <Button>Report Finalize</Button>
      </Link>

      <Button variant="danger" onClick={handleReportDelete}>
        Delete Report
      </Button>
    </div>
  );
}
