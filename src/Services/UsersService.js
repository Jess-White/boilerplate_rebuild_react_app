import axios from "axios";

export const getUserOrganizations = (_userId) => {
  return axios
    .get("/api/organizations", {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    })
    .then(response => response.data)
};