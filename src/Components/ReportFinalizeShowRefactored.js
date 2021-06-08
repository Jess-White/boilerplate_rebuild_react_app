import React, { useState, useEffect, useCallback } from "react";
import { Container, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";
import * as GrantReportsService from "../Services/Organizations/Grants/GrantReportsService";
import { createReportSection } from "../Services/Organizations/Grants/Reports/ReportSectionsService";
import formatDate from "../Helpers/formatDate";
// import countSectionWords from "../Helpers/countSectionWords";
import countTotalSectionsWords from "../Helpers/countTotalSectionsWords";
import countWords from "../Helpers/countSectionWords";
import ReportSectionsShow from "./ReportSectionsShow";
import ReportSectionForm from "./ReportSections/SectionForm";
// import "./ReportsFinalizeShow.css";

// function countTotalSectionsWords(sections = []) {
//   return sections?.reduce(
//     (total, section) => total + countSectionWords(section),
//     0
//   );
// }

export default function ReportsFinalizeShow(props) {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [newSectionIndex, setNewSectionIndex] = useState(null);
  const { currentOrganizationStore, organizationClient } =
    useCurrentOrganizationContext();
  const totalWordCount = countTotalSectionsWords(grant?.sections);
  const currentOrganizationId =
    currentOrganizationStore.currentOrganization?.id;
  const { grant_id: grantId } = useParams();

  const getGrantReport = useCallback(() => {
    if (!organizationClient) {
      return;
    }
    GrantReportsService.getGrantReport(organizationClient, grantId, reportId)
      .then((report) => setReport(report))
      .catch((error) => setErrors([error]))
      .finally(() => setLoading(false));
  }, [organizationClient, reportId]);

  const handleSubmitReportSectionForm = ({
    newSectionReportFields,
    precedingReportSection,
  }) => {
    createReportSection(organizationClient, reportId, {
      title: newSectionReportFields.title,
      text: newSectionReportFields.html,
      report_id: reportId,
      sort_order: precedingReportSection.sort_order + 1,
      wordcount: countWords(newReportSectionFields.text),
    }).then(() => {
      alert("Report Section created!");
      setNewReportSectionIndex(null);
      return getGrantReport();
    });
  };

  useEffect(() => {
    getReport();
  }, [getReport]);

  if (errors.length) {
    console.error(errors);
    return <p>Error! {errors.map((error) => error.message)}</p>;
  } else if (loading) {
    return <h1>Loading....</h1>;
  }

  return (
    <Container className="ReportsFinalizeShow" fluid>
      <div className="ReportsFinalizeShow__TopBar">
        <Link
          to={`/organizations/${currentOrganizationId}/grants/grant_id/reports`}
        >
          &lt; Back to All Reports
        </Link>
      </div>

      <section className="ReportsFinalizeShow__Overview">
        <header className="ReportsFinalizeShow__Header">
          <h1 className="ReportsFinalizeShow__Title">{report.title}</h1>
          <div className="ReportsFinalizeShow__Actions">
            <Link
              className="ReportsFinalizeShow__MakeCopy"
              to={`/organizations/${currentOrganizationId}/grants/${report.grant.id}/reports/${report.id}copy`}
            >
              Make a Copy
            </Link>
            <Link
              className="btn btn-outline-dark"
              to={`/organizations/${currentOrganizationId}/grants/${grant.id}/reports/${report.id}/edit`}
            >
              Edit
            </Link>
          </div>
        </header>
        <dl className="ReportsFinalizeShow__Fields">
          <div className="ReportsFinalizeShow__Deadline">
            <dt>Deadline:&nbsp;</dt>
            <dd>{formatDate(report.deadline)}</dd>
          </div>
        </dl>
      </section>

      <hr />

      <section>
        <p className="ReportsFinalizeShow__TotalWordCount">
          Total word count: <span>{totalWordCount}</span>
        </p>

        <ol className="ReportsFinalizeShow__SectionList">
          {report.report_sections?.map((report_section) => (
            <React.Fragment key={report_section.id}>
              <ReportSectionsShow report_section={report_section} />
              {newReportSectionIndex === report_section.id && (
                <ReportSectionForm
                  onSubmit={(newReportSectionFields) =>
                    handleSubmitReportSectionForm({
                      newReportSectionFields,
                      precedingReportSection: report_section,
                    })
                  }
                  onCancel={() => setNewReportSectionIndex(null)}
                />
              )}
              <Button
                className="ReportsFinalizeShow__AddSection"
                onClick={() => setNewReportSectionIndex(report_section.id)}
              >
                Add Section
              </Button>
            </React.Fragment>
          ))}
        </ol>
      </section>
    </Container>
  );
}
