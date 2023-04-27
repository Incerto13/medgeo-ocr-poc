import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser, { text, urlencoded } from 'body-parser';
import fs from 'fs'
import { googleVisionClient } from './google-vision-client'
import { cropImage } from './crop-image'

dotenv.config();
const cors = require('cors');
const app: Express = express();
const port = process.env.PORT;

app.use(express.json())
app.use(cors());

// app.use(bodyParser.json({limit: '50mb' }));
// app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
// app.use(bodyParser.text({ limit: '200mb' }));

app.use(express.json({limit: '10485760000000mb'}))


app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.post('/', async (req: Request, res: Response) => {
    console.log('received request')
    const { imageData } = req.body
    const croppedImageData = await cropImage(imageData)
    const fileName = 'test-file.png'
    fs.writeFile(fileName, croppedImageData, {encoding: 'base64'},() => console.log('file written'))
    const textAnnotations = await googleVisionClient(fileName)
    res.send(JSON.stringify(textAnnotations))
});


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});


