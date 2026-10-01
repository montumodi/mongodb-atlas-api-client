const getClient = require("../src/index.js");
const dotenv = require("dotenv");

dotenv.config();

const requiredConfig = ["ATLAS_PUBLIC_KEY", "ATLAS_PRIVATE_KEY", "ATLAS_PROJECT_ID"];

function getSkipReason(...requiredKeys) {
  if (process.env.ATLAS_RUN_INTEGRATION !== "true") {
    return "Set ATLAS_RUN_INTEGRATION=true to enable live Atlas integration tests.";
  }

  const disabledFlags = requiredKeys.filter(key => key.startsWith("ATLAS_RUN_") && process.env[key] !== "true");
  if (disabledFlags.length) {
    return `Set ${disabledFlags.join(", ")} to true to enable this destructive integration test.`;
  }

  const missingKeys = [...requiredConfig, ...requiredKeys].filter(key => !process.env[key]);
  if (missingKeys.length) {
    return `Missing required environment variables: ${missingKeys.join(", ")}`;
  }

  return false;
}

function createClient() {
  return getClient({
    "publicKey": process.env.ATLAS_PUBLIC_KEY,
    "privateKey": process.env.ATLAS_PRIVATE_KEY,
    "baseUrl": process.env.ATLAS_BASE_URL || "https://cloud.mongodb.com/api/atlas/v2",
    "projectId": process.env.ATLAS_PROJECT_ID,
    "apiVersion": process.env.ATLAS_API_VERSION || "2025-03-12"
  });
}

function getUniqueName(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function parseJson(name) {
  try {
    return JSON.parse(process.env[name]);
  } catch (error) {
    throw new Error(`${name} must contain valid JSON: ${error.message}`);
  }
}

async function runNextCleanup(cleanupFunctions, cleanupErrors) {
  const cleanup = cleanupFunctions.pop();
  if (!cleanup) {
    return;
  }

  try {
    await cleanup();
  } catch (error) {
    cleanupErrors.push(error);
  }

  await runNextCleanup(cleanupFunctions, cleanupErrors);
}

async function runCleanup(cleanupFunctions) {
  const cleanupErrors = [];
  await runNextCleanup(cleanupFunctions, cleanupErrors);

  if (cleanupErrors.length) {
    throw new AggregateError(cleanupErrors, "Integration cleanup failed.");
  }
}

module.exports = {
  createClient,
  getSkipReason,
  getUniqueName,
  parseJson,
  runCleanup
};
