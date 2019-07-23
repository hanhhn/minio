const Promise = require("promise");
const minio = require("minio");
const config = require("../utils/configure")

module.exports = class BucketUtility {
  static makeBucket(bucketName) {
    const minioClient = new minio.Client({
      endPoint: config.endPoint,
      port: config.port,
      useSSL: config.ssl,
      accessKey: config.accessKey,
      secretKey: config.secretKey
    });
    return new Promise(function (resolve, reject) {
      minioClient.makeBucket(bucketName, REGION, function (e) {
        if (e) {
          reject(e);
        }
        resolve();
      });
    });
  }

  static bucketExists(bucketName) {
    const minioClient = new minio.Client({
      endPoint: END_POINT,
      port: PORT,
      useSSL: false,
      accessKey: ACCESS_KEY,
      secretKey: SECRET_KEY
    });
    return new Promise(function (resolve, reject) {
      minioClient.bucketExists(bucketName, function (err, exists) {
        if (err) {
          reject(err);
        }
        if (exists) {
          resolve(exists);
        }
      });
    });
  }
};
