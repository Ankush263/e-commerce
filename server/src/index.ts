import app from './app';
import { connection } from './db/index';
import dotenv from 'dotenv';

dotenv.config();

process.env.TZ = 'Asia/Calcutta';

connection()
	.then(() => {
		app.listen(process.env.PORT || 8000, () => {
			console.log(`Server is running at port: ${process.env.PORT}`);
		});
	})
	.catch((error) => {
		throw new Error(error);
	});
