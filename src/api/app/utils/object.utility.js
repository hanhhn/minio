const Promise = require("promise");
const minio = require("minio");
const END_POINT = "https://eggs.vn/";
const PORT = 443;
const ACCESS_KEY = "B763E";
const SECRET_KEY = "m9rUw49wPa";

const REGION = "us-east-1";

module.exports = class object {
  minioClient = new minio.Client({
    endPoint: END_POINT,
    port: PORT,
    useSSL: true,
    accessKey: ACCESS_KEY,
    secretKey: SECRET_KEY
  });

  static putObject(bucketName, objectName, stream) {
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
    return new Promise(function(resolve, reject) {
      minioClient.getObject(bucketName, objectName, function(err, dataStream) {
        if (err) {
          reject(err);
        }

        resolve(stream);
      });
    });
  }

  static fGetObject(bucketName, objectName, path) {
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
