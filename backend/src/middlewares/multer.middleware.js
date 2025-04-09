import multer from "multer";
import { v4 as uuid } from "uuid";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/temp");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = uuid();
        cb(null, file.fieldname + "-" + uniqueSuffix);
    },
});
const upload = multer({ storage });

export default upload;
