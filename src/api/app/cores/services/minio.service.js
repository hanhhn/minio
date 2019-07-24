const Promise = require("promise");
const object = require("../utils/object.utility");
const bucket = require("../utils/bucket.utility");

module.exports = class MinIOService {
  upload(fileName, fileStram) {
    return new Promise(async function (resolve, reject) {
      const bucketName = new Date().toLocaleDateString();

      let isExists = false;
      await bucket
        .bucketExists(bucketName)
        .then(function (exists) {
          isExists = exists;
        })
        .catch(function (err) {
          reject(err);
        });

      if (!isExists) {
        await bucket
          .makeBucket(bucketName)
          .then(function () {
            isExists = true;
          })
          .catch(function (err) {
            reject(err);
          });
      }

      if (isExists) {
        object
          .putObject(bucketName, fileName, fileStram)
          .then(function (etag) {
            const data = {
              bucket: bucketName,
              etag: etag
            };
            resolve(data);
          })
          .catch(function (err) {
            reject(err);
          });
      }
    });
  }

  download(bucketName, fileName) {
    return new Promise(function (resolve, reject) {
      object
        .getObject(bucketName, fileName)
        .then(function (dataStream) {
          resolve(dataStream);
        })
        .catch(function (err) {
          reject(err);
        });
    });
  }

  public(bucketName, fileName) {
    return new Promise(function (resolve, reject) {
      object
        .getObject(bucketName, fileName)
        .then(function (dataStream) {
          resolve(dataStream);
        })
        .catch(function (err) {
          reject(err);
        });
    });
  }
};
