import * as express from 'express';
import * as morgan from 'morgan';
import * as compression from 'compression';
import * as helmet from 'helmet';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(routes);

// app.get(*, res.send HOME )

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('\x1b[5m\x1b[36m', `---\t---\tServer now running on :${port}\t---\t---`))
