import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { useCurrentUserContext } from "./Contexts/currentUserContext";
import { useCurrentOrganizationContext } from "./Contexts/currentOrganizationContext";

import React, { Component, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { PrivateRoute } from "./Components/Helpers/PrivateRoute";

import LandingPage from "./Components/LandingPage";

import Signup from "./Components/Signup";
import Login from "./Components/Login";
import ResetPassword from "./Components/ResetPassword";
import ForgotPassword from "./Components/ForgotPassword";

import OrgSelect from "./Components/OrgSelect";

import Dashboard from "./Components/Dashboard";
import Navigation from "./Components/Navigation";

import Header from "./Components/Header";
import Footer from "./Components/Footer";

import Boilerplates from "./Components/Boilerplates";
import Categories from "./Components/Categories";
import Organizations from "./Components/Organizations";
import Grants from "./Components/Grants";
// import Reports from './Components/Reports';

import FundingOrgs from "./Components/FundingOrgs";
// import Sections from './Components/Sections';
// import ReportSections from './Components/ReportSections';

import BoilerplatesShow from "./Components/BoilerplatesShow";
import FundingOrgsShow from "./Components/FundingOrgsShow";
import OrganizationsShow from "./Components/OrganizationsShow";
import GrantsShow from "./Components/GrantsShow";
import ReportsShow from "./Components/ReportsShow";
// import OrganizationUser from './Components/OrganizationUsers'

import GrantsFinalizeShow from "./Components/GrantsFinalizeShow";
import ReportsFinalizeShow from "./Components/ReportsFinalizeShow";

// import GrantsPrintableShow from './Components/GrantsPrintableShow';
// import ReportsPrintableShow from './Components/ReportsPrintableShow';

import BoilerplatesNew from "./Components/BoilerplatesNew";
import CategoriesNew from "./Components/CategoriesNew";
import FundingOrgsNew from "./Components/FundingOrgsNew";
import OrganizationsNew from "./Components/OrganizationsNew";
import GrantsNew from "./Components/GrantsNew";
import SectionsNew from "./Components/SectionsNew";
import ReportsNew from "./Components/ReportsNew";
// import ReportSectionsNew from './Components/ReportSectionsNew';

import BoilerplatesEdit from "./Components/BoilerplatesEdit";

export default function App() {
  const { currentUserStore, currentUserDispatch } = useCurrentUserContext();
  const { currentOrganizationStore, currentOrganizationDispatch } =
    useCurrentOrganizationContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        {/* <Header /> */}
        <Switch>
          <Route exact path="/">
            <Redirect to="/landing_page" />
          </Route>
          <Route path={"/landing_page"} component={LandingPage} />
          <Route path={"/signup"} component={Signup} />
          <Route path={"/login"} component={Login} />
          <Route path={"/reset_password"} component={ResetPassword} />
          <Route path={"/forgot_password"} component={ForgotPassword} />

          <PrivateRoute path={"/org_select"} component={OrgSelect} />

          <PrivateRoute path={"/dashboard"} component={Dashboard} />
          <PrivateRoute
            exact
            path={"/organizations/:org_id/grants"}
            component={Grants}
          />
          <PrivateRoute
            exact
            path={"/organizations/:org_id/grants/:grant_id"}
            component={GrantsShow}
          />
          <PrivateRoute
            exact
            path={"/organizations/:org_id/grants-finalize/:grant_id"}
            component={GrantsFinalizeShow}
          />
          <PrivateRoute
            exact
            path={"/organizations/:org_id/grants-new"}
            component={GrantsNew}
          />
          <PrivateRoute
            exact
            path={"/organizations/:org_id/grants/:grant_id/sections-new"}
            component={SectionsNew}
          />

          <PrivateRoute
            exact
            path={"/organizations/:org_id/grants/:grant_id/reports/:report_id"}
            component={ReportsShow}
          />
          <PrivateRoute
            exact
            path={
              "/organizations/:org_id/grants/:grant_id/reports-finalize/:report_id"
            }
            component={ReportsFinalizeShow}
          />

          <PrivateRoute
            exact
            path={"/organizations/:org_id/grants/:grant_id/reports-new"}
            component={ReportsNew}
          />
          <PrivateRoute
            exact
            path={"/organizations/:org_id/categories"}
            component={Categories}
          />
          <PrivateRoute
            exact
            path={"/organizations"}
            component={Organizations}
          />
          <PrivateRoute
            exact
            path={"/organizations/:org_id/funding_orgs"}
            component={FundingOrgs}
          />
          <PrivateRoute
            exact
            path={"/organizations/:org_id/boilerplates"}
            component={Boilerplates}
          />
          <PrivateRoute
            exact
            path={"/organizations/:org_id/boilerplates/:boilerplate_id"}
            component={BoilerplatesShow}
          />
          <PrivateRoute
            exact
            path={"/organizations/:org_id/boilerplates-edit/:boilerplate_id"}
            component={BoilerplatesEdit}
          />
          <PrivateRoute
            exact
            path={"/organizations/:org_id/funding_orgs/:funding_org_id"}
            component={FundingOrgsShow}
          />
          <PrivateRoute
            exact
            path={"/organizations/:org_id"}
            component={OrganizationsShow}
          />
          <PrivateRoute
            exact
            path={"/organizations/:org_id/boilerplates-new"}
            component={BoilerplatesNew}
          />
          <PrivateRoute
            exact
            path={"/organizations/:org_id/categories-new"}
            component={CategoriesNew}
          />
          <PrivateRoute
            exact
            path={"/organizations/:org_id/funding_orgs-new"}
            component={FundingOrgsNew}
          />
          <PrivateRoute
            exact
            path={"/organizations-new"}
            component={OrganizationsNew}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
