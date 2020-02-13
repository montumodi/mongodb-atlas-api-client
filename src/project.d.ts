import {Links, AtlasResultsResponse, AtlasClientOptions, AtlasError} from ".";
import {AtlasUserId} from "./atlasUser";

// ProjectClient
export type ProjectId = string;
export type ProjectName = string;
export interface GetProjectResponse {
    clusterCount: number;
    created: string;
    id: string;
    links: Links;
    name: string;
    orgId: string;
}
export type GetAllProjectsResponse = AtlasResultsResponse<GetProjectResponse>;
export interface CreateProjectRequest {
    name: string;
    orgId: string;
}
export type CreateProjectResponse = GetProjectResponse;
export interface GetTeamsByProjectResponse {
    links: Links;
    roleNames: string[];
    teamId: string;
}
export type ProjectRoleName = 'GROUP_OWNER' | 'GROUP_READ_ONLY' | 'GROUP_DATA_ACCESS_ADMIN' | 'GROUP_DATA_ACCESS_READ_WRITE' | 'GROUP_DATA_ACCESS_READ_ONLY';
export interface AssignTeamsRequest {
    teamId: string;
    roleNames: ProjectRoleName[]
}
export interface AssignTeamsResponse {
    links: Links;
    roleNames: string[];
    teamId: string;
}
export interface Project {
    getById(projectId: ProjectId, options?: AtlasClientOptions): Promise<GetProjectResponse | AtlasError>;
    getByName(projectName: ProjectName, options?: AtlasClientOptions): Promise<GetProjectResponse | AtlasError>;
    getTeamsByProjectId(projectId: ProjectId, options?: AtlasClientOptions): Promise<GetTeamsByProjectResponse | AtlasError>;
    getAll(options?: AtlasClientOptions): Promise<GetAllProjectsResponse | AtlasError>;
    delete(projectId: ProjectId, options?: AtlasClientOptions): Promise<void | AtlasError>;
    removeUserFromProject(projectId: ProjectId, userId: AtlasUserId, options?: AtlasClientOptions): Promise<void | AtlasError>;
    create(project: CreateProjectRequest, options?: AtlasClientOptions): Promise<GetProjectResponse>;
    assignTeams(projectId: ProjectId, teams: AssignTeamsRequest[], options?: AtlasClientOptions): Promise<AssignTeamsResponse | AtlasError>;
}