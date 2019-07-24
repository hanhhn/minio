const Promise = require("promise");
const minio = require("minio");

module.exports = class ObjectUtility {
  static getMinClient() {
    return new minio.Client({
      endPoint: config.endPoint,
      port: config.port,
      useSSL: config.ssl,
      accessKey: config.accessKey,
      secretKey: config.secretKey
    });
  }

  static putObject(bucketName, objectName, stream) {
    const minioClient = this.getMinClient();
    return new Promise(function (resolve, reject) {
      minioClient.putObject(bucketName, objectName, stream, function (
        err,
        etag
      ) {
        if (err) {
          reject(err);
        }

        resolve(etag);
      });
    });
  }

  static getObject(bucketName, objectName) {
    const minioClient = this.getMinClient();
    return new Promise(function (resolve, reject) {
      minioClient.getObject(bucketName, objectName, function (err, dataStream) {
        if (err) {
          reject(err);
        }
        resolve(dataStream);
      });
    });
  }

  static fGetObject(bucketName, objectName, path) {
    const minioClient = this.getMinClient();
    return new Promise(function (resolve, reject) {
      minioClient.getObject(bucketName, objectName, path, function (
        err,
        dataStream
      ) {
        if (err) {
          reject(err);
        }

        resolve(dataStream);
      });
    });
  }
};