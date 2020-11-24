var fs = require("fs-extra");
var path = require("path");
var decompress = require('decompress');
var print = require('./print');
var tmp = require('tmp');
var _fs = require('fs'); 
const child_process = require('child_process');
var request = require('request').defaults({
    headers: {
        'User-Agent': 'node request' // GitHub ask for this.
    }
});


module.exports = {
    logo: print.logo,
    loading: print.loading,
    log: print.log,
    warn: print.warn,
    success: print.success,
    error: print.error,
    link: print.link,
    clone(protocol, url, branch, user, pwd) {
        return new Promise((resolve, reject) => {
            const res = child_process.execSync(`git clone -b ${branch} ${protocol}${user}:${pwd}@${url}`)
            resolve(res);
        })
    },
    get(url, callback){
        request.get(url, function(err, res, body){
            if (err) {
                callback(err);
                return;
            }
            if (res.statusCode != 200) {
                callback(`Failed to fetch info - ${res.statusCode}: ${res.body}`);
                return;
            }
            callback(null, body);
        });
    },
    /**
     * 把 url (zipball_url) 的内容下载并解压到 savePath
     * @param {string} url
     * @param {string} savePath
     * @param {Function} cb 接收参数 error
     */
    downloadAndUnzip(url, savePath, cb) {
        if(fs.existsSync(savePath)){
            print.error(`File ${savePath} already exist.`);
            return;
        }
        print.log("Trying to download template...");
        var TMP_DOWNLOAD_PATH = tmp.tmpNameSync() + ".zip";
        var TMP_UNZIP_FOLDER = tmp.tmpNameSync();
        var file = fs.createWriteStream(TMP_DOWNLOAD_PATH);
        file.on("close", () => {
            print.log("Extracting...");
            decompress(TMP_DOWNLOAD_PATH, TMP_UNZIP_FOLDER).then(() => {
                print.log('Done extracting.')
                _fs.readdir(TMP_UNZIP_FOLDER, (err, files) => {
                    fs.moveSync(path.join(TMP_UNZIP_FOLDER, files[0]), savePath); // 重命名为指定名
                    fs.unlinkSync(TMP_DOWNLOAD_PATH); // 删除下载的压缩包
                    cb && cb();
                })
            })
        }).on("error", (err) => {
            print.error(err);
        });
        request.get(url)
            .on("error", function (err) {
                print.error(`Error downloading: ${err}`);
            })
            .on("response", function (res) {
                if (res.statusCode != 200) {
                    print.error("Get zipUrl return a non-200 response.");
                }
            })
            .on("end", function () {
                print.log("Download finished.");
            })
            .pipe(file);
    }
}
