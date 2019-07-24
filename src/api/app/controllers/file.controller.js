const MinService = require("../cores/services/minio.service");

const formidable = require("formidable");
const readChunk = require("read-chunk");
const fileType = require("file-type");

exports.upload = function (req, res) {
  var form = new formidable.IncomingForm();

  form.parse(req);

  form.on("file", function (key, file) {
    const fileName = file.name;
    // Read a chunk of the file.
    const buffer = readChunk.sync(file.path, 0, file.size);
    // Get the file type using the buffer read using read-chunk
    const type = fileType(buffer);
    const minService = new MinService();
    minService
      .upload(fileName, buffer)
      .then(function (data) {
        res.json({ data: data });
      })
      .catch(function (err) {
        res.json({ code: 500, message: err });
      });
  });

  form.on("error", function (err) {
    res.json({ code: 500, message: err });
  });
};


exports.get = function (req, res) {
  const bucketName = req.params.bucketName;
  const fileName = req.params.fileName;
  const minService = new MinService();

  minService
    .downloadFile(bucketName, fileName)
    .then(function (dataStream) {
      dataStream.pipe(res);
    })
    .catch(function (err) {
      res.json({ code: 500, message: err });
    });
};