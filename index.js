import express from 'express';
// import cors from "cors"; // for CORS setup, usage: app.use(cors());

const app = express();
const port = process.env.PORT || 3030; // default port to listen

app.get('/', (req, res) => {
  const randomId = `${Math.random()}`.slice(2);
  const path = `item/${randomId}`;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(`Hello! Fetch one item: <a href="${path}">${path}</a>`);
});

app.get('/item/:itemId', (req, res) => {
  const { itemId } = req.params;
  res.json({ itemId });
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

module.exports = app;