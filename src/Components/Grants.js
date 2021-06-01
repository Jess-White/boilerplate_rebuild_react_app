import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Moment from "react-moment";
import Form from "react-bootstrap/Form";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";
import { getAllGrants } from "../Services/Organizations/GrantsService";
import GrantsTable from "./Grants/GrantsTable";
import { TraversalOrder } from "@dnd-kit/core";
import formatGrantStatus, { Tab } from "../Helpers/formatGrantStatus";

export default function Grants() {
  const [loading, setLoading] = useState(true);
  const [grants, setGrants] = useState([]);
  const [filteredGrants, setFilteredGrants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterParam, setFilterParam] = useState("");
  const [sortParam, setSortParam] = useState("");
  const [selectedTab, setSelectedTab] = useState(Tab.DRAFT);
  const {
    currentOrganizationStore,
    currentOrganizationDispatch,
    organizationClient,
  } = useCurrentOrganizationContext();
  const currentOrganizationId =
    currentOrganizationStore.currentOrganization &&
    currentOrganizationStore.currentOrganization.id;

  const [show, setShow] = useState(false);

  const createUnzipped = (data) => {
    return data.map((filteredGrant) => {
      filteredGrant.isUnzipped = true;
      return filteredGrant;
    });
  };

  const toggleUnzipped = (id, bool) => {
    const alteredGrants = grants.map((grantKey) => {
      if (id === grantKey.id) {
        grantKey.isUnzipped = bool;
      }
      console.log(grantKey);
      return grantKey;
    });
    setFilteredGrants(alteredGrants);
  };

  console.log("grant render");

  useEffect(() => {
    window.scrollTo(0, 0);
    if (currentOrganizationId) {
      getAllGrants(organizationClient)
        .then((grants) => {
          setGrants(grants);
          const zippyGrants = createUnzipped(grants);
          setFilteredGrants(zippyGrants);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    }
  }, [currentOrganizationId]);

  const updateGrants = (newGrant) => {
    const newGrants = [...grants, newGrant];
    setFilteredGrants(newGrants);
  };

  useEffect(() => {}, [filteredGrants]);

  const handleSearchParamSelect = (event) => {
    setFilterParam(event.target.value);
  };

  const handleSortParamSelect = (event) => {
    setSortParam(event.target.value);
  };

  const sortGrants = (sortParam) => {
    const filteredGrantsClone = [...filteredGrants];
    filteredGrantsClone.sort(function (a, b) {
      return a[sortParam].localeCompare(b[sortParam]);
    });
    setFilteredGrants(filteredGrantsClone);
  };

  useEffect(() => {
    sortGrants(sortParam);
  }, [sortParam]);

  const handleChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchText(event.target.value);
    if (searchValue.length <= 0) {
      setFilteredGrants(grants);
      return;
    }
    if (filterParam === "filterTitle") {
      console.log(searchValue, "title filter");
      let filteredByTitle = [];
      filteredByTitle = grants.filter((grant) => {
        return grant.title.toLowerCase().indexOf(searchValue) !== -1;
      });
      setFilteredGrants(filteredByTitle);
      console.log(filteredByTitle);
    } else if (filterParam === "filterPurpose") {
      console.log(searchValue, "purpose filter");
      let filteredByPurpose = [];
      filteredByPurpose = grants.filter((grant) => {
        return grant.purpose.toLowerCase().indexOf(searchValue) !== -1;
      });
      setFilteredGrants(filteredByPurpose);
      console.log(filteredByPurpose);
    } else if (filterParam === "filterFundingOrg") {
      console.log(searchValue, "funding org");
      let filteredByFundingOrg = [];
      filteredByFundingOrg = grants.filter((grant) => {
        return grant.funding_org_name.toLowerCase().indexOf(searchValue) !== -1;
      });
      setFilteredGrants(filteredByFundingOrg);
      console.log(filteredByFundingOrg);
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDay();
    return `${month} ${day} ${year}`;
  };

  const formatFromNow = (fromNowString) => {
    var splitStr = fromNowString.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  };

  const selectedGrants = grants.filter((grant) => {
    const status = formatGrantStatus(grant);
    return selectedTab === status;
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
      <h1>Grants</h1>
      <Link to={`/organizations/${currentOrganizationId}/grants-new`}>
        <Button>Add A Grant</Button>
      </Link>
      <div>
        <Form>
          <Form.Group>
            <Form.Label>Search Parameter</Form.Label>
            <Form.Control
              as="select"
              name="filterParam"
              value={filterParam}
              onChange={handleSearchParamSelect}
              required
            >
              <option value="" disabled>
                Search By
              </option>
              <option value="filterPurpose">Purpose</option>
              <option value="filterTitle">Title</option>
              <option value="filterFundingOrg">Funding Org</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label></Form.Label>
            <Form.Control
              type="text"
              placeholder="Search text..."
              value={searchText}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Sort Parameter</Form.Label>
            <Form.Control
              as="select"
              name="sortParam"
              value={sortParam}
              onChange={handleSortParamSelect}
              required
            >
              <option value="" disabled>
                Sort By
              </option>
              <option value="purpose">Purpose</option>
              <option value="title">Title</option>
              <option value="funding_org_name">Funding Org</option>
            </Form.Control>
          </Form.Group>
        </Form>
        {Object.values(Tab).map((tab) => (
          <Button key={tab} onClick={() => setSelectedTab(tab)}>
            {tab}
          </Button>
        ))}
        <GrantsTable grants={selectedGrants} />
      </div>
    </div>
  );
}
