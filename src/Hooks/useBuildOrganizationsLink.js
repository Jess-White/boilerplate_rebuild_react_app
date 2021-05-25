import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";

export default function useBuildOrganizationsLink() {
  const { currentOrganizationStore } = useCurrentOrganizationContext();
  const currentOrganizationId = currentOrganizationStore.currentOrganization?.id;

  return (path) => {
    return `/organizations/${currentOrganizationId}${path}`;
  };
}