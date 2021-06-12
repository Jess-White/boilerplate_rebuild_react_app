import axios from "axios";

export const updateOrganization = (organizationId, fieldsToUpdate) => {
  return axios
    .patch(
      `/api/organizations/${organizationId}`,
      fieldsToUpdate,
      {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      },
    )
    .then(response => response.data)
};

export const deleteOrganization = (organizationId) => {
  return axios
    .delete(`/api/organizations/${organizationId}`, {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    })
    .then(response => response.data)
};
