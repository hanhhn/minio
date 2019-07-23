const MinService = require("../services/minio.service");

exports.getImage = async function(req, res) {
  res.json({ "stauts:": "OK" });
};

exports.getFile = async function(req, res) {
  const bucketName = req.params.bucketName;
  const fileName = req.params.fileName;
  const minService = new MinService();

  minService
    .downloadFile(bucketName, fileName)
    .then(function(dataStream) {
      dataStream.pipe(res);
    })
    .catch(function(err) {
      res.json({ message: err });
    });
};
