const MinService = require("../services/minio.service");

const fs = require('fs');
const formidable = require('formidable');
const readChunk = require('read-chunk');
const fileType = require('file-type');

exports.uploadFile = function (req, res) {
  var form = new formidable.IncomingForm();

  form.parse(req);

  form.on('file', function (key, file) {
    const fileName = file.name;
    // Read a chunk of the file.
    const buffer = readChunk.sync(file.path, 0, file.size);
    // Get the file type using the buffer read using read-chunk
    const type = fileType(buffer);
    const minService = new MinService();
    minService.upload(fileName, buffer)
      .then(function () { console.log("ok") }) 
      .catch(function (err) { console.log(err) });
  });


  form.on('error', function (err) {
    console.log(err);
  });

  res.json({ "Uploaded:": "ok" });
};