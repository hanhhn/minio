const MinService = require("../cores/services/minio.service");

module.exports = class FileService {
    uploadFile() {
        const minService = new MinService();
        return minService
            .upload(fileName, buffer)
            .then(function (data) {
                res.json({ data: data });
            })
            .catch(function (err) {
                res.json({ code: 500, message: err });
            });
    }
}