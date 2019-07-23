var formidable = require("formidable");
const minService = require("../services/minio.service");

exports.getImage = async function(req, res) {
  res.json({ "stauts:": "OK" });
};

exports.getFile = async function(req, res) {
};
