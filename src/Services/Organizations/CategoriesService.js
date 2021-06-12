// getCategory
export const getCategory = (organizationClient, categoryId) => {
  return organizationClient
    .get(`/categories/${categoryId}`)
    .then((response) => response.data);
};

// listCategories

export const getAllCategories = (organizationClient) => {
  return organizationClient
    .get(`/categories/`)
    .then((response) => response.data);
};

// deleteCategory

export const deleteCategory = (organizationClient, categoryId) => {
  return organizationClient
    .delete(`/categories/${categoryId}`)
    .then((response) => response.data);
};

// createCategory

export const createCategory = (organizationClient, newCategory) => {
  return organizationClient
    .post(`/categories/`, newCategory)
    .then((response) => response.data);
};

// updateCategory

export const updateCategory = (
  organizationClient,
  categoryId,
  fieldsToUpdate
) => {
  return organizationClient
    .patch(`/categories/${categoryId}`, fieldsToUpdate)
    .then((response) => response.data);
};
