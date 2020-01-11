const User = require("./user");
const Cluster = require("./cluster");
const CustomDbRole = require("./customDbRole");
const ProjectWhitelist = require("./projectWhitelist");
const Project = require("./project");
const Organization = require("./organization");
const AtlasUser = require("./atlasUser");
const Event = require("./event");
const DigestFetch = require("digest-fetch");

function getMongodbAtlasApiClient(options) {
  const client = new DigestFetch(
    options.publicKey,
    options.privateKey,
    {}
  );
  const user = new User(client, options.baseUrl, options.projectId);
  const cluster = new Cluster(client, options.baseUrl, options.projectId);
  const customDbRole = new CustomDbRole(client, options.baseUrl, options.projectId);
  const projectWhitelist = new ProjectWhitelist(client, options.baseUrl, options.projectId);
  const project = new Project(client, options.baseUrl);
  const organization = new Organization(client, options.baseUrl);
  const atlasUser = new AtlasUser(client, options.baseUrl, options.projectId);
  const event = new Event(client, options.baseUrl, options.projectId);

  return {
    "user": {
      "get" : user.get.bind(user),
      "getAll": user.getAll.bind(user),
      "delete": user.delete.bind(user),
      "create": user.create.bind(user),
      "update": user.update.bind(user)
    },
    "atlasUser": {
      "getById" : atlasUser.getById.bind(atlasUser),
      "getByName" : atlasUser.getByName.bind(atlasUser),
      "getAll": atlasUser.getAll.bind(atlasUser),
      "create": atlasUser.create.bind(atlasUser),
      "update": atlasUser.update.bind(atlasUser)
    },
    "organization": {
      "getById" : organization.getById.bind(organization),
      "getAllUsersForOrganization" : organization.getAllUsersForOrganization.bind(organization),
      "getAllProjectsForOrganization" : organization.getAllProjectsForOrganization.bind(organization),
      "getAll": organization.getAll.bind(organization),
      "delete": organization.delete.bind(organization),
      "rename": organization.rename.bind(organization)
    },
    "project": {
      "getById" : project.getById.bind(project),
      "getByName" : project.getByName.bind(project),
      "getTeamsByProjectId" : project.getTeamsByProjectId.bind(project),
      "getAll": project.getAll.bind(project),
      "delete": project.delete.bind(project),
      "removeUserFromProject": project.removeUserFromProject.bind(project),
      "create": project.create.bind(project),
      "assignTeams": project.assignTeams.bind(project)
    },
    "projectWhitelist": {
      "get" : projectWhitelist.get.bind(projectWhitelist),
      "getAll": projectWhitelist.getAll.bind(projectWhitelist),
      "delete": projectWhitelist.delete.bind(projectWhitelist),
      "create": projectWhitelist.create.bind(projectWhitelist),
      "update": projectWhitelist.update.bind(projectWhitelist)
    },
    "customDbRole": {
      "get" : customDbRole.get.bind(customDbRole),
      "getAll": customDbRole.getAll.bind(customDbRole),
      "delete": customDbRole.delete.bind(customDbRole),
      "create": customDbRole.create.bind(customDbRole),
      "update": customDbRole.update.bind(customDbRole)
    },
    "cluster": {
      "get" : cluster.get.bind(cluster),
      "getAdvanceConfiguration": cluster.getAdvanceConfiguration.bind(cluster),
      "getAll": cluster.getAll.bind(cluster),
      "delete": cluster.delete.bind(cluster),
      "create": cluster.create.bind(cluster),
      "update": cluster.update.bind(cluster),
      "updateAdvanceConfiguration": cluster.updateAdvanceConfiguration.bind(cluster),
      "testPrimaryFailOver": cluster.testPrimaryFailOver.bind(cluster)
    },
    "event": {
      "get": event.get.bind(event),
      "getAll": event.getAll.bind(event),
      "getByOrganizationId": event.getByOrganizationId.bind(event),
      "getAllByOrganizationId": event.getAllByOrganizationId.bind(event)
    }
  }
}

module.exports = getMongodbAtlasApiClient;


