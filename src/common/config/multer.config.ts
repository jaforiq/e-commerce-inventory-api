import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';
import { BadRequestException } from '@nestjs/common';

export const multerConfig = {
  storage: diskStorage({
    destination: './uploads/products',
    filename: (req, file, callback) => {
      const uniqueName = `${uuid()}${extname(file.originalname)}`;
      callback(null, uniqueName);
    },
  }),
  fileFilter: (req, file, callback) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new BadRequestException('Only image files are allowed!'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
};