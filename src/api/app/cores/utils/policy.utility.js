const Promise = require("promise");
const minio = require("minio");
const config = require()

const REGION = "us-east-1";

module.exports = class PlicyUtility {
  static getBucketPolicy(bucketName) {
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
};
