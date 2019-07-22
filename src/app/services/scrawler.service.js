const cheerio = require("cheerio");
const Promise = require("promise");
const axios = require("axios");

const phimmoiDomain = "http://www.phimmoi.net/";
const hdoDomain = "http://hdo.tv/";

module.exports = class crawler {
  static phimmoi(keyword) {
    return new Promise(function(resolve, reject) {
      var phimmoiOptions = {
        uri: `${phimmoiDomain}tim-kiem/${keyword}/`,
        params: {},
        headers: {}
      };

      var result = [];

      axios
        .get(phimmoiOptions.uri, phimmoiOptions.params, phimmoiOptions.headers)
        .then(function(response) {
          var $ = cheerio.load(response.data);
          var els = $(".movie-list-index .list-movie").find(".movie-item");

          $(els).each(function(i, elem) {
            const wrapper = $(this).find("a");
            const href = wrapper.attr("href");
            const background = $(this).find(".movie-thumbnail");
            const thumbnail = $(background)
              .attr("style")
              .slice(15, -26);

            const moviemeta = $(this).find(".movie-meta");
            const nameVi = $(moviemeta)
              .find(".movie-title-1")
              .text();
            const nameEn = $(moviemeta)
              .find(".movie-title-2")
              .text();
            const time = $(moviemeta)
              .find(".movie-title-chap")
              .text();

            const item = {
              domain: phimmoiDomain.trim(),
              href: href.trim(),
              thumbnail: thumbnail.trim(),
              nameVi: nameVi.trim(),
              nameEn: nameEn.trim(),
              time: time.trim()
            };

            result.push(item);
          });

          resolve(result);
        })
        .catch(function(err) {
          reject(err);
        });
    });
  }

  static hdo(keyword) {
    return new Promise(function(resolve, reject) {
      var hdoOptions = {
        uri: `${hdoDomain}tim-kiem/${keyword}`,
        params: {},
        headers: {}
      };

      var result = [];

      axios
        .get(hdoOptions.uri, hdoOptions.params, hdoOptions.headers)
        .then(function(response) {
          var $ = cheerio.load(response.data);
          var els = $("ul.view-thumb-res").children();

          $(els).each(function(i, elem) {
            const wrapper = $(this).find(".tn-bxitem .bxitem-link");
            const href = wrapper.attr("href");
            const episodes = wrapper.find(".bxitem-episodes").text();
            const thumbnail = $(this)
              .find(".bxitem-img img")
              .attr("src");
            const nameVi = $(this)
              .find(".name-vi")
              .text();
            const nameEn = $(this)
              .find(".name-en")
              .text();

            const item = {
              domain: hdoDomain.trim(),
              href: href.trim(),
              thumbnail: thumbnail.trim(),
              nameVi: nameVi.trim(),
              nameEn: nameEn.trim(),
              time: episodes.trim()
            };

            result.push(item);
          });

          resolve(result);
        })
        .catch(function(err) {
          reject(err);
        });
    });
  }
};
