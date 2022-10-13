const Service = require("egg").Service;
const fs = require("fs");
const path = require("path");
const qiniu = require("qiniu");
const awaitWriteStream = require("await-stream-ready").write;
const sendToWormhole = require("stream-wormhole");
const md5 = require("md5");
const bucket = "zhangenhua"; //要上传的空间名
const imageUrl = "qn2.proflu.cn"; // 空间绑定的域名
const accessKey = 'uTV-Qr3ZVULr6roIpMteGaRME188FDI8CgNcp9yF'; //Access Key
const secretKey = 'dKRdkex52CLYnSkCDYZ8axjWDIHRW0iFN5EPT0EK'; //Secret Key
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
const options = {
  scope: bucket,
  expires: 7200
};
const putPolicy = new qiniu.rs.PutPolicy(options);
const uploadToken = putPolicy.uploadToken(mac);
let config = new qiniu.conf.Config();
//华东z0,华北z1,华南z2,北美na0,东南亚as0
config.zone = qiniu.zone.Zone_z0;

class utilsService extends Service {
  async uploadFiles() {
    const { ctx } = this;
    const stream = await ctx.getFileStream();
    const filename =
      md5(stream.filename) + path.extname(stream.filename).toLocaleLowerCase();
    const localFilePath = path.join(__dirname, "../public/uploads", filename);
    const writeStream = fs.createWriteStream(localFilePath);
    try {
      await awaitWriteStream(stream.pipe(writeStream));
      const formUploader = new qiniu.form_up.FormUploader(config);
      const putExtra = new qiniu.form_up.PutExtra();
      const imgSrc = await new Promise((resolve, reject) => {
        formUploader.putFile(
          uploadToken,
          filename,
          localFilePath,
          putExtra,
          (respErr, respBody, respInfo) => {
            if (respErr) {
              reject("");
            }
            if (respInfo.statusCode == 200) {
              resolve(imageUrl + respBody.key);
            } else {
              reject("");
            }
            // 上传之后删除本地文件
            fs.unlinkSync(localFilePath);
          }
        );
      });
      if (imgSrc !== "") {
        return {
          url: imgSrc
        };
      } else {
        return false;
      }
    } catch (err) {
      //如果出现错误，关闭管道
      await sendToWormhole(stream);
      return false;
    }

  }
  async downloadFiles(){
    var bucketManager = new qiniu.rs.BucketManager(mac, config);
    var privateBucketDomain = 'https://qn.proflu.cn';
    
    var deadline = parseInt(Date.now() / 1000) + 3600; // 1小时过期
    var privateDownloadUrl = bucketManager.privateDownloadUrl(privateBucketDomain, "2022-09-19 05:22:11.439054", deadline);
    
    console.log(privateDownloadUrl);
    
  }
}


module.exports = utilsService;