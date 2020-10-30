import React, { Component } from 'react';
import GrantsNew from './GrantsNew';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

class Grants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      grants: [],
      query: '',
    };
  }
  componentDidMount() {
    axios
      .get('/api/grants')
      .then((response) => {
        this.setState({
          grants: response.data,
          loading: false,
        });
      console.log(response.data);
      })
      .catch((error) => console.log(error));
  }
  
  updateGrants = (newGrant) => {
		const grants = this.state.grants;
		grants.push(newGrant);
		this.setState({
			grants: grants,
		});
	};

  render() {
    if (this.state.loading) {
      return <h1>Loading....</h1>;
    };

    return (
      <div className="component">
        {this.state.grants.map((grant) => {
          return (
            <Card key={grant.id}>
              <Card.Header> 
                <Link
									to={`/grants/${grant.id}`}
								>
									{grant.title}
								</Link>
              </Card.Header>
                <Card.Body>
                  <p>Purpose: {grant.purpose}</p>
                  <p>Funding Organization: {grant.funding_org_name}</p>
                  <p>RFP URL: {grant.rfp_url}</p>
                  <p>Deadline: {grant.deadline}</p>
                  <p>Submitted: {grant.submitted}</p>
                  <p>Successful: {grant.successful}</p>
                  <p>Organization Name: {grant.organization_name}</p>
                </Card.Body>
            </Card>
          );
        })}

        <GrantsNew 
          updateGrants={this.updateGrants}
        />
        
      </div>
    );
  }
}

export default Grants;
