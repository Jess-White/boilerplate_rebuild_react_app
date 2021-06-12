import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import { useCurrentOrganizationContext } from "../../Contexts/currentOrganizationContext";
import {
  copyGrant,
  getGrant,
} from "../../Services/Organizations/GrantsService";
import useBuildOrganizationsLink from "../../Hooks/useBuildOrganizationsLink";
import parseDateFromInput from "../../Helpers/parseDateFromInput";
import formatDateForInput from "../../Helpers/formatDateForInput";
import "./GrantCopy.css";

export default function GrantShow(props) {
  const [newGrantFields, setNewGrantFields] = useState({
    deadline: null,
    purpose: "",
    rfp_url: "",
    title: "",
  });
  const { organizationClient } = useCurrentOrganizationContext();
  const buildOrganizationsLink = useBuildOrganizationsLink();
  const { grant_id: grantId } = useParams();
  const history = useHistory();

  const handleChangeField = (field) => (event) => {
    event.preventDefault();

    const newValue =
      field === "deadline"
        ? parseDateFromInput(event.target.value)
        : event.target.value;

    setNewGrantFields((fields) => ({
      ...fields,
      [field]: newValue,
    }));
  };

  const handleCancel = (event) => {
    event.preventDefault();
    history.push(buildOrganizationsLink(`/grants/${grantId}`));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    copyGrant(organizationClient, grantId, newGrantFields)
      .then((copiedGrant) => {
        alert("Grant copied!");
        history.push(buildOrganizationsLink(`/grants/${copiedGrant.id}`));
      })
      .catch((error) => {
        console.error(error);
        alert(
          "Eek! Something went wrong when copying the grant. Try again soon."
        );
      });
  };

  useEffect(() => {
    if (!organizationClient) {
      return;
    }

    getGrant(organizationClient, grantId).then((grant) => {
      setNewGrantFields({
        deadline: new Date(grant.deadline),
        purpose: grant.purpose,
        rfp_url: grant.rfp_url,
        title: grant.title,
      });
    });
  }, [grantId, organizationClient]);

  return (
    <Container className="GrantCopy" as="section">
      <h1>Copy Grant</h1>

      <Form onSubmit={handleSubmit}>
        <div className="GrantCopy__Inputs">
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={newGrantFields.title}
              onChange={handleChangeField("title")}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>RFP URL</Form.Label>
            <Form.Control
              value={newGrantFields.rfp_url}
              onChange={handleChangeField("rfp_url")}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Deadline</Form.Label>
            <Form.Control
              type="datetime-local"
              value={
                newGrantFields.deadline
                  ? formatDateForInput(newGrantFields.deadline)
                  : ""
              }
              onChange={handleChangeField("deadline")}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Purpose</Form.Label>
            <Form.Control
              value={newGrantFields.purpose}
              onChange={handleChangeField("purpose")}
              required
            />
          </Form.Group>
        </div>

        <div className="GrantCopy__Actions">
          <Button variant="outline-dark" size="lg" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="dark" size="lg" type="submit">
            Copy
          </Button>
        </div>
      </Form>
    </Container>
  );
}
