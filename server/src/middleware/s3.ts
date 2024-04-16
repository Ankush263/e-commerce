import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

export const s3 = new AWS.S3({
	credentials: {
		accessKeyId: `${process.env.ACCESSKEYID}`,
		secretAccessKey: `${process.env.SECRETACCESSKEY}`,
	},
	signatureVersion: 'v4',
	region: 'ap-south-1',
});
