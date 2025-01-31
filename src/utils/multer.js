const multer = require("multer");
const path = require("path");
const fs = require("fs");
const createError = require("http-errors");

function directory(req) {
  const data = new Date();
  const year = data.getFullYear().toString();
  const month = data.getMonth().toString();
  const day = data.getDay().toString();
  const directory = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "uploads",
    year,
    month,
    day
  );
  req.body.fileUploadPath = path.join("uploads", year, month, day);
  fs.mkdirSync(directory, { recursive: true });
  return directory;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file?.originalname) {
      const filePath = directory(req);
      return cb(null, filePath);
    }
    cb(null, null);
  },
  filename: (req, file, cb) => {
    if (file.originalname) {
      const extName = path.extname(file.originalname);
      const fileName = String(new Date().getTime() + extName);
      req.body.fileName = fileName;
      return cb(null, fileName);
    }
    cb(null, null);
  },
});

function fileFilter(req, file, cb) {
  const extName = path.extname(file.originalname);
  const mimetypes = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
  if (mimetypes.includes(extName)) {
    return cb(null, true);
  }
  return cb(createError.BadRequest("فرمت ارسال شده تصویر صحیح نمیباشد"));
}

const imgMaxSize = 1 * 1000 * 1000;
const uploadImg = multer({ storage, fileFilter, limits: { imgMaxSize } });

module.exports = { uploadImg };
