const Promise = require("promise");
const minio = require("minio");
const END_POINT = "45.32.125.153";
const PORT = 9000;
const ACCESS_KEY = "B763E";
const SECRET_KEY = "m9rUw49wPa";

const REGION = "us-east-1";

module.exports = class BucketUtility {
  static makeBucket(bucketName) {
    const minioClient = new minio.Client({
      endPoint: END_POINT,
      port: PORT,
      useSSL: false,
      accessKey: ACCESS_KEY,
      secretKey: SECRET_KEY
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
