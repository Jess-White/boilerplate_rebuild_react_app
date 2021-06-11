// getGrant
export const getGrant = (organizationClient, grantId) => {
  return organizationClient
    .get(`/grants/${grantId}`)
    .then((response) => response.data);
};

// listGrants

export const getAllGrants = (organizationClient) => {
  return organizationClient.get(`/grants/`).then((response) => response.data);
};

// deleteGrant

export const deleteGrant = (organizationClient, grantId) => {
  return organizationClient
    .delete(`/grants/${grantId}`)
    .then((response) => response.data);
};

// createGrant

export const createGrant = (organizationClient, newGrant) => {
  return organizationClient
    .post(`/grants/`, newGrant)
    .then((response) => response.data);
};

// updateGrant

export const updateGrant = (organizationClient, grantId, fieldsToUpdate) => {
  return organizationClient
    .patch(`/grants/${grantId}`, fieldsToUpdate)
    .then((response) => response.data);
};

// copyGrant

export const copyGrant = (organizationClient, grantId, copyGrantFields) => {
  return organizationClient
    .post(`/grants/${grantId}/copy`, copyGrantFields)
    .then((response) => response.data);
};
