const Promise = require("promise");
const minio = require("minio");
const config = require("../utils/configure");

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
    return new Promise(function(resolve, reject) {
      minioClient.putObject(bucketName, objectName, stream, function(
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
    return new Promise(function(resolve, reject) {
      minioClient.getObject(bucketName, objectName, function(err, dataStream) {
        if (err) {
          reject(err);
        }
        resolve(dataStream);
      });
    });
  }

  static fGetObject(bucketName, objectName, path) {
    const minioClient = this.getMinClient();
    return new Promise(function(resolve, reject) {
      minioClient.getObject(bucketName, objectName, path, function(
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

  static removeObject(bucketName, objectName) {
    const minioClient = this.getMinClient();
    return new Promise(function(resolve, reject) {
      minioClient.removeObject(bucketName, objectName, function(err) {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }

  static statObject(bucketName, objectName) {
    const minioClient = this.getMinClient();
    return new Promise(function(resolve, reject) {
      minioClient.statObject(bucketName, objectName, function(err, stat) {
        if (err) {
          reject(err);
        }
        resolve(stat);
      });
    });
  }
};
