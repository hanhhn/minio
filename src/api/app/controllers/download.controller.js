var formidable = require("formidable");
const minService = require("../services/minio.service");

exports.getImage = async function(req, res) {
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, file) {
    minService.upload(file.fileName, file);
  });
};

exports.getFile = async function(req, res) {
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, file) {
    minService.upload(file.fileName, file);
  });
};
