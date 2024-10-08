const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.json());

// Simple logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.use('/notes', require('./api/notes'));

app.use((req, res, next) => {
  next({ status: 404, message: "Endpoint not found." });
})

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status ?? 500);
  res.json(err.message ?? "Sorry, something went wrong!");
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
