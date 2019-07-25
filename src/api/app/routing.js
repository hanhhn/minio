"use strict";
module.exports = function(app) {
  var file = require("./controllers/file.controller");
  app.route("/api/files/get/:bucket/:file/").get(file.get);
  app.route("/api/files/meta/:bucket/:file/").get(file.getMeteData);
  app.route("/api/files/upload/").post(file.upload);
  app.route("/api/files/uploads/").post(file.uploads);
  app.route("/api/files/delete/").delete(file.delete);

  // var download = require("./controllers/download.controller");
  // app.route("/api/download/:bucketName/:fileName").get(download.getFile);
};
