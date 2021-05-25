// getGrantSection
export const getGrantSection = (
  organizationClient,
  grantId,
  grantSectionId
) => {
  return organizationClient
    .get(`/grants/${grantId}/sections/${grantSectionId}`)
    .then((response) => response.data);
};

// listGrantSections

export const getAllGrantSections = (organizationClient, grantId) => {
  return organizationClient
    .get(`/grants/${grantId}/sections/`)
    .then((response) => response.data);
};

// deleteGrantSection

export const deleteGrantSection = (
  organizationClient,
  grantId,
  grantSectionId
) => {
  return organizationClient
    .delete(`/grants/${grantId}/sections/${grantSectionId}`)
    .then((response) => response.data);
};

// createGrantSection

export const createGrantSection = (
  organizationClient,
  grantId,
  newGrantSection
) => {
  return organizationClient
    .post(`/grants/${grantId}/sections/`, newGrantSection)
    .then((response) => response.data);
};

// updateGrantSection

export const updateGrantSection = (
  organizationClient,
  grantId,
  grantSectionId,
  fieldsToUpdate
) => {
  return organizationClient
    .patch(`/grants/${grantId}/sections/${grantSectionId}`, fieldsToUpdate)
    .then((response) => response.data);
};

export const reorderGrantSection = (
  organizationClient,
  grantId,
  grantSectionId,
  sortOrder
) => {
  return organizationClient
    .patch(`/grants/${grantId}/actions/reorder_section/${grantSectionId}`, {
      sort_order: sortOrder,
    })
    .then((response) => response.data);
};
