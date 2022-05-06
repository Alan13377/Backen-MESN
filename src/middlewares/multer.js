import multer from "multer";

const storage = multer.diskStorage({
  destination: "uploads/img",
  filename: (request, file, callback) => {
    callback(null, file.originalname);
  },
});

export default multer({ storage }).single("image");
