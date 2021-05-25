import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";
import { getAllBoilerplates } from "../Services/Organizations/BoilerplatesService";
import BoilerplatesTable from "./Boilerplates/BoilerplatesTable";
import unique from "../Helpers/unique";

const NO_SELECTED_CATEGORY = "none";

export default function Boilerplates(props) {
  const [loading, setLoading] = useState(true);
  const [boilerplates, setBoilerplates] = useState([]);
  const [selectedCategory, setSelectedCategory] =
    useState(NO_SELECTED_CATEGORY);
  const [selectedMaxWordCount, setSelectedMaxWordCount] = useState("");
  const { currentOrganizationStore, organizationClient } =
    useCurrentOrganizationContext();
  const currentOrganizationId =
    currentOrganizationStore.currentOrganization?.id;

  const handleChangeSelectedCategory = (event) =>
    setSelectedCategory(event.target.value);
  const handleChangeSelectedMaxWordCount = (event) =>
    setSelectedMaxWordCount(event.target.value);

  const markedBoilerplates = boilerplates.map((boilerplate) => {
    const maxWordCount = Number.parseInt(selectedMaxWordCount);
    const markedOnCategory =
      boilerplate.category_name.includes(selectedCategory) &&
      selectedCategory !== NO_SELECTED_CATEGORY;
    const markedOnMaxWordCount =
      boilerplate.wordcount <= maxWordCount && Number.isFinite(maxWordCount);

    return { ...boilerplate, markedOnCategory, markedOnMaxWordCount };
  });

  useEffect(() => {
    if (currentOrganizationId) {
      getAllBoilerplates(organizationClient)
        .then((boilerplates) => {
          setBoilerplates(boilerplates);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }, [organizationClient, currentOrganizationId]);

  if (loading) {
    return <h1 className="container">Loading....</h1>;
  }

  const categories = unique(
    boilerplates.map((boilerplate) => boilerplate.category_name).sort()
  );

  return (
    <div className="container">
      <h1>Boilerplates</h1>

      <Link to={`/organizations/${currentOrganizationId}/boilerplates-new/`}>
        <Button>Add Boilerplate</Button>
      </Link>

      <Form>
        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            value={selectedCategory}
            onChange={handleChangeSelectedCategory}
          >
            <option value={NO_SELECTED_CATEGORY}>Select Category</option>
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Max Word Count</Form.Label>
          <Form.Control
            type="text"
            placeholder="10"
            value={selectedMaxWordCount}
            onChange={handleChangeSelectedMaxWordCount}
          />
        </Form.Group>
      </Form>

      <BoilerplatesTable boilerplates={markedBoilerplates} />
    </div>
  );
}
