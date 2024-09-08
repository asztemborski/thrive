import client from '@/api/client';

const ORGANIZATION_ROUTE = '/organization/v1';

type GetOrganizationsResponse = {
  id: string;
  name: string;
  description: string;
  iconUrl: string | null;
}[];

type GetOrganizationResponse = {
  id: string;
  name: string;
  description: string;
  iconUrl: string | null;
};

type CreateOrganizationRequest = {
  name: string;
  description: string;
};

const getOrganizationsRequest = async (): Promise<GetOrganizationsResponse> => {
  const response = await client.get(`${ORGANIZATION_ROUTE}/private/organization`);
  return response.data as GetOrganizationsResponse;
};

const getOrganizationRequest = async (id: string): Promise<GetOrganizationResponse> => {
  const response = await client.get(`${ORGANIZATION_ROUTE}/private/organization/${id}`);
  return response.data;
};

const createOrganizationRequest = async (body: CreateOrganizationRequest): Promise<string> => {
  const response = await client.post(`${ORGANIZATION_ROUTE}/private/organization`, body);
  return response.data;
};

const requests = {
  getOrganizationsRequest,
  createOrganizationRequest,
  getOrganizationRequest,
};

export default requests;
