import app from './app';
import { DBConnect } from './db';

app.listen(app.get('port'), () => {
	console.log(`Server on port ${app.get('port')}`);

	DBConnect()
		.then(() => {
			console.log('Database connected');
		})
		.catch((error: Error) => {
			console.log('Error connecting to database: ', error);
		});
});
