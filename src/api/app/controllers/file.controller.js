const FileService = require("../cores/services/file.service");

const formidable = require("formidable");
const readChunk = require("read-chunk");
const fileType = require("file-type");

exports.get = function(req, res) {
  const bucketName = req.params.bucketName;
  const fileName = req.params.fileName;
  const fileService = new FileService();

  fileService
    .downloadFile(bucketName, fileName)
    .then(function(dataStream) {
      dataStream.pipe(res);
    })
    .catch(function(err) {
      res.json({ code: 500, message: err });
    });
};

exports.upload = function(req, res) {
  var form = new formidable.IncomingForm();

  form.parse(req, function(err, fields, files) {
    if (!files || files.length > 1) {
      res.json({ code: 400, message: "Bad request" });
      return;
    }
  });

  form.on("file", function(key, file) {
    const fileName = file.name;
    const buffer = readChunk.sync(file.path, 0, file.size);
    const fileService = new FileService();
    fileService
      .upload(fileName, buffer)
      .then(function(data) {
        res.json({ data: data });
      })
      .catch(function(err) {
        res.json({ code: 500, message: err });
      });
  });

  form.on("error", function(err) {
    res.json({ code: 500, message: err });
  });
};

exports.uploads = function(req, res) {
  var form = new formidable.IncomingForm();

  form.parse(req, function(err, fields, files) {
    if (!files) {
      res.json({ code: 400, message: "Bad request" });
    }
  });

  let result = [];
  form.on("file", function(key, file) {
    const fileName = file.name;
    const buffer = readChunk.sync(file.path, 0, file.size);
    const fileService = new FileService();
    fileService
      .upload(fileName, buffer)
      .then(function(data) {
        result.push(data);
      })
      .catch(function(err) {
        res.json({ code: 500, message: err });
      });
  });

  form.on("end", function() {
    res.json({ data: result });
  });

  form.on("error", function(err) {
    res.json({ code: 500, message: err });
  });
};

exports.delete = function(req, res) {
  const bucketName = req.params.bucketName;
  const fileName = req.params.fileName;
  const fileService = new FileService();

  fileService
    .delete(bucketName, fileName)
    .then(function(data) {
      res.json({ data: data });
    })
    .catch(function(err) {
      res.json({ code: 500, message: err });
    });
};
