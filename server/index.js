const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const graphqlHTTP = require("express-graphql").graphqlHTTP;
const schema = require("./schema/schema");

const app = express();
app.use(cors());

const dbURL = "mongodb://localhost:27017/graphql-netninja";
mongoose
  .connect(dbURL, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log(`MongoDB database connected`))
  .catch((err) => console.log(err));

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      "<h2>Welcome to GraphQL Server 🌐. please visit /graphql to enter graphiql</h2>"
    );
});

const port = 4000;
app.listen(port, () =>
  console.log(`GraphQL server is listening to port: ${port}`)
);
