import AuthenticatedResource from "./wrappers/AuthenticatedResource";

export default class Organization extends AuthenticatedResource {
  name = "";

  static urlRoot = "/api/organizations";
}

Organization.list();
// "/organizations/"
Organization.url({ id: 5 });
// "/organizations/5/"
