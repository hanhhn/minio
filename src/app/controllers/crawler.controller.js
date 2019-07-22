"use strict";

const crawlerService = require("../services/scrawler.service");
const watcherService = require("../services/watcher.service");
const Promise = require("promise");

exports.search = async function(request, responese) {
  const keyword = request.params.keyword;

  var result = [];

  const phimmoi = await crawlerService
    .phimmoi(keyword)
    .then(function(data) {
      result.push(...data);
    })
    .catch(function(err) {
      console.log("phim moi error");
    });

  const hdo = await crawlerService
    .hdo(keyword)
    .then(function(data) {
      result.push(...data);
    })
    .catch(function(err) {
      console.log("hdo error");
    });

  Promise.all([phimmoi, hdo]);
  responese.json(result);
};

exports.get = async function(request, responese) {
  const domain = request.query.domain;
  const link = request.query.link;

  console.log(domain);
  console.log(link);

  await watcherService
    .get(domain, link)
    .then(function(data) {
      console.log("then");
    })
    .catch(function(err) {
      console.log("error");
    });

  responese.json({ "stauts:": "OK" });
};
