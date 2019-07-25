const FileService = require("../cores/services/file.service");

const formidable = require("formidable");
const readChunk = require("read-chunk");
const fileType = require("file-type");

exports.get = function(req, res) {
  const bucketName = req.params.bucket;
  const fileName = req.params.file;
  const fileService = new FileService();

  fileService
    .get(bucketName, fileName)
    .then(function(dataStream) {
      res.setHeader("Content-Type", "application/octet-stream");
      dataStream.pipe(res);
    })
    .catch(function(err) {
      res.json({ code: 500, message: JSON.stringify(err) });
    });
};

exports.getMeteData = function(req, res) {
  const bucketName = req.params.bucket;
  const fileName = req.params.file;
  const fileService = new FileService();

  fileService
    .getMetaData(bucketName, fileName)
    .then(function(stat) {
      res.json(stat);
    })
    .catch(function(err) {
      res.json({ code: 500, message: JSON.stringify(err) });
    });
};

exports.upload = function(req, res) {
  var form = new formidable.IncomingForm();

  form.parse(req, function(err, fields, files) {
    if (!files || Object.keys(files).length > 1) {
      res.json({ code: 400, message: "Bad request" });
    }
  });

  form.on("file", function(key, file) {
    const fileName = file.name;
    const buffer = readChunk.sync(file.path, 0, file.size);
    const fileService = new FileService();
    fileService
      .upload(fileName, buffer)
      .then(function(data) {
        res.json(...data);
      })
      .catch(function(err) {
        res.json({ code: 500, message: JSON.stringify(err) });
      });
  });

  form.on("error", function(err) {
    res.json({ code: 500, message: JSON.stringify(err) });
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
        res.json({ code: 500, message: JSON.stringify(err) });
      });
  });

  form.on("end", function() {
    res.json({ ...result });
  });

  form.on("error", function(err) {
    res.json({ code: 500, message: JSON.stringify(err) });
  });
};

exports.delete = function(req, res) {
  const bucketName = req.body.bucket;
  const fileName = req.body.file;
  const fileService = new FileService();

  if (bucketName && fileName) {
    fileService
      .delete(bucketName, fileName)
      .then(function(data) {
        res.json({ message: data });
      })
      .catch(function(err) {
        res.json({ code: 500, message: JSON.stringify(err) });
      });
  } else {
    res.json({ code: 400, message: "Bad request" });
  }
};
