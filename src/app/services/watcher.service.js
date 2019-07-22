const cheerio = require("cheerio");
const Promise = require("promise");
const axios = require("axios");

module.exports = class watcher {
  static get(domain, link) {
    return new Promise(function(resolve, reject) {
      axios
        .get(
          "http://www.phimmoi.net/phim/hoi-uc-alhambra-thanh-pho-phep-thuat-7939/tap-8-174440.html"
        )
        .then(function(response) {
          var $ = cheerio.load(response.data);

          console.log(response.data);

          //   resolve(response.data);
        })
        .catch(function(err) {
          reject(err);
        });
    });
  }
};
