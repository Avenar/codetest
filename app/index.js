import express from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;
const DIST_DIR = path.join(import.meta.url.split("///")[1].split("/").slice(0, -1).join("/"), '/dist');
console.log(DIST_DIR);
const HTML_FILE = path.join(DIST_DIR, 'index.html');

app.use(express.static(DIST_DIR));

app.get('/', (req, res) => {
 res.sendFile(HTML_FILE);
});

app.listen(port, function () {
 console.log('App listening on port: ' + port);
});