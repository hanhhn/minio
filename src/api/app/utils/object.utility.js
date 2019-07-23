const Promise = require("promise");
const minio = require("minio");
const END_POINT = "https://eggs.vn/";
const PORT = 443;
const ACCESS_KEY = "B763E";
const SECRET_KEY = "m9rUw49wPa";

module.exports = class object {
  
  get MinioClinent() {
    return new minio.Client({
      endPoint: END_POINT,
      port: PORT,
      useSSL: true,
      accessKey: ACCESS_KEY,
      secretKey: SECRET_KEY
    });
  }

  static putObject(bucketName, objectName, stream) {
    minioClient = MinioClinent();

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
    minioClient = MinioClinent();
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
    minioClient = MinioClinent();
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
