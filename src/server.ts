import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import initRoute from '../src/routes/webUrl';
import bodyParser from 'body-parser';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME as string;

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

initRoute(app);

app.listen(Number(port), hostname, () => {
   console.log(`App is listening on port ${port}`);
});
