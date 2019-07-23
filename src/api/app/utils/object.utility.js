const Promise = require("promise");
const minio = require("minio");
const END_POINT = "45.32.125.153";
const PORT = 9000;
const ACCESS_KEY = "B763E";
const SECRET_KEY = "m9rUw49wPa";

module.exports = class ObjectUtility {
  static putObject(bucketName, objectName, stream) {
    const minioClient = new minio.Client({
      endPoint: END_POINT,
      port: PORT,
      useSSL: false,
      accessKey: ACCESS_KEY,
      secretKey: SECRET_KEY
    });

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
    const minioClient = new minio.Client({
      endPoint: END_POINT,
      port: PORT,
      useSSL: false,
      accessKey: ACCESS_KEY,
      secretKey: SECRET_KEY
    });

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
    const minioClient = new minio.Client({
      endPoint: END_POINT,
      port: PORT,
      useSSL: false,
      accessKey: ACCESS_KEY,
      secretKey: SECRET_KEY
    });

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
};
