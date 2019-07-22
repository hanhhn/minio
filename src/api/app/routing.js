"use strict";
module.exports = function(app) {
  var upload = require("./controllers/upload.controller");
  app.route("/api/upload").post(upload.uploadFile);
};
