const Promise = require("promise");
const MinService = require("../services/minio.service");

module.exports = class FileService {
  upload(fileName, buffer) {
    const minService = new MinService();
    return new Promise((resolve, reject) => {
      minService
        .upload(fileName, buffer)
        .then(function(data) {
          resolve(data);
        })
        .catch(function(err) {
          reject(err);
        });
    });
  }

  uploads(dataStream, reject) {
    const minService = new MinService();
    let result = [];
    dataStream.forEach(stream => {
      if (stream) {
        minService
          .upload(stream.fileName, stream.buffer)
          .then(function(data) {
            result.push(data);
          })
          .catch(function(err) {
            reject(err);
          });
      }
    });
  }

  delete(bucketName, fileName) {
    const minService = new MinService();
    return new Promise((resolve, reject) => {
      minService
        .delete(bucketName, fileName)
        .then(function(data) {
          resolve(data);
        })
        .catch(function(err) {
          reject(err);
        });
    });
  }
};
