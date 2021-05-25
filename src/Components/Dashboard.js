import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import { useCurrentUserContext } from "../Contexts/currentUserContext";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";
import { useHistory } from "react-router-dom";

export default function Dashboard() {
  const { currentUserStore, currentUserDispatch } = useCurrentUserContext();
  const { currentOrganizationStore, currentOrganizationDispatch } =
    useCurrentOrganizationContext();
  console.log(currentUserStore);
  console.log(currentOrganizationStore);
  const history = useHistory();
  const currentOrganizationId = currentOrganizationStore.currentOrganization?.id

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="d-flex container-fluid flex-column align-items-stretch"
      style={{ paddingLeft: "5rem", paddingRight: "5rem" }}
    >
      <div className="flex-row row" style={{ paddingBottom: ".5rem" }}>
        <div className="w-100">
          <h1>Welcome, {currentUserStore?.currentUser?.first_name}</h1>
        </div>
      </div>
      <div className="d-flex flex-row row">
        <Card
          className="card-component"
          onClick={() => {
            history.push(`organizations/${currentOrganizationId}/grants/`);
          }}
        >
          <Card.Header>Grants &gt;</Card.Header>
          <Card.Body>
            Store draft grants and submitted grants in this library. Sort grants
            by purpose, funding organization, and funding award. Start a new
            grant.
            <br />
          </Card.Body>
        </Card>
      </div>
      <div className="d-flex flex-row row">
        <div
          className="col align-items-stretch"
          style={{ paddingRight: "3rem" }}
        >
          <div className="row h-50">
            <Card
              className="card-component"
              onClick={() => {
                history.push(
                  `organizations/${currentOrganizationId}/boilerplates/`
                );
              }}
            >
              <Card.Header>Boilerplates &gt;</Card.Header>
              <Card.Body>
                Store materials for your organization in this library. Save
                information about your mission, programs, metrics, client
                communities, and activities in accessible text blocks.
                <br />
              </Card.Body>
            </Card>
          </div>
        </div>
        <div className="col align-items-stretch">
          <div className="row">
            <Card
              className="card-component"
              onClick={() => {
                history.push(
                  `organizations/${currentOrganizationId}/funding_orgs/`
                );
              }}
            >
              <Card.Header>Funding Organizations &gt;</Card.Header>
              <Card.Body>
                Store funding organizations that you have applied to in the
                past, so that you can track applications, requests for
                proposals, and funding streams over time.
                <br />
              </Card.Body>
            </Card>
          </div>
          <div className="row">
            <Card
              className="card-component"
              onClick={() => {
                history.push(
                  `organizations/${currentOrganizationId}/categories/`
                );
              }}
            >
              <Card.Header>Categories &gt;</Card.Header>
              <Card.Body>
                Store a list of categories for stored content, so that you can
                customize your content library for your organization.
                <br />
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
