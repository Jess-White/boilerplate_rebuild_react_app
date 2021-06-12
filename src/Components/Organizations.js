import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap"
import { getUserOrganizations } from "../Services/UsersService";
import { updateOrganization, deleteOrganization } from "../Services/OrganizationsService";
import OrganizationsNew from "./OrganizationsNew";
import OrganizationEditForm from "./Organizations/OrganizationEditForm";
import Modal from "./Elements/Modal";
import "./Organizations.css"

export default function Organizations() {
  const [loading, setLoading] = useState(true);
  const [organizations, setOrganizations] = useState([]);
  const [showingNewOrganizationModal, setShowingNewOrganizationModal] = useState(false);
  const [showingEditOrganizationModal, setShowingEditOrganizationModal] = useState(false);
  const [editingOrganizationId, setEditingOrganizationId] = useState(null);

  useEffect(() => {
    setLoading(true);
    getUserOrganizations()
      .then((organizations) => {
        setOrganizations(organizations);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const openAddNewOrganizationModal = () => setShowingNewOrganizationModal(true);
  const closeAddNewOrganizationModal = () => setShowingNewOrganizationModal(false);

  const handleAddNewOrganization = (newOrganization) => {
    closeAddNewOrganizationModal();
  };

  const openEditOrganizationModal = () => setShowingEditOrganizationModal(true);
  const closeEditOrganizationModal = () => setShowingEditOrganizationModal(false);

  const handleClickEditOrganization = (organizationId) => {
    setEditingOrganizationId(organizationId);
    openEditOrganizationModal();
  };

  const handleEditOrganization = ({ newName }) => {
    setLoading(true);
    updateOrganization(editingOrganizationId, { name: newName })
      .then(() => {
        closeEditOrganizationModal();
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDeleteOrganization = (organizationId) => {
    /* eslint-disable-next-line no-restricted-globals */
    if (confirm("Are you sure you want to delete this organization?")) {
      setLoading(true);
      deleteOrganization(organizationId)
        .catch((error) => console.log(error))
        .finally(() => {
          setLoading(false);
        });
    }
  };

  if (loading) {
    return (
      <div className="container">
        <h1>Loading....</h1>
      </div>
    );
  }

  return (
    <Container className="Organizations">
      <Row>
        <Col md={8}>
          <h1>Organizations</h1>
          <b>Organization Name</b>
          <ul className="Organizations__List">
            {organizations.map(organization => (
              <li key={organization.id}>
                <Link to={`/organizations/${organization.id}`}>
                  {organization.name}
                </Link>
                <Button
                  variant="outline-dark"
                  onClick={() => handleDeleteOrganization(organization.id)}
                >
                  Delete
                </Button>
                <Button
                  variant="outline-dark"
                  onClick={() => handleClickEditOrganization(organization.id)}
                >
                  Edit
                </Button>
              </li>
            ))}
          </ul>
        </Col>
        <Col>
          <Button variant="dark" onClick={openAddNewOrganizationModal}>Add New Organization</Button>
        </Col>
      </Row>

      <Modal show={showingNewOrganizationModal}>
        <OrganizationsNew
          onSubmit={handleAddNewOrganization}
          onCancel={closeAddNewOrganizationModal}
        />
      </Modal>

      <Modal show={showingEditOrganizationModal}>
        <OrganizationEditForm
          onSubmit={handleEditOrganization}
          onCancel={closeEditOrganizationModal}
        />
      </Modal>
    </Container>
  );
}
