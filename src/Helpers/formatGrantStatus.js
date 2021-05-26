export default function formatGrantStatus(grant) {
  if (grant.archived) {
    return "Archived";
  } else if (grant.successful) {
    return "Successful";
  } else if (grant.submitted) {
    return "Submitted";
  } else {
    return "Draft";
  }
}
