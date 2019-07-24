const Promise = require("promise");
const minio = require("minio");
const config = require("../utils/configure")

module.exports = class PlicyUtility {
  static getMinClient() {
    return new minio.Client({
      endPoint: config.endPoint,
      port: config.port,
      useSSL: config.ssl,
      accessKey: config.accessKey,
      secretKey: config.secretKey
    });
  }

  static getBucketPolicy(bucketName) {
    const minioClient = this.getMinClient();

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
