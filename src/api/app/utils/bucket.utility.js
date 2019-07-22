const Promise = require("promise");
const minio = require("minio");
const END_POINT = "https://eggs.vn/";
const PORT = 443;
const ACCESS_KEY = "B763E";
const SECRET_KEY = "m9rUw49wPa";

const REGION = "us-east-1";

module.exports = class bucket {
  minioClient = new minio.Client({
    endPoint: END_POINT,
    port: PORT,
    useSSL: true,
    accessKey: ACCESS_KEY,
    secretKey: SECRET_KEY
  });

  static makeBucket(bucketName, region = REGION) {
    return new Promise(function(resolve, reject) {
      minioClient.makeBucket(bucketName, region, function(e) {
        if (e) {
          reject(e);
        }
        resolve();
      });
    });
  }

  static bucketExists(bucketName) {
    return new Promise(function(resolve, reject) {
      minioClient.bucketExists(bucketName, function(err, exists) {
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
