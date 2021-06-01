export const Tab = {
  ARCHIVED: "Archived",
  DRAFT: "Draft",
  SUBMITTED: "Submitted",
  SUCCESSFUL: "Successful",
};

export default function formatGrantStatus(grant) {
  if (grant.archived) {
    return Tab.ARCHIVED;
  } else if (grant.successful) {
    return Tab.SUCCESSFUL;
  } else if (grant.submitted) {
    return Tab.SUBMITTED;
  } else {
    return Tab.DRAFT;
  }
}
