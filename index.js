/* Begin datbase section */
import fs from 'fs';
const database = JSON.parse(fs.readFileSync('./database.json'));
/* End database section */

/* Begin server section */
import express from 'express';

// import cors from "cors"; // for CORS setup, usage: app.use(cors());
const app = express();
// app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3030; // default port to listen
/* End server section */

/* Begin storage api section */
import { Web3Storage } from 'web3.storage'

// Construct with token and endpoint
const client = new Web3Storage({ token: process.env.STORAGE_API_TOKEN })

// const fileInput = document.querySelector('input[type="file"]')

// // Pack files into a CAR and send to web3.storage
// const rootCid = await client.put(fileInput.files) // Promise<CIDString>

// // Get info on the Filecoin deals that the CID is stored in
// const info = await client.status(rootCid) // Promise<Status | undefined>

// // Fetch and verify files from web3.storage
// const res = await client.get(rootCid) // Promise<Web3Response | null>
// const files = await res.files() // Promise<Web3File[]>
// for (const file of files) {
//   console.log(`${file.cid} ${file.name} ${file.size}`)
// }
/*  End storage api section */

app.get('/', (req, res) => {
  const randomId = `${Math.random()}`.slice(2);
  const path = `item/${randomId}`;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(`Hello! Fetch one item: <a href="${path}">${path}</a>`);
});

app.get('/items', (req, res) => {
    res.json(database);
  });

app.get('/item/:itemId', (req, res) => {
  const { itemId } = req.params;
  res.json({ itemId });
});

app.post("/item", async function (req, res) {
    const { itemId, itemName } = req.body;
    //do something
    res.send("Something done");
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

export default app;