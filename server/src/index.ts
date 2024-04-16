import app from './app';
import { connection } from './db/index';
import dotenv from 'dotenv';
import http from 'http';

dotenv.config();

const server = http.createServer(app);

process.env.TZ = 'Asia/Calcutta';

connection()
	.then(() => {
		server.listen(process.env.PORT || 8000, () => {
			console.log(`Server is running at port Ankush: ${process.env.PORT}`);
		});
	})
	.catch((error) => {
		throw new Error(error);
	});
