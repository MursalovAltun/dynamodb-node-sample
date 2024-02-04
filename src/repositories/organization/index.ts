import { Organization } from "../../models";

export interface OrganizationRepository {
  create: (name: string) => Promise<Organization>;

  getById: (id: string) => Promise<Organization>;
}
