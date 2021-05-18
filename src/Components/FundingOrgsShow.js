import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "./Elements/Modal";
import { useHistory } from "react-router-dom";
import {
  getFundingOrg,
  updateFundingOrg,
  deleteFundingOrg,
} from "../Services/Organizations/FundingOrgsService";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";
import FundingOrgEditForm from "./FundingOrgs/FundingOrgEditForm";

//fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateGrant } from "../Services/Organizations/GrantsService";

library.add(faTrashAlt);
library.add(faEdit);

export default function FundingOrgsShow(props) {
  const [fundingOrg, setFundingOrg] = useState({});
  const [isHidden, setIsHidden] = useState(true);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const {
    currentOrganizationStore,
    currentOrganizationDispatch,
    organizationClient,
  } = useCurrentOrganizationContext();
  const currentOrganizationId =
    currentOrganizationStore.currentOrganization &&
    currentOrganizationStore.currentOrganization.id;

  const [newName, setNewName] = useState("");
  const [newWebsite, setNewWebsite] = useState("");

  const history = useHistory();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fundingOrgId = props.match.params.funding_org_id;
    if (currentOrganizationId) {
      getFundingOrg(organizationClient, fundingOrgId)
        .then((funding_org) => {
          setFundingOrg(funding_org);
          setNewName(fundingOrg.name);
          setNewWebsite(fundingOrg.website);
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

  const handleSubmit = ({ newName, newWebsite }) => {
    updateFundingOrg(organizationClient, id, {
      name: newName,
      website: newWebsite,
    })
      .then((fundingOrg) => {
        handleClose();
        setNewName(fundingOrg.name);
        setNewWebsite(fundingOrg.website);
        toggleHidden();
      })
      .catch((error) => {
        console.log("category update error", error);
      });
  };

  const handleCancel = (event) => {
    handleClose();
  };

  const handleFundingOrgDelete = () => {
    const fundingOrgId = props.match.params.funding_org_id;
    if (currentOrganizationId) {
      getFundingOrg(organizationClient, fundingOrgId)
        .then((fundingOrg) => {
          if (fundingOrg.message) {
            history.push(
              `/organizations/${currentOrganizationId}/funding_orgs`
            );
          }
        })
        .catch((error) => {
          console.log(error);
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

  const Header = (
    <Card.Header style={{ backgroundColor: "#09191b" }}>
      <h3
        style={{
          color: "#23cb87",
          fontWeight: "bolder",
          display: "inline",
        }}
      >
        Name: {fundingOrg.name}
      </h3>
      <FontAwesomeIcon
        icon={faEdit}
        style={{
          color: "#fefefe",
          fontSize: "1.5rem",
          marginLeft: "160px",
        }}
        onClick={handleShow}
      />
      <FontAwesomeIcon
        icon={faTrashAlt}
        style={{
          color: "#fefefe",
          fontSize: "1.5rem",
          marginLeft: "10px",
        }}
        onClick={handleFundingOrgDelete}
      />
    </Card.Header>
  );

  return (
    <div className="container">
      <Card>
        {Header}
        <Card.Body>
          <h3>Website: {fundingOrg.website}</h3>
        </Card.Body>
      </Card>
      <br />
      <div className="container">
        <Modal show={show} onClose={handleClose}>
          <Card>
            <Card.Body>
              <FundingOrgEditForm
                name={fundingOrg.name}
                website={fundingOrg.website}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
              />
            </Card.Body>
          </Card>
        </Modal>
      </div>
    </div>
  );
}
