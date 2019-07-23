"use strict";
module.exports = function(app) {
  console.log(app)
  var upload = require("./controllers/upload.controller");
  app.route("/api/upload/").post(upload.uploadFile);

  var download = require("./controllers/download.controller");
  app.route("/api/download/").get(download.getImage);
};
