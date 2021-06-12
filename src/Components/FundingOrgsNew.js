import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";
import { createFundingOrg } from "../Services/Organizations/FundingOrgsService";

export default function FundingOrgsNew(props) {
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const { onClose } = props;
  // const [errors, setErrors] = useState([]);
  const {
    currentOrganizationStore,
    currentOrganizationDispatch,
    organizationClient,
  } = useCurrentOrganizationContext();
  const currentOrganizationId =
    currentOrganizationStore.currentOrganization &&
    currentOrganizationStore.currentOrganization.id;

  const handleSubmit = (event) => {
    event.preventDefault();
    const newFundingOrg = {
      name: name,
      website: website,
      organization_id: currentOrganizationId,
    };
    if (currentOrganizationId) {
      createFundingOrg(organizationClient, newFundingOrg)
        .then((fundingOrg) => {
          if (fundingOrg) {
            props.updateFundingOrgs(fundingOrg);
            clearForm();
            onClose();
          }
        })
        .catch((error) => {
          console.log("funding org creation error", error);
        });
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    onClose();
  };

  const clearForm = () => {
    setName("");
    setWebsite("");
  };

  return (
    <Card className="card-dashboard">
      <Card.Header>Add Funding Org</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Funding Organization Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Website</Form.Label>
            <Form.Control
              type="text"
              name="website"
              value={website}
              onChange={(event) => setWebsite(event.target.value)}
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
              Save
            </Button>
            <Button
              style={{
                maxWidth: "50%",
                align: "center",
              }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </Form>
        <br />
      </Card.Body>
    </Card>
  );
}
