"use strict";
module.exports = function(app) {
  var crawler = require("./controllers/crawler.controller");
  app.route("/search/:keyword").get(crawler.search);
  app.route("/watch/").get(crawler.get);
};
