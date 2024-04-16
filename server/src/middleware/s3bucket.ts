import uuid from 'uuid';
import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';
import { s3 } from './s3';
import { Request } from 'express';

const s3StorageForProducts = multerS3({
	s3: s3,
	bucket: `${process.env.BUCKET_NAME}`,
	contentType: multerS3.AUTO_CONTENT_TYPE,
	metadata: (req: Request | any, file: any, cb: any) => {
		cb(null, { fieldname: file.fieldname });
	},
	key: (req: Request | any, file: any, cb: any) => {
		const fileName = 'products' + '/' + req.user.id + '/' + uuid.v1() + '.jpeg';
		cb(null, fileName);
	},
});

function sanitizeFile(file: any, cb: any) {
	const fileExts = ['.png', '.jpg', '.jpeg', '.pdf'];

	const isAllowedExt = fileExts.includes(
		path.extname(file.originalname.toLowerCase())
	);

	const isAllowedMimeType =
		file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf';

	if (isAllowedExt && isAllowedMimeType) {
		return cb(null, true); // no errors
	} else {
		cb('Error: File type not allowed!');
	}
}

export const uploadImageForProducts = multer({
	storage: s3StorageForProducts,
	fileFilter: (req: Request, file: any, callback: any) => {
		sanitizeFile(file, callback);
	},
	limits: {
		fileSize: 1024 * 1024 * 2,
	},
});
