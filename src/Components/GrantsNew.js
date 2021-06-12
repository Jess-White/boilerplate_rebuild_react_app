import React, { useState, useEffect } from "react";
import FundingOrgsNew from "./FundingOrgsNew";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "./Elements/Modal";
import { Link } from "react-router-dom";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";
import { createGrant } from "../Services/Organizations/GrantsService";
import { getAllFundingOrgs } from "../Services/Organizations/FundingOrgsService";
import { useHistory } from "react-router-dom";

export default function GrantsNew(props) {
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [rfpUrl, setRfpUrl] = useState("");
  const [deadline, setDeadline] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [successful, setSuccessful] = useState("");
  const [purpose, setPurpose] = useState("");
  const [organizationId, setOrganizationId] = useState("");
  const [fundingOrgId, setFundingOrgId] = useState("");
  const [fundingOrgs, setFundingOrgs] = useState([]);
  const [errors, setErrors] = useState("");
  const history = useHistory();
  const {
    currentOrganizationStore,
    currentOrganizationDispatch,
    organizationClient,
  } = useCurrentOrganizationContext();
  const currentOrganizationId =
    currentOrganizationStore.currentOrganization &&
    currentOrganizationStore.currentOrganization.id;

  const [showFundingOrgsNew, setShowFundingOrgsNew] = useState(false);
  const handleClose = () => {
    setShowFundingOrgsNew(false);
  };
  const handleShowFundingOrgsNew = () => setShowFundingOrgsNew(true);

  useEffect(() => {
    if (currentOrganizationId) {
      getAllFundingOrgs(organizationClient)
        .then((fundingOrgs) => {
          setFundingOrgs(fundingOrgs);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    }
  }, [currentOrganizationId]);

  const clearForm = () => {
    setTitle("");
    setRfpUrl("");
    setDeadline("");
    setPurpose("");
    setOrganizationId("");
    setFundingOrgId("");
  };

  const handleCancelGrantNew = (event) => {
    event.preventDefault();
    history.push(`/organizations/${currentOrganizationId}/grants`);
  };

  const updateFundingOrgs = (newFundingOrg) => {
    const newFundingOrgs = [...fundingOrgs];
    newFundingOrgs.push(newFundingOrg);
    setFundingOrgs(newFundingOrgs);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newGrant = {
      title: title,
      rfp_url: rfpUrl,
      deadline: deadline,
      submitted: submitted,
      successful: successful,
      purpose: purpose,
      organization_id: currentOrganizationStore.currentOrganization.id,
      funding_org_id: fundingOrgId,
    };
    if (currentOrganizationId) {
      createGrant(organizationClient, newGrant)
        .then((grant) => {
          if (grant) {
            props.updateGrants(grant);
            clearForm();
          }
        })
        .catch((error) => {
          console.log("grant creation error", error);
        });
    }
  };

  return (
    <Card>
      <Link to={`/organizations/${currentOrganizationId}/grants/`}>
        <p>Back to Grants</p>
      </Link>
      <Modal show={showFundingOrgsNew} onClose={handleClose}>
        <FundingOrgsNew
          funding_orgs={fundingOrgs}
          updateFundingOrgs={updateFundingOrgs}
        />
      </Modal>
      <Card.Header>Add New Grant</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Funding Organization</Form.Label>
            <Form.Control
              as="select"
              name="fundingOrgId"
              value={fundingOrgId}
              onChange={(event) => setFundingOrgId(event.target.value)}
              required
            >
              <option value="" disabled>
                Funding Organization
              </option>
              {fundingOrgs.map((fundingOrg) => {
                return (
                  <option
                    key={fundingOrg.id}
                    value={fundingOrg.id}
                    onChange={(event) => setFundingOrgId(event.target.value)}
                  >
                    {fundingOrg.name}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleShowFundingOrgsNew}
          >
            Add New Funding Organization
          </Button>
          <br />
          <br />
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>RFP URL</Form.Label>
            <Form.Control
              name="rfpUrl"
              value={rfpUrl}
              onChange={(event) => setRfpUrl(event.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Deadline</Form.Label>
            <Form.Control
              type="datetime-local"
              name="deadline"
              value={deadline}
              onChange={(event) => setDeadline(event.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Purpose</Form.Label>
            <Form.Control
              name="purpose"
              value={purpose}
              onChange={(event) => setPurpose(event.target.value)}
              required
            />
          </Form.Group>
          <div>
            <Button
              type="submit"
              style={{
                maxWidth: "50%",
                align: "center",
              }}
              onClick={handleSubmit}
            >
              Save Changes
            </Button>
            <Button
              style={{
                maxWidth: "50%",
                align: "center",
              }}
              onClick={handleCancelGrantNew}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
