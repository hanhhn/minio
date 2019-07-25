const Promise = require("promise");
const object = require("../utils/object.utility");
const bucket = require("../utils/bucket.utility");

module.exports = class MinIOService {
  upload(fileName, fileStream) {
    return new Promise(async function(resolve, reject) {
      const bucketName = new Date().toLocaleDateString();

      let isExists = false;
      await bucket
        .bucketExists(bucketName)
        .then(function(exists) {
          isExists = exists;
        })
        .catch(function(err) {
          reject(err);
        });

      if (!isExists) {
        await bucket
          .makeBucket(bucketName)
          .then(function() {
            isExists = true;
          })
          .catch(function(err) {
            reject(err);
          });
      }

      if (isExists) {
        object
          .putObject(bucketName, fileName, fileStream)
          .then(function(etag) {
            const data = {
              bucket: bucketName,
              name: fileName,
              etag: etag
            };
            resolve(data);
          })
          .catch(function(err) {
            reject(err);
          });
      }
    });
  }

  download(bucketName, fileName) {
    return new Promise(function(resolve, reject) {
      object
        .getObject(bucketName, fileName)
        .then(function(dataStream) {
          resolve(dataStream);
        })
        .catch(function(err) {
          reject(err);
        });
    });
  }

  public(bucketName, fileName) {
    return new Promise(function(resolve, reject) {
      object
        .getObject(bucketName, fileName)
        .then(function(dataStream) {
          resolve(dataStream);
        })
        .catch(function(err) {
          reject(err);
        });
    });
  }

  delete(bucketName, fileName) {
    return new Promise(async function(resolve, reject) {
      let isExists = false;
      await bucket
        .bucketExists(bucketName)
        .then(function(exists) {
          isExists = exists;
        })
        .catch(function(err) {
          reject(err);
        });

      if (!isExists) {
        reject("Bucket can not be found.");
      }

      if (isExists) {
        object
          .removeObject(bucketName, fileName)
          .then(function() {
            resolve(`Delete ${fileName} success.`);
          })
          .catch(function(err) {
            reject(err);
          });
      }
    });
  }

  getMetaData(bucketName, fileName) {
    return new Promise(async function(resolve, reject) {
      let isExists = false;
      await bucket
        .bucketExists(bucketName)
        .then(function(exists) {
          isExists = exists;
        })
        .catch(function(err) {
          reject(err);
        });

      if (!isExists) {
        reject({ msg: "Bucket can not be found." });
      }

      if (isExists) {
        object
          .statObject(bucketName, fileName)
          .then(function(stat) {
            resolve(stat);
          })
          .catch(function(err) {
            reject(err);
          });
      }
    });
  }
};
