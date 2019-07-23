const object = require("../utils/object.utility");
const bucket = require("../utils/bucket.utility");

module.exports = class MinService {
  async upload(fileName, fileStram, meta) {
    const bucketName = new Date().toLocaleDateString();

    const isExists = false;
    await bucket
      .bucketExists(bucketName)
      .then(function () {
        isExists = true;
      })
      .catch(function (err) {
        console.log(err);
      });

    if (!isExists) {
      await bucket.makeBucket(bucketName).then(function () {
        isExists = true;
      }).catch(function (err) {
        console.log(err);
      })
    }

    if (isExists) {
      object.putObject(bucketName, fileName, fileStram).then(function (etag) {
        console.log(etag);
      }).catch(function (err) {
        console.log(err);
      })
    }
  }
};
