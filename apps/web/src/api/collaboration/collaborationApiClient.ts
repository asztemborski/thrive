import client from '@/api/client';

const COLLABORATION_ROUTE = '/collaboration/v1';

type GetWorkspacesResponse = {
  id: string;
  name: string;
  description: string;
}[];

type GetWorkspaceRequest = {
  id: string;
  name: string;
  description: string;
};

type CreateWorkspaceRequest = {
  name: string;
  description: string;
};

type CreateWorkspaceThreadRequest = {
  name: string;
};

const getWorkspacesRequest = async (): Promise<GetWorkspacesResponse> => {
  const response = await client.get(`${COLLABORATION_ROUTE}/private/workspace`);
  return response.data as GetWorkspacesResponse;
};

const getWorkspaceRequest = async (id: string): Promise<GetWorkspaceRequest> => {
  const response = await client.get(`${COLLABORATION_ROUTE}/private/workspace/${id}`);
  return response.data;
};

const createWorkspaceRequest = async (body: CreateWorkspaceRequest): Promise<string> => {
  const response = await client.post(`${COLLABORATION_ROUTE}/private/workspace`, body);
  return response.data;
};

const createWorkspaceThreadRequest = async (
  workspaceId: string,
  body: CreateWorkspaceThreadRequest,
) => {
  const response = await client.post(
    `${COLLABORATION_ROUTE}/workspace/${workspaceId}/thread`,
    body,
  );
  return response.data;
};

const requests = {
  getWorkspacesRequest,
  createWorkspaceRequest,
  getWorkspaceRequest,
  createWorkspaceThreadRequest,
};

export default requests;
