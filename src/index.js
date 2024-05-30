import User from "./user.js";
import CloudBackup from "./cloudBackup.js";
import Cluster from "./cluster.js";
import CustomDbRole from "./customDbRole.js";
import ProjectWhitelist from "./projectWhitelist.js";
import ProjectAccesslist from "./projectAccesslist.js";
import Project from "./project.js";
import Organization from "./organization.js";
import AtlasUser from "./atlasUser.js";
import Event from "./event.js";
import Alert from "./alert.js";
import DataLake from "./dataLake.js";
import CloudProviderAccess from "./cloudProviderAccess.js";
import AtlasSearch from "./atlasSearch.js";
import urllibClient from "urllib";
import HttpClient from "./httpClient.js";

function getFunctions(instance) {
  const functions = {};
  Object.getOwnPropertyNames(Object.getPrototypeOf(instance))
    .filter(name => name !== "constructor")
    .forEach(functionName => {
      functions[functionName] = instance[functionName].bind(instance);
    });
  return functions;
}


function getMongodbAtlasApiClient(options) {

  const client = new HttpClient(urllibClient, options.publicKey, options.privateKey);
  const user = new User(client, options.baseUrl, options.projectId);
  const cluster = new Cluster(client, options.baseUrl, options.projectId);
  const cloudBackup = new CloudBackup(client, options.baseUrl, options.projectId);
  const customDbRole = new CustomDbRole(client, options.baseUrl, options.projectId);
  const projectWhitelist = new ProjectWhitelist(client, options.baseUrl, options.projectId);
  const projectAccesslist = new ProjectAccesslist(client, options.baseUrl, options.projectId);
  const project = new Project(client, options.baseUrl);
  const organization = new Organization(client, options.baseUrl);
  const atlasUser = new AtlasUser(client, options.baseUrl, options.projectId);
  const event = new Event(client, options.baseUrl, options.projectId);
  const alert = new Alert(client, options.baseUrl, options.projectId);
  const dataLake = new DataLake(client, options.baseUrl, options.projectId);
  const cloudProviderAccess = new CloudProviderAccess(client, options.baseUrl, options.projectId);
  const atlasSearch = new AtlasSearch(client, options.baseUrl, options.projectId);

  const functions = {};
  functions.user = getFunctions(user);
  functions.cluster = getFunctions(cluster);
  functions.cloudBackup = getFunctions(cloudBackup);
  functions.customDbRole = getFunctions(customDbRole);
  functions.projectWhitelist = getFunctions(projectWhitelist);
  functions.projectAccesslist = getFunctions(projectAccesslist);
  functions.project = getFunctions(project);
  functions.organization = getFunctions(organization);
  functions.atlasUser = getFunctions(atlasUser);
  functions.event = getFunctions(event);
  functions.alert = getFunctions(alert);
  functions.dataLake = getFunctions(dataLake);
  functions.cloudProviderAccess = getFunctions(cloudProviderAccess);
  functions.atlasSearch = getFunctions(atlasSearch);

  return functions;
}

export default getMongodbAtlasApiClient;

