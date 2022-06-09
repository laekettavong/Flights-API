import express from 'express';
import config from 'config';
import routes from './routes';
import log from './logger';
import connect from './db/connect';
import { deserializeUser } from './middleware';

const host = config.get('host') as string;
const port = config.get('port') as number;

const app = express();
app.use(deserializeUser);
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.listen( port, host, async () => {
  log.info(`Server listening at http://${host}:${port}`);
  await connect();
  routes(app);
});