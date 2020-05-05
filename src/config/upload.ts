import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const filesPath = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: filesPath,

  storage: multer.diskStorage({
    destination: filesPath,
    filename(request, file, callback) {
      const filehash = crypto.randomBytes(10).toString('HEX');
      const filename = `${filehash}-${file.originalname}`;

      return callback(null, filename);
    },
  }),
}
