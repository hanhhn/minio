const Promise = require("promise");
const minio = require("minio");
const config = require("../utils/configure");

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

  static genBucketName() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${year}${month.toString().padStart(2,"0")}${day.toString().padStart(2,"0")}`;
  }

  static makeBucket(bucketName) {
    const minioClient = this.getMinClient();
    return new Promise(function(resolve, reject) {
      minioClient.makeBucket(bucketName, config.UsEast1, function(err) {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }

  static bucketExists(bucketName) {
    const minioClient = this.getMinClient();
    return new Promise(function(resolve, reject) {
      minioClient.bucketExists(bucketName, function(err, exists) {
        if (err) {
          reject(err);
        }

        resolve(exists);
      });
    });
  }
};
