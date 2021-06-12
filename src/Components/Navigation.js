import React, { Component, useState } from "react";
import { withRouter, useHistory } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import { useHistory } from "react-router-dom";
import { useCurrentUserContext } from "../Contexts/currentUserContext";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";

function Navigation(props) {
  // const [currentUserStore] = useCurrentUserContext();
  const { currentUserStore, currentUserDispatch } = useCurrentUserContext();
  const { currentOrganizationStore, currentOrganizationDispatch } =
    useCurrentOrganizationContext();

  const history = useHistory();

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("org_id");
    props.history.push("/landing_page");
  };

  const handleChange = (event) => {
    const selectedOrgInfo =
      currentOrganizationStore.allUserOrganizations.filter(
        (userOrganization) => event.target.value == userOrganization.id
      );
    localStorage.setItem("org_id", selectedOrgInfo[0].id);
    currentOrganizationDispatch({
      type: "SET_CURRENT_ORGANIZATION",
      payload: {
        currentOrganization: selectedOrgInfo[0],
        jwt: currentUserStore?.jwt,
      },
    });
  };

  return (
    <Navbar
      bg="black"
      variant="dark"
      expand="lg"
      sticky="top"
      style={{
        paddingTop: "1rem",
        marginBottom: "0px",
        backgroundColor: "#0e272a",
      }}
    >
      <Nav>
        <div>
          {localStorage.token && localStorage.user_id ? (
            <div>
              <div>
                <Nav justify variant="tabs">
                  <Nav.Item className="active">
                    <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="active">
                    <Nav.Link href="/organizations">Organizations</Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="active">
                    <Nav.Link
                      href={`/organizations/${currentOrganizationStore.currentOrganization}
                                .id/grants`}
                    >
                      Grants
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link onClick={handleLogoutClick} to="/logout">
                      Logout
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
              {currentOrganizationStore?.currentOrganization?.id ? (
                <div>
                  <h3 style={{ color: "#fefefe" }}>
                    You are logged in as{" "}
                    {currentUserStore?.currentUser?.first_name} and working in{" "}
                    {currentOrganizationStore.currentOrganization.name}
                  </h3>
                  <Form className="justify-content-end">
                    <Form.Group>
                      <Form.Label>Change Organization</Form.Label>
                      <Form.Control
                        as="select"
                        name="organizationId"
                        value={
                          currentOrganizationStore.currentOrganization == null
                            ? "0"
                            : currentOrganizationStore.currentOrganization.id
                        }
                        onChange={handleChange}
                        required
                      >
                        <option value="0" disabled>
                          Change Organization
                        </option>
                        {currentOrganizationStore.allUserOrganizations?.map(
                          (userOrganization) => {
                            return (
                              <option
                                key={userOrganization.id}
                                value={userOrganization.id}
                              >
                                {userOrganization.name}
                              </option>
                            );
                          }
                        )}
                      </Form.Control>
                    </Form.Group>
                  </Form>
                </div>
              ) : null}
            </div>
          ) : (
            <div>
              <Button
                href="/signup"
                variant="outline-light"
                style={{
                  textColor: "#23cb87",
                  fontWeight: "bold",
                  display: "inline",
                  margin: "1rem",
                }}
              >
                Sign Up
              </Button>
              <Button
                href="/login"
                variant="outline-light"
                style={{
                  textColor: "#23cb87",
                  fontWeight: "bold",
                  display: "inline",
                  margin: "1rem",
                }}
              >
                Log In
              </Button>
            </div>
          )}
        </div>
      </Nav>
    </Navbar>
  );
}

export default withRouter(Navigation);
