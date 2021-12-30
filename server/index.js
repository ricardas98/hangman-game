const dotenv = require("dotenv");
const express = require("express");
const app = express();

const gameRoute = require("./routes/games");

dotenv.config();
app.use(express.json());

app.use("/api/games", gameRoute);
//app.use("/api/words", wordRoute);

//Bad json format error handler (400 Bad Request)
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ Error: err.message }); // Bad request
  }
  next();
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Backend running on port " + port);
});
