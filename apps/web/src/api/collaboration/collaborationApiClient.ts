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
  categoryId?: string;
};

type CreateWorkspaceCategoryRequest = {
  name: string;
  parentCategoryId?: string;
};

type GetWorkspaceThreadsResponse = {
  categories: { id: string; name: string; parentCategoryId?: string }[];
  threads: { id: string; name: string; categoryId?: string }[];
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

const getWorkspaceThreadsRequest = async (id: string): Promise<GetWorkspaceThreadsResponse> => {
  const response = await client.get(`${COLLABORATION_ROUTE}/private/workspace/${id}/threads`);
  return response.data;
};

const createWorkspaceThreadRequest = async (
  workspaceId: string,
  body: CreateWorkspaceThreadRequest,
) => {
  const response = await client.post(
    `${COLLABORATION_ROUTE}/private/workspace/${workspaceId}/thread`,
    body,
  );
  return response.data;
};

const createWorkspaceCategory = async (
  workspaceId: string,
  data: CreateWorkspaceCategoryRequest,
) => {
  const response = await client.post(
    `${COLLABORATION_ROUTE}/private/workspace/${workspaceId}/category`,
    data,
  );

  return response.data;
};

const requests = {
  getWorkspacesRequest,
  createWorkspaceRequest,
  getWorkspaceRequest,
  createWorkspaceThreadRequest,
  getWorkspaceThreadsRequest,
  createWorkspaceCategory,
};

export default requests;
