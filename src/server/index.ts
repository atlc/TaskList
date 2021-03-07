import * as express from 'express';
import * as morgan from 'morgan';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as rs from 'redis-server';
import routes from './routes';
import * as passport from 'passport';
import { redis } from './config';
import './middlewares/passport-strategies';

const app = express();

app.use(passport.initialize());
app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(routes);

const redis_server = new rs(redis.port);
redis_server.open((err) => {
    if (err) {
        console.log('\x1b[31m\x1b[47m%s\x1b[0m', 'REDIS SERVER WAS NOT FOUND RUNNING');
        console.log(err);
        process.exit(1);
    }
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('\x1b[5m\x1b[36m', `---\t---\tServer now running on :${port}\t---\t---`))
