import express, {Express} from 'express';
import path from 'path';
import homeRouter from './routes/home';
import bodyParser from 'body-parser';
import https from 'https';
import fs from 'fs';

const app: Express = express();

app.set("views", path.join(__dirname, '../views'));
app.set("view engine", "ejs");
app.use('/scripts', express.static(path.join(__dirname, '/scripts')));
app.use('/styles', express.static(path.join(__dirname, '../styles')));
app.use(bodyParser.urlencoded({ extended: true }));

const externalUrl = process.env.RENDER_EXTERNAL_URL;
const port = externalUrl && process.env.PORT ? parseInt(process.env.PORT) : 4080;

if (externalUrl) {
  const hostname = '0.0.0.0'; //ne 127.0.0.1
  app.listen(port, hostname, () => {
  console.log(`Server locally running at http://${hostname}:${port}/ and from
  outside on ${externalUrl}`);
  });
}
else {
  https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
  }, app)
  .listen(port, function () {
  console.log(`Server running at https://localhost:${port}/`);
  });
}

app.use('/home', homeRouter);

app.get('/', (req, res) => {
      res.redirect('/home');  
  });
