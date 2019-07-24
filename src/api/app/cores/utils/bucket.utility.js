const Promise = require("promise");
const minio = require("minio");
const config = require("../utils/configure")

module.exports = class BucketUtility {
  static getMinClient() {
    return new minio.Client({
      endPoint: config.endPoint,
      port: config.port,
      useSSL: config.ssl,
      accessKey: config.accessKey,
      secretKey: config.secretKey
    });
  }
  
  static makeBucket(bucketName) {
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

  static bucketExists(bucketName) {
    const minioClient = this.getMinClient();
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