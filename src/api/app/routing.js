"use strict";
module.exports = function(app) {
  var file = require("./controllers/file.controller");
  app.route("/api/files/get/:bucketName/:fileName/").get(file.get);
  app.route("/api/files/upload/").post(file.upload);
  app.route("/api/files/uploads/").post(file.uploads);
  app.route("/api/files/delete/:bucketName/:fileName/").post(file.delete);

  // var download = require("./controllers/download.controller");
  // app.route("/api/download/:bucketName/:fileName").get(download.getFile);
};
