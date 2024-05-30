import {URLSearchParams} from "url";

function getQueryStringFromOptions(options = {}) {
  /* eslint-disable no-unused-vars */
  const {httpOptions, ...mongoQueryStringOptions} = options;
  const urlparams = new URLSearchParams(mongoQueryStringOptions);
  const queryString = urlparams.toString();
  return queryString;
}

export default getQueryStringFromOptions;
