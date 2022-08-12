/* eslint-disable no-invalid-this */
const axios = require("axios");
const cheerio = require("cheerio");

function makeRequest(url) {
  return axios.get(url).then(response => {
    return response.data;
  }).catch(error => {
    // eslint-disable-next-line no-console
    console.log(error);
  });
}

function cheerioParseHtml(html) {
  return cheerio.load(html);
}

async function fetchEndpointsList(url) {
  const endpoints = [];
  const html = await makeRequest(url);
  // eslint-disable-next-line id-length
  const $ = cheerioParseHtml(html);
  const rows = [];
  // get spans
  const selector = $("table");
  $(selector).each(function () {
    const row = [];
    rows.push(row);
    $(this).find("td").each(function (tdIndex) {
      const text = $(this).text().trim();
      if (tdIndex === 0) {
        row.push(text.split("}")[1]); // This is the hack which removes some random style from the first element.
      } else {
        row.push(text);
      }
    });
  });
  const spans = rows.flat(1);

  for (let i = 0; i < spans.length; i += 3) {
    endpoints.push({"method": spans[i], "url": spans[i + 1], "description": spans[i + 2]});
  }

  return endpoints;
}

module.exports = fetchEndpointsList;
